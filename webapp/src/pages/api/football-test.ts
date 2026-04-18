// Example API route to test Football-Data.org API access
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchFromFootballData } from "@/lib/footballData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Example: Get World Cup 2026 matches (competition code: WC)
    const data = await fetchFromFootballData("/competitions/WC/matches");
    res.status(200).json({ matches: data.matches?.slice(0, 3) || [] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
