import React from "react";
import PNodeTable from "../../components/PNodeTable";
import StorageChart from "../../components/StorageChart";
import type { PNode } from "../../lib/types";

async function getPnodes(): Promise<PNode[]> {
  const apiPath = "/api/pnodes";

  // On the server, fetch requires an absolute URL. Build one from env or default to localhost:3000.
  const isServer = typeof window === "undefined";
  const baseHost = isServer
    ? process.env.NEXT_PUBLIC_API_BASE ||
      `http://localhost:${process.env.PORT ?? 3000}`
    : "";

  const url = baseHost.replace(/\/$/, "") + apiPath;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch pnodes");
  const json = await res.json();
  return json.result as PNode[];
}

export default async function DashboardPage() {
  const nodes = await getPnodes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Xandeum pNode Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time monitoring and analytics for Xandeum pNodes
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PNodeTable nodes={nodes} />
          </div>
          <div className="lg:col-span-1">
            <StorageChart nodes={nodes} />
          </div>
        </div>
      </div>
    </div>
  );
}
