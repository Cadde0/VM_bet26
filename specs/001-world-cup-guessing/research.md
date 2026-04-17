# Phase 0 Research: World Cup 2026 Guessing Website

## Final Tech Stack Decisions

- **Frontend/Backend Framework**: Next.js (React-based, SSR, static export, easy Vercel deploy)
- **UI**: Tailwind CSS (modern, utility-first, sleek UI)
- **Hosting**: Vercel (best for Next.js, free tier, easy CI/CD, custom domains)
- **Database**: Neon (serverless Postgres, free tier, always-on, SQL familiar)
- **World Cup Results/Games API**: Football-Data.org (free tier, covers major tournaments, including World Cup)

## Rationale

- Next.js + Tailwind = modern, fast, easy to deploy, great community support
- Vercel = seamless deploy, free, custom domains, GitHub integration
- Neon = Postgres, free, scalable, always accessible
- Football-Data.org = free, easy to use, covers football events

## Decision Log

- Use Next.js + Tailwind for frontend
- Use Neon for Postgres database
- Deploy on Vercel
- Use Football-Data.org for match data

## Open Questions

- Confirm Football-Data.org free tier covers all World Cup 2026 matches and usage limits are sufficient

---

_End of Phase 0 Research_
