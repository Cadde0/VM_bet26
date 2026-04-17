# API Contract: World Cup 2026 Guessing Website

## Public API Endpoints (REST/JSON)

### Auth

- POST /api/register — Register new user (name, email, password)
- POST /api/login — Login (email, password)
- POST /api/logout — Logout (token)

### User

- GET /api/user/me — Get current user profile
- GET /api/user/leaderboard — Get leaderboard (ranked by points)

### Matches

- GET /api/matches — List all matches (from Football-Data.org, with status/results)
- GET /api/matches/:id — Get match details

### Guesses

- POST /api/guesses — Submit or update guess (match_id, predicted_result)
- GET /api/guesses/me — Get all guesses by current user
- GET /api/guesses/:match_id — Get all guesses for a match

### Comments/Emotes

- POST /api/comments — Add comment/emote (match_id, content, type)
- GET /api/comments/:match_id — Get all comments/emotes for a match

## API Response Format

- All responses: JSON { success: boolean, data: object, error?: string }
- Auth endpoints return JWT or session token
- Errors return HTTP 4xx/5xx with error message

## Integration

- Match data fetched from Football-Data.org API (server-side, cached)
- All requests to Football-Data.org must include the header: `X-Auth-Token: <your_token_here>`
- Always check response headers for rate limiting:
	- `X-Requests-Available-Minute`, `X-Requests-Available-Day`, `X-RequestCounter-Reset`
- If limits are low, throttle requests to avoid being blocked.
- User guesses/comments stored in Neon DB
- All endpoints require authentication except register/login and GET /api/matches

## Security

- Passwords never returned in responses
- All sensitive actions require valid JWT/session
- Rate limiting on POST endpoints

---

_End of API contract phase_
