// POST /api/auth/login
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const result = await pool.query(
      "SELECT id, name FROM users WHERE name = $1 AND password_hash = $2",
      [name, password],
    );
    if (result.rowCount === 0)
      return res.status(401).json({ error: "Invalid credentials" });
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }),
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
