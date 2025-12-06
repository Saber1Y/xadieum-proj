import fetch from "node-fetch";
import type { PNodeRpcResponse, PNode } from "./types";

const defaultRpcBody = {
  jsonrpc: "2.0",
  id: 1,
  method: "pn_getGossipNodes",
  params: [] as any[],
};

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
