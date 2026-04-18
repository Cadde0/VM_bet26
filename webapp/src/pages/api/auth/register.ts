// POST /api/auth/register
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const existing = await pool.query("SELECT id FROM users WHERE name = $1", [
      name,
    ]);
    if (existing.rowCount > 0)
      return res.status(409).json({ error: "Name already registered" });
    const result = await pool.query(
      "INSERT INTO users (name, password_hash) VALUES ($1, $2) RETURNING id, name",
      [name, password],
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
