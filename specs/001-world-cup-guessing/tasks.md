# Tasks: World Cup 2026 Guessing Website

**Input**: Design documents from `/specs/001-world-cup-guessing/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup

- [ ] T001 Initialize Next.js project with Tailwind CSS in webapp/
- [ ] T002 Set up Neon Postgres database and connection in .env
- [ ] T003 Configure Vercel project for deployment
- [ ] T004 Set up Football-Data.org API key in .env and test API access with token and rate limiting

## Phase 2: Foundational

- [ ] T005 Create User, Match, Guess, Comment/Emote models in webapp/src/models/
- [ ] T006 Set up database migrations for all entities
- [ ] T007 Implement authentication (register, login, JWT/session) in webapp/src/pages/api/auth/
- [ ] T008 Implement API route for fetching and caching matches from Football-Data.org (with rate limit handling)

## Phase 3: User Story 1 - Registration, Login & Profile Picture (P1)

- [ ] T009 [P] [US1] Create registration and login UI in webapp/src/pages/
- [ ] T010 [US1] Connect UI to backend auth endpoints
- [ ] T011 [US1] Add user profile page and session management
- [ ] T011a [US1] Implement profile picture upload UI and backend endpoint
- [ ] T011b [US1] Store uploaded images in cloud storage and save URL in DB
- [ ] T011c [US1] Display profile pictures on user profile and leaderboard

## Phase 4: User Story 2 - Place Guesses (P2)

- [ ] T012 [P] [US2] Create match list and match detail UI
- [ ] T013 [US2] Implement guess submission form and validation
- [ ] T014 [US2] Connect guess form to backend and save to DB
- [ ] T015 [US2] Display user's guesses for each match

## Phase 5: User Story 3 - Points & Leaderboard (P3)

- [ ] T016 [P] [US3] Implement points calculation logic (3/1/0 rule)
- [ ] T017 [US3] Create leaderboard API and UI
- [ ] T018 [US3] Update points and leaderboard after match results

## Phase 6: User Story 4 - Recent Games & Results (P4)

- [ ] T019 [P] [US4] Display recent games/results page
- [ ] T020 [US4] Show all users' guesses and points for each game

## Phase 7: User Story 5 - Social Interaction (P5)

- [ ] T021 [P] [US5] Implement comment/emote API endpoints
- [ ] T022 [US5] Add comment/emote UI to match and results pages
- [ ] T023 [US5] Display all comments/emotes for a match

## Phase 8: Polish & Cross-Cutting

- [ ] T024 Add responsive/mobile styles and accessibility improvements
- [ ] T025 Add error handling, loading states, and notifications
- [ ] T026 Add tests: unit, integration, E2E (Jest, React Testing Library, Cypress)
- [ ] T027 Polish UI/UX for sleek, modern look
- [ ] T028 Review and document rate limiting logic for Football-Data.org API
- [ ] T029 Finalize README and deployment instructions
- [ ] T030 Add automated test to simulate Football-Data.org API rate limit and verify graceful handling (e.g., backoff, user message)
- [ ] T031 Conduct design review or user survey to confirm "sleek/modern UI" acceptance criteria are met

## Dependencies

- Setup → Foundational → US1 → US2 → US3 → US4 → US5 → Polish

## Parallel Execution Examples

- T009, T012, T016, T019, T021 can be started in parallel after foundational phase

## MVP Scope

- Complete through User Story 2 (T001–T015): registration, login, match list, guess submission, and user guess display

## Independent Test Criteria

- Each user story phase is independently testable via UI and API endpoints

---

_End of tasks.md_
