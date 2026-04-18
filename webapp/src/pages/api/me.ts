// Example protected API route: /api/me
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromRequest } from "@/utils/auth";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userPayload = getUserFromRequest(req);
  if (!userPayload) return res.status(401).json({ error: "Unauthorized" });
  try {
    const result = await pool.query(
      "SELECT id, name, points, profile_picture_url FROM users WHERE id = $1",
      [userPayload.id],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "User not found" });
    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
