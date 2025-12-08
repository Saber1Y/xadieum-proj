import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAllPNodeStats } from "../../lib/fetchPnodes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const nodes = await fetchAllPNodeStats();
    res.status(200).json({ result: nodes });
  } catch (err: any) {
    console.error("pnodes API error:", err);
    res.status(500).json({ error: String(err?.message ?? err) });
  }
}
