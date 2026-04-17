# Implementation Plan: World Cup 2026 Guessing Website

**Branch**: `001-world-cup-guessing` | **Date**: 2026-04-17 | **Spec**: [specs/001-world-cup-guessing/spec.md](specs/001-world-cup-guessing/spec.md)
**Input**: Feature specification from `/specs/001-world-cup-guessing/spec.md`

**Note**: This plan is based on the updated constitution and research findings.

## Summary

Build a modern, easy-to-use webapp for World Cup 2026 result guessing, with user registration, guessing, points, leaderboards, and social features. Use Next.js + Tailwind for frontend, Neon for Postgres database, Vercel for hosting, and Football-Data.org for match data. Prioritize free/easy deployment and sleek design.

## Technical Context

**Language/Version**: JavaScript/TypeScript (Next.js 14+), Tailwind CSS 3+
**Primary Dependencies**: Next.js, Tailwind CSS, Neon client, React Query, Axios/Fetch, Football-Data.org API client (with API token and rate limiting), image upload library (e.g., next/image, cloud storage SDK)
**Storage**: Neon (Postgres serverless) for data, cloud storage (e.g., Vercel Blob, Supabase Storage, or S3) for profile pictures
**Testing**: Jest, React Testing Library, Cypress (E2E)
**Target Platform**: Web (desktop/mobile), deployed on Vercel
**Project Type**: Web application (frontend + backend API routes)
**Performance Goals**: <200ms p95 page load, 99.9% uptime, leaderboard updates <5min
**Constraints**: Free hosting tier (Vercel), free DB tier (Neon), no paid APIs, no financial transactions, must handle Football-Data.org API rate limiting via response headers, profile pictures must be stored securely and not exceed 2MB
**Scale/Scope**: Up to 100 users, 64 matches, 1000s of guesses/comments
for this feature. Delete unused options and expand the chosen structure with

# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)

│ └── services/

## Project Structure

### Documentation (this feature)

```text
specs/001-world-cup-guessing/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
webapp/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── lib/
│   └── styles/
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

**Structure Decision**: Single Next.js project in `webapp/` with all frontend, backend API routes, and styles. Neon used for DB, deployed to Vercel. All documentation in `specs/001-world-cup-guessing/`.

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]

```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
```
