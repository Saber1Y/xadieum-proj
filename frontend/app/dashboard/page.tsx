"use client";

import React, { useEffect, useState } from "react";
import PNodeTable from "../../components/PNodeTable";
import StorageChart from "../../components/StorageChart";
import type { PNodeStats } from "../../lib/fetchPnodes";

export default function DashboardPage() {
  const [nodes, setNodes] = useState<PNodeStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNodes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/pnodes");
        if (!res.ok) throw new Error("Failed to fetch pnodes");
        const json = await res.json();
        setNodes(json.result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(String(err?.message ?? err));
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNodes();
  }, []);

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
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">
            Loading node stats...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PNodeTable nodes={nodes} />
            </div>
            <div className="lg:col-span-1">
              <StorageChart nodes={nodes} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
