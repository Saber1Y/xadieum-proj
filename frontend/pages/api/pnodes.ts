import type { NextApiRequest, NextApiResponse } from "next";
import fetchPnodes from "../../lib/fetchPnodes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const base = process.env.PRPC_BASE_URL || "http://localhost:4000";
    const nodes = await fetchPnodes(base);
    res.status(200).json({ result: nodes });
  } catch (err: any) {
    console.error("pnodes API error:", err);
    res.status(500).json({ error: String(err?.message ?? err) });
  }
}
