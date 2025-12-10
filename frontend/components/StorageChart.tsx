"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import type { PNodeStats } from "../lib/fetchPnodes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = { nodes: PNodeStats[] };

export default function StorageChart({ nodes }: Props) {
  // Use file_size as proxy for used storage if available
  const hasStorage = nodes.some(
    (n) => n.result && typeof n.result.file_size === "number"
  );
  const totalUsed = nodes.reduce((s, n) => s + (n.result?.file_size ?? 0), 0);
  // No total capacity info in live stats, so just show used

  if (!hasStorage) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Total Storage</h3>
        <div className="text-gray-500">
          Storage data not available for live nodes.
        </div>
      </div>
    );
  }

  const data = {
    labels: ["Used"],
    datasets: [
      {
        label: "Storage (bytes)",
        data: [totalUsed],
        backgroundColor: ["#ffa20a"],
        borderColor: ["#10123e"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Total Storage</h3>
      <div className="w-full max-w-xl">
        <Bar data={data} />
      </div>
      <div className="mt-4 text-sm text-[#10123e]">
        Total Used:{" "}
        <span className="font-semibold text-[#ffa20a]">
          {(totalUsed / 1_000_000_000).toFixed(2)} GB
        </span>
      </div>
    </div>
  );
}
