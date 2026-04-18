import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";
import { getUserFromRequest } from "@/utils/auth";
import { v4 as uuidv4 } from "uuid";

// POST /api/guesses — Submit or update guess (match_id, predicted_result)
// GET /api/guesses/me — Get all guesses by current user
// GET /api/guesses/:match_id — Get all guesses for a match

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = getUserFromRequest(req);
  if (!user)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  if (req.method === "POST") {
    const { match_id, predicted_result } = req.body;
    if (match_id === undefined || predicted_result === undefined) {
      return res.status(400).json({
        success: false,
        error: "Missing match_id or predicted_result",
      });
    }
    const matchIdInt =
      typeof match_id === "string" ? parseInt(match_id, 10) : Number(match_id);
    if (isNaN(matchIdInt)) {
      return res.status(400).json({
        success: false,
        error: "Invalid match_id (must be integer)",
      });
    }
    try {
      // Check if guess already exists
      const existing = await pool.query(
        "SELECT id FROM guesses WHERE user_id = $1 AND match_id = $2",
        [user.id, matchIdInt],
      );
      if (existing.rowCount > 0) {
        // Update existing guess
        await pool.query(
          "UPDATE guesses SET predicted_result = $1, timestamp = NOW() WHERE id = $2",
          [predicted_result, existing.rows[0].id],
        );
        return res.status(200).json({ success: true, data: { updated: true } });
      } else {
        // Insert new guess
        const id = uuidv4();
        await pool.query(
          "INSERT INTO guesses (id, user_id, match_id, predicted_result, timestamp) VALUES ($1, $2, $3, $4, NOW())",
          [id, user.id, matchIdInt, predicted_result],
        );
        return res.status(201).json({ success: true, data: { created: true } });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ success: false, error: (e as Error).message });
    }
  }

  if (req.method === "GET") {
    // /api/guesses/me or /api/guesses?match_id=123
    const { match_id, me } = req.query;
    try {
      if (me !== undefined) {
        // Get all guesses by current user
        const result = await pool.query(
          "SELECT * FROM guesses WHERE user_id = $1 ORDER BY timestamp DESC",
          [user.id],
        );
        return res.status(200).json({ success: true, data: result.rows });
      } else if (match_id !== undefined) {
        // Get all guesses for a match
        const matchIdInt =
          typeof match_id === "string"
            ? parseInt(match_id as string, 10)
            : Number(match_id);
        if (isNaN(matchIdInt)) {
          return res.status(400).json({
            success: false,
            error: "Invalid match_id (must be integer)",
          });
        }
        const result = await pool.query(
          "SELECT * FROM guesses WHERE match_id = $1 ORDER BY timestamp DESC",
          [matchIdInt],
        );
        return res.status(200).json({ success: true, data: result.rows });
      } else {
        return res.status(400).json({
          success: false,
          error: "Specify 'me' or 'match_id' in query",
        });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ success: false, error: (e as Error).message });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
