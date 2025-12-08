import fetch from "node-fetch";
import type { PNodeRpcResponse, PNode } from "./types";
import { PUBLIC_PNODES } from "./pnodePublicIps";

const defaultRpcBody = {
  jsonrpc: "2.0",
  id: 1,
  method: "pn_getGossipNodes",
  params: [] as any[],
};

export type PNodeStats = {
  ip: string;
  error?: string;
  result?: {
    active_streams: number;
    cpu_percent: number;
    current_index: number;
    file_size: number;
    last_updated: number;
    packets_received: number;
    packets_sent: number;
    ram_total: number;
    ram_used: number;
    total_bytes: number;
    total_pages: number;
    uptime: number;
  };
};

export async function fetchPNodeStats(ip: string): Promise<PNodeStats> {
  const url = `http://${ip}:6000/rpc`;
  const body = {
    jsonrpc: "2.0",
    method: "get-stats",
    id: 1,
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok)
      throw new Error(`Failed to fetch from ${ip}: ${res.statusText}`);
    const json = await res.json();
    return { ip, ...json };
  } catch (err: any) {
    return { ip, error: String(err?.message ?? err) };
  }
}

export async function fetchAllPNodeStats(): Promise<PNodeStats[]> {
  return Promise.all(PUBLIC_PNODES.map((ip) => fetchPNodeStats(ip)));
}

export default async function fetchPnodes(baseUrl: string): Promise<PNode[]> {
  const url = baseUrl.replace(/\/$/, "") + "/";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(defaultRpcBody),
  });

  if (!res.ok) {
    throw new Error(`RPC request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as PNodeRpcResponse;
  if (!json.result || !Array.isArray(json.result)) {
    throw new Error("Invalid RPC response");
  }

  return json.result;
}
