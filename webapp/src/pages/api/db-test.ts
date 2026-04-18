// Example API route to test Neon Postgres connection
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({ time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
