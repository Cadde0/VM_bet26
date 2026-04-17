# Feature Specification: World Cup 2026 Guessing Website

**Feature Branch**: `[001-world-cup-guessing]`
**Created**: 2026-04-17
**Status**: Draft
**Input**: User description: "Implement the feature specification based on the updated constitution. I want to build a website that me and my friends can use to guess the results of the world cup 2026. The website should be easy to use and have nice sleek look. Everyone should be able to create a user, the users can then place their guesses on the result each of the games. There should then be some sort of point system for correct guesses and there should be some page where you can view leaderboards, recent games and see everyone elses results, guesses and points, maybe there should also be some sort of way to interact with the other users, or comment/emote on their guesses or recent games."

## User Scenarios & Testing _(mandatory)_


### User Story 1 - User Registration, Login & Profile Picture (Priority: P1)

A new user can create an account, log in, and upload a profile picture.

**Why this priority**: Essential for all other features; no participation without user accounts.


**Independent Test**: Register a new user, log in, upload a profile picture, and verify it is displayed on their profile and leaderboard.


**Acceptance Scenarios**:
1. **Given** a new visitor, **When** they register, **Then** their account is created and they are logged in.
2. **Given** a registered user, **When** they log in, **Then** they access their dashboard.
3. **Given** a logged-in user, **When** they upload a profile picture, **Then** it is saved and displayed on their profile and leaderboard.

---

### User Story 2 - Place Guesses on Matches (Priority: P2)

A logged-in user can view upcoming World Cup games and submit their guess for each game's result.

**Why this priority**: Core engagement feature; enables the main activity of the site.

**Independent Test**: User submits a guess for a match and it is saved and visible in their history.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they view a match, **Then** they can submit a guess for the result.
2. **Given** a user has submitted a guess, **When** they revisit the match, **Then** their guess is displayed.

---

### User Story 3 - Points & Leaderboard (Priority: P3)

Users earn points for correct guesses. There is a leaderboard showing all users ranked by points.

**Why this priority**: Adds competition and motivation; keeps users engaged.

**Independent Test**: After results are entered, points are awarded and leaderboard updates.

**Acceptance Scenarios**:

1. **Given** a set of completed matches, **When** results are entered, **Then** users with correct guesses receive points.
2. **Given** users with points, **When** the leaderboard is viewed, **Then** users are ranked by points.

---

### User Story 4 - View Recent Games & Results (Priority: P4)

Users can view recent games, their results, and all users' guesses and points for each game.

**Why this priority**: Transparency and engagement; lets users see how everyone is doing.

**Independent Test**: User views a recent game and sees all guesses and results.

**Acceptance Scenarios**:

1. **Given** a completed match, **When** a user views it, **Then** all users' guesses and points are shown.
2. **Given** a recent game, **When** a user visits the page, **Then** the result and guesses are visible.

---

### User Story 5 - Social Interaction (Priority: P5)

Users can comment or emote on guesses or recent games.

**Why this priority**: Increases fun and engagement; adds a social layer.

**Independent Test**: User leaves a comment or emote and it is visible to others.

**Acceptance Scenarios**:

1. **Given** a user viewing a guess or game, **When** they leave a comment or emote, **Then** it appears for all users.
2. **Given** a comment or emote, **When** another user views the page, **Then** they see the interaction.

---

## Functional Requirements

1. Users must be able to register, log in, manage their account securely, and upload a profile picture.
2. Users can view a list of upcoming and completed World Cup 2026 matches.
3. Users can submit, view, and edit their guesses for each match until the start of the tournament.
4. The system must record all guesses and calculate points based on actual results.
5. A leaderboard must display all users ranked by points.
6. Users can view recent games, results, and all users' guesses and points.
7. Users can comment or emote on guesses or games.
8. The website must be visually appealing, modern, and easy to use on desktop and mobile.
9. No financial transactions are handled by the website.

## Success Criteria

- 100% of users can register, log in, and upload a profile picture without errors.
- 95% of guesses are submitted and saved successfully before match start.
- Points are awarded accurately for correct guesses within 1 hour of result entry.
- Leaderboard updates within 5 minutes of new results.
- Users can view all recent games, results, and guesses without page errors.
- Comments/emotes are visible to all users within 1 minute of posting.
- The website receives positive feedback on usability and design from at least 80% of users.
- No user data breaches or privacy complaints during the tournament.
- No financial transactions are processed by the system.

## Key Entities

- User (id, name, email, password, points, registration date)
- Match (id, teams, start time, result, status)
- Guess (id, user_id, match_id, predicted_result, timestamp)
- Comment/Emote (id, user_id, match_id, content, type, timestamp)

## Assumptions

- All users are friends and trusted; no public registration.
- Only World Cup 2026 matches are included.
- Points system: 3 points for exact score, 1 point for correct winner, 0 otherwise.
- Social features (comments/emotes) are for fun and not moderated unless abuse occurs. Both text comments and emojis are allowed.
- No financial transactions or real money involved.

## [NEEDS CLARIFICATION]

1. [RESOLVED: Points system: 3 points for exact score, 1 for correct winner, 0 otherwise.]
2. [RESOLVED: Both text comments and emojis are allowed.]
3. [RESOLVED: Users can edit guesses until the start of the tournament.]
