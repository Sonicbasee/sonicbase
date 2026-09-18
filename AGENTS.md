# Sonicbase

Independent music, artist-led.

## Tech Stack
- TanStack Router + Start
- Supabase (Auth, Database, Storage)
- Node.js server (deployable anywhere)
- Tailwind CSS

## Development
```bash
npm install
npm run dev
```

## Build & Run (production)
```bash
npm run build
npm run start
```

## Deploy Anywhere

The build outputs a standard Node.js server (`.output/server/index.mjs`).

### Vercel
- Set build command: `npm run build`
- Set output directory: `.output`
- Set env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

### Cloudflare Workers
```bash
NITRO_PRESET=cloudflare-module npm run build
npx wrangler deploy
```

### Docker
```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm ci && npm run build
ENV PORT=3000
CMD ["npm", "start"]
```

### Any VPS (Railway, Render, DigitalOcean, etc.)
```bash
npm install
npm run build
PORT=3000 node .output/server/index.mjs
```

## Environment Variables
Set in `.env` for local dev, or as environment variables in production:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key
- `PORT` - Server port (default: 3000)

## Database Setup
Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor to create all tables.
