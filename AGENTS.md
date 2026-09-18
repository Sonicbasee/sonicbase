# Sonicbase

Independent music, artist-led.

## Tech Stack
- TanStack Router + Start
- Supabase (Auth, Database, Storage)
- Cloudflare Workers
- Tailwind CSS

## Development
```bash
npm install
npm run dev
```

## Deployment
```bash
npm run build
npx wrangler deploy
```

## Environment Variables
Set in `.env` for local dev, or as Cloudflare Worker env vars for production:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key

## Database Setup
Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor to create all tables.
