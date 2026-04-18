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
      // Normalize matches for frontend
      const matches = (cacheResult.rows[0].data.matches || []).map(
        (m: any) => ({
          id: m.id,
          home_team: m.homeTeam?.name || "",
          away_team: m.awayTeam?.name || "",
          home_team_flag: m.homeTeam?.crest || m.homeTeam?.flag || "",
          away_team_flag: m.awayTeam?.crest || m.awayTeam?.flag || "",
          start_time: m.utcDate,
          result:
            m.score?.fullTime?.home !== null && m.score?.fullTime?.away !== null
              ? `${m.score.fullTime.home}-${m.score.fullTime.away}`
              : null,
          status:
            m.status === "IN_PLAY"
              ? "in_progress"
              : m.status?.toLowerCase() || "scheduled",
        }),
      );
      return res.status(200).json({ matches });
    }

    // Fetch fresh data and cache it
    const data = await fetchFromFootballData("/competitions/WC/matches");
    await pool.query("INSERT INTO match_cache (data) VALUES ($1)", [data]);
    // Normalize matches for frontend
    const matches = (data.matches || []).map((m: any) => ({
      id: m.id,
      home_team: m.homeTeam?.name || "",
      away_team: m.awayTeam?.name || "",
      home_team_flag: m.homeTeam?.crest || m.homeTeam?.flag || "",
      away_team_flag: m.awayTeam?.crest || m.awayTeam?.flag || "",
      start_time: m.utcDate,
      result:
        m.score?.fullTime?.home !== null && m.score?.fullTime?.away !== null
          ? `${m.score.fullTime.home}-${m.score.fullTime.away}`
          : null,
      status:
        m.status === "IN_PLAY"
          ? "in_progress"
          : m.status?.toLowerCase() || "scheduled",
    }));
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
