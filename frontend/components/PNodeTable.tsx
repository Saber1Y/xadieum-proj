"use client";

import React, { useMemo, useState } from "react";
import type { PNodeStats } from "../lib/fetchPnodes";

type Props = {
  nodes: PNodeStats[];
};

export default function PNodeTable({ nodes }: Props) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"ip" | "cpu" | "ram" | "uptime">("ip");
  const [desc, setDesc] = useState(true);

  const filtered = useMemo(() => {
    let arr = nodes.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (n) =>
          n.ip.toLowerCase().includes(q) ||
          (n.result?.cpu_percent?.toString().includes(q) ?? false) ||
          (n.result?.uptime?.toString().includes(q) ?? false)
      );
    }
    arr.sort((a, b) => {
      let va: number | string = 0;
      let vb: number | string = 0;
      if (sortKey === "cpu") {
        va = a.result?.cpu_percent ?? 0;
        vb = b.result?.cpu_percent ?? 0;
      } else if (sortKey === "ram") {
        va = a.result?.ram_used ?? 0;
        vb = b.result?.ram_used ?? 0;
      } else if (sortKey === "uptime") {
        va = a.result?.uptime ?? 0;
        vb = b.result?.uptime ?? 0;
      } else {
        va = a.ip;
        vb = b.ip;
      }
      if (va < vb) return desc ? 1 : -1;
      if (va > vb) return desc ? -1 : 1;
      return 0;
    });
    return arr;
  }, [nodes, query, sortKey, desc]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-300 bg-white text-gray-900 p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search IP, CPU, RAM, uptime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as any)}
          className="border border-gray-300 bg-white text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ip">IP</option>
          <option value="cpu">CPU %</option>
          <option value="ram">RAM Used</option>
          <option value="uptime">Uptime</option>
        </select>
        <button
          className="border border-gray-300 bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-100 font-medium"
          onClick={() => setDesc((d) => !d)}
        >
          {desc ? "↓ Desc" : "↑ Asc"}
        </button>
      </div>
      <div className="overflow-auto max-h-[65vh] border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                IP
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                CPU %
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                RAM Used
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Uptime (s)
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((n) => (
              <tr key={n.ip} className="hover:bg-indigo-50 transition-colors">
                <td className="px-4 py-3 font-mono text-sm text-indigo-600 font-medium">
                  {n.ip}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {n.result?.cpu_percent?.toFixed(2) ?? "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {n.result?.ram_used
                    ? `${(n.result.ram_used / 1_000_000_000).toFixed(2)} GB`
                    : "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {n.result?.uptime ?? "-"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {n.error ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    <span className="text-green-600">Online</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
