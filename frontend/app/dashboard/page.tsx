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
      } catch (err: any) {
        setError(String(err?.message ?? err));
      } finally {
        setLoading(false);
      }
    }
    fetchNodes();
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(120deg, #10123e 0%, #10123e 60%, #ffa20a 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 70% 30%, #ffa20a33 0%, #10123e 70%)",
        }}
      />
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#fdfffb" }}>
            Xandeum pNode Dashboard
          </h1>
          <p className="text-lg" style={{ color: "#ffa20a" }}>
            Real-time monitoring and analytics for Xandeum pNodes
          </p>
        </div>
        {loading ? (
          <div
            className="text-center py-12 text-lg"
            style={{ color: "#fdfffb" }}
          >
            Loading node stats...
          </div>
        ) : error ? (
          <div className="text-center py-12" style={{ color: "#ffa20a" }}>
            Error: {error}
          </div>
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
