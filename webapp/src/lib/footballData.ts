// lib/footballData.ts
// Simple Football-Data.org API client

const API_BASE = "https://api.football-data.org/v4";

export async function fetchFromFootballData(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
    },
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  if (!res.ok) {
    throw new Error(`Football-Data API error: ${res.status}`);
  }
  return res.json();
}
