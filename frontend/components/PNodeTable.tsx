"use client";

import React, { useMemo, useState } from "react";
import type { PNode } from "../lib/types";

type Props = {
  nodes: PNode[];
};

export default function PNodeTable({ nodes }: Props) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"lastSeen" | "storage" | "nodeId">(
    "lastSeen"
  );
  const [desc, setDesc] = useState(true);

  const filtered = useMemo(() => {
    let arr = nodes.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (n) =>
          n.nodeId.toLowerCase().includes(q) ||
          n.ip.includes(q) ||
          n.gossip.softwareVersion.toLowerCase().includes(q)
      );
    }

    arr.sort((a, b) => {
      let va: number | string = 0;
      let vb: number | string = 0;
      if (sortKey === "lastSeen") {
        va = a.gossip.lastSeen;
        vb = b.gossip.lastSeen;
      } else if (sortKey === "storage") {
        va = a.gossip.storage.used / a.gossip.storage.capacity;
        vb = b.gossip.storage.used / b.gossip.storage.capacity;
      } else {
        va = a.nodeId;
        vb = b.nodeId;
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
          placeholder="Search node id, ip, version..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as any)}
          className="border border-gray-300 bg-white text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="lastSeen">Last Seen</option>
          <option value="storage">Storage %</option>
          <option value="nodeId">Node ID</option>
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
                Node ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Last Seen
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Storage
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Version
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((n) => (
              <tr
                key={n.nodeId}
                className="hover:bg-indigo-50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-sm text-indigo-600 font-medium">
                  {n.nodeId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{n.ip}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(n.gossip.lastSeen * 1000).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  <span className="font-medium text-indigo-600">
                    {(n.gossip.storage.used / 1_000_000).toFixed(2)} MB
                  </span>{" "}
                  /{" "}
                  <span className="text-gray-500">
                    {(n.gossip.storage.capacity / 1_000_000).toFixed(0)} MB
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                  {n.gossip.softwareVersion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
