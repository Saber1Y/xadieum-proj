"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import type { PNode } from "../lib/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = { nodes: PNode[] };

export default function StorageChart({ nodes }: Props) {
  const totalUsed = nodes.reduce((s, n) => s + n.gossip.storage.used, 0);
  const totalCap = nodes.reduce((s, n) => s + n.gossip.storage.capacity, 0);

  const data = {
    labels: ["Used", "Free"],
    datasets: [
      {
        label: "Storage (bytes)",
        data: [totalUsed, Math.max(0, totalCap - totalUsed)],
        backgroundColor: ["#4f46e5", "#e5e7eb"],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Total Storage
      </h3>
      <div className="w-full">
        <Bar
          data={data}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Nodes:</span>
          <span className="font-semibold text-gray-900">{nodes.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Used Storage:</span>
          <span className="font-semibold text-indigo-600">
            {(totalUsed / 1_000_000_000).toFixed(2)} GB
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Capacity:</span>
          <span className="font-semibold text-gray-900">
            {(totalCap / 1_000_000_000).toFixed(2)} GB
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t">
          <span className="text-gray-600">Utilization:</span>
          <span className="font-semibold text-indigo-600">
            {((totalUsed / totalCap) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
