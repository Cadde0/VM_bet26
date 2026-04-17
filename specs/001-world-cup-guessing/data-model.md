# Data Model: World Cup 2026 Guessing Website

## Entity Overview

### User
- id: UUID (PK)
- name: string (unique, required)
- email: string (unique, required)
- password_hash: string (required)
- points: integer (default: 0)
- registration_date: datetime
- profile_picture_url: string (nullable, URL to uploaded image)

### Match
- id: integer (PK, from Football-Data.org)
- home_team: string
- away_team: string
- start_time: datetime
- result: string (nullable, e.g., "2-1")
- status: enum (scheduled, in_progress, finished)

### Guess
- id: UUID (PK)
- user_id: UUID (FK → User)
- match_id: integer (FK → Match)
- predicted_result: string (e.g., "2-1")
- timestamp: datetime

### Comment/Emote
- id: UUID (PK)
- user_id: UUID (FK → User)
- match_id: integer (FK → Match)
- content: string (text or emoji)
- type: enum (comment, emote)
- timestamp: datetime

## Relationships
- User 1--* Guess (one user, many guesses)
- Match 1--* Guess (one match, many guesses)
- User 1--* Comment/Emote
- Match 1--* Comment/Emote

## Validation Rules
- User name and email must be unique and non-empty
- Passwords must be hashed (never stored in plain text)
- Each user can only submit one guess per match
- Guesses can be edited until the start of the tournament
- Comments/emotes must be non-empty, max 280 chars
- Points are calculated: 3 for exact score, 1 for correct winner, 0 otherwise
- Profile picture must be a valid image file (jpg/png/webp), max 2MB, and stored securely (e.g., cloud storage, not DB blob)

## State Transitions
- Match: scheduled → in_progress → finished
- Guess: editable → locked (after tournament starts)

## Notes
- Match IDs are sourced from Football-Data.org
- All timestamps are UTC+2
- Profile pictures are stored in cloud storage (e.g., Vercel Blob, Supabase Storage, or S3) and referenced by URL in the user table

---

*End of data model phase*
