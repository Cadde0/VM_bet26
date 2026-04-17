# Quickstart: World Cup 2026 Guessing Website

## Prerequisites
- Node.js 18+
- GitHub account (for Vercel deploy)
- Neon account (for Postgres DB)
- Football-Data.org API key (free tier)

## 1. Clone the repository
```
git clone <your-repo-url>
cd <repo>
```

## 2. Set up the database (Neon)
- Create a new project at https://neon.tech/
- Note the connection string (use in .env)
- Run provided SQL migrations (see /webapp/db/migrations)

## 3. Get Football-Data.org API key
- Sign up at https://www.football-data.org/client/register
- Copy your API key
- Add to .env as FOOTBALL_DATA_API_KEY

## 4. Football-Data.org API Integration Notes
- Always include your API token in the header: `X-Auth-Token: <your_token_here>`
- Monitor the following response headers to avoid rate limiting:
	- `X-Requests-Available-Minute`
	- `X-Requests-Available-Day`
	- `X-RequestCounter-Reset`
- If you approach the limit, throttle requests (wait or back off) to avoid being blocked.
- Use Postman to test endpoints and inspect headers if needed.

## 4. Configure environment variables
Create a `.env.local` file in /webapp:
```
DATABASE_URL=postgres://... # from Neon
FOOTBALL_DATA_API_KEY=...   # from Football-Data.org
NEXTAUTH_SECRET=...         # generate a random string
```

## 5. Install dependencies
```
cd webapp
npm install
```

## 6. Run locally
```
npm run dev
```

## 7. Deploy to Vercel
- Push to GitHub
- Import repo at https://vercel.com/
- Set environment variables in Vercel dashboard
- Deploy!

---

*End of quickstart*
