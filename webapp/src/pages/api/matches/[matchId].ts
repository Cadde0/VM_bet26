import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { matchId } = req.query;
  if (!matchId) return res.status(400).json({ error: "Missing matchId" });
  try {
    // Try to get the match from the latest cache
    const cacheResult = await pool.query(
      "SELECT data FROM match_cache ORDER BY fetched_at DESC LIMIT 1",
    );
    if (cacheResult.rowCount === 0) {
      return res.status(404).json({ error: "No match data cached" });
    }
    const matches = cacheResult.rows[0].data.matches;
    const m = matches.find((m: any) => String(m.id) === String(matchId));
    if (!m) return res.status(404).json({ error: "Match not found" });
    // Normalize for frontend
    const match = {
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
    };
    res.status(200).json({ match });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}
