// API route: /api/matches/list
// Returns all matches from the local DB, sorted by start_time
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await pool.query(
      `SELECT id, team1 as home_team, team2 as away_team, start_time, result, status, home_team_flag, away_team_flag
       FROM matches
       ORDER BY start_time ASC`,
    );
    res.status(200).json({ matches: result.rows });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
