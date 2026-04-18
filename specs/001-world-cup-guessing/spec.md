# Feature Specification: World Cup 2026 Guessing Website

**Purpose**: Enable a private group of friends to predict World Cup 2026 match results, track points, and interact socially in a transparent, fair, and user-friendly way.

**Stakeholders**: Group members (users), feature owner (developer)

**Business Need**: Increase engagement and fun during the World Cup by providing a transparent, auditable, and easy-to-use guessing platform with social features. No financial transactions involved.

**Scope**: Only World Cup 2026 matches, private group (no public registration), no real money or prizes.

**Out of Scope**: Financial betting, public leaderboards, non-World Cup matches, mobile apps (web only for MVP).

**User Value**: Users can register, make and edit guesses, see results and leaderboards, and interact with friends through comments/emotes. All actions are auditable and transparent.

## User Scenarios & Acceptance Criteria

### User Story 1 - User Registration, Login & Profile Picture (P1)

**As a** new user, **I want** to register, log in, and upload a profile picture **so that** I can participate and be recognized on the leaderboard.

**Acceptance Criteria:**

1. Registration creates a new user and logs them in.
2. Login grants access to the dashboard.
3. Profile picture upload is available after login and is displayed on the profile and leaderboard.
4. Registration/login errors are clearly shown to the user.
5. Profile picture upload is limited to 2MB and common image formats.

---

### User Story 2 - Place and Edit Guesses (P2)

**As a** logged-in user, **I want** to view upcoming matches and submit or edit my guess for each game's result **so that** I can participate in the competition.

**Acceptance Criteria:**

1. Users can view a list of all upcoming matches.
2. Users can submit a guess for each match before the match starts.
3. Users can edit their guess for any match until the match starts.
4. Submitted/edited guesses are saved and visible in the user's history.
5. Guess submission/edit errors are clearly shown to the user.

---

### User Story 3 - Points & Leaderboard (P3)

**As a** user, **I want** to earn points for correct guesses and see a leaderboard **so that** I can track my performance and compete with friends.

**Acceptance Criteria:**

1. Points are awarded: 3 for exact score, 1 for correct winner, 0 otherwise.
2. Leaderboard ranks all users by total points.
3. Leaderboard updates within 5 minutes of new results.
4. Users can view their own points and ranking at any time.

---

### User Story 4 - View Recent Games & Results (P4)

**As a** user, **I want** to view recent games, results, and all users' guesses and points **so that** I can see how everyone is doing.

**Acceptance Criteria:**

1. Users can view a list of recent/completed matches and their results.
2. For each match, all users' guesses and points are visible.
3. Users can view their own guess history and results.

---

### User Story 5 - Social Interaction (P5)

**As a** user, **I want** to comment or emote on guesses or recent games **so that** I can interact with friends.

**Acceptance Criteria:**

1. Users can leave comments or emotes (emoji) on guesses or games.
2. Comments/emotes are visible to all users within 1 minute of posting.
3. Abusive content can be reported and is hidden after review.

---

## Functional Requirements

1. Users can register, log in, and upload a profile picture (max 2MB, common formats).
2. Users can view a list of all upcoming and completed World Cup 2026 matches.
3. Users can submit and edit their guesses for each match until the match starts.
4. The system records all guesses and calculates points based on actual results (3/1/0 rule).
5. A leaderboard displays all users ranked by points, updating within 5 minutes of new results.
6. Users can view recent games, results, and all users' guesses and points.
7. Users can comment or emote (emoji) on guesses or games; abusive content can be reported.
8. The website is easy to use, visually appealing, and responsive on desktop and mobile. "Visually appealing" is defined as scoring ≥4/5 on a user survey for design and usability by at least 80% of users.
9. All actions (guesses, edits, results, comments) are logged and auditable by users.
10. No financial transactions or real money are handled by the website.

## Success Criteria

- 100% of users can register, log in, and upload a profile picture (≤2MB, common formats) without errors.
- 95% of guesses are submitted, saved, and editable before match start.
- Points are awarded accurately for correct guesses within 1 hour of result entry.
- Leaderboard updates within 5 minutes of new results.
- Users can view all recent games, results, and guesses without page errors.
- Comments/emotes are visible to all users within 1 minute of posting.
- The website scores ≥4/5 on a user survey for design/usability by at least 80% of users.
- All user actions (guesses, edits, comments, results) are logged and auditable by users.
- No user data breaches or privacy complaints during the tournament.
- No financial transactions or real money are processed by the system.

## Key Entities

- User: id, name, email, password (hashed), points, registration date, profile picture URL
- Match: id, teams, start time, result, status
- Guess: id, user_id, match_id, predicted_result, timestamp
- Comment/Emote: id, user_id, match_id, content, type (text/emoji), timestamp

## Assumptions & Dependencies

- All users are friends and trusted; no public registration.
- Only World Cup 2026 matches are included.
- Points system: 3 points for exact score, 1 point for correct winner, 0 otherwise.
- Social features (comments/emotes) are for fun; abusive content can be reported and hidden after review.
- No financial transactions or real money involved.
- Relies on Football-Data.org API for match data (free tier must cover all matches and usage limits).

## Edge Cases

- User tries to submit or edit a guess after match start: system blocks and shows error.
- User uploads a profile picture >2MB or unsupported format: system blocks and shows error.
- User submits abusive comment/emote: can be reported and hidden after review.
- API for match data is unavailable: show error and retry/backoff.

## [NEEDS CLARIFICATION]

None. All requirements are now testable and unambiguous.
