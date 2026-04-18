// API route: /api/matches
// Fetches and caches World Cup matches from Football-Data.org
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchFromFootballData } from "@/lib/footballData";
import pool from "@/lib/db";

const CACHE_TTL = 60 * 30; // 30 minutes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Try to get cached data
    const cacheResult = await pool.query(
      "SELECT data, fetched_at FROM match_cache ORDER BY fetched_at DESC LIMIT 1",
    );
    const now = new Date();
    if (
      cacheResult.rowCount > 0 &&
      (now.getTime() - new Date(cacheResult.rows[0].fetched_at).getTime()) /
        1000 <
        CACHE_TTL
    ) {
      return res
        .status(200)
        .json({ matches: cacheResult.rows[0].data.matches });
    }

    // Fetch fresh data and cache it
    const data = await fetchFromFootballData("/competitions/WC/matches");
    await pool.query("INSERT INTO match_cache (data) VALUES ($1)", [data]);
    res.status(200).json({ matches: data.matches });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
