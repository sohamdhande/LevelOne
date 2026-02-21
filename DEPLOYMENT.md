# Level One — Deployment Guide

## 1. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

> [!CAUTION]
> Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. It is only used inside API routes.

## 2. Supabase Setup

1. Create a free Supabase project.
2. Run `supabase_schema.sql` in the SQL Editor to create `submissions` and `events` tables with indexes.
3. Copy Project URL and Service Role Key from **Settings → API**.

## 3. Netlify Deployment

### Prerequisites
- Push this project to a GitHub repository.
- Ensure `netlify.toml` is at the project root (already included).
- The `@netlify/plugin-nextjs` dev dependency is already installed.

### Steps
1. Log into [Netlify](https://app.netlify.com) and click **"Add new site" → "Import an existing project"**.
2. Connect your GitHub repo.
3. Netlify will auto-detect the Next.js framework via `netlify.toml`. Verify:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Go to **Site settings → Environment variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click **Deploy site**.

### Important Notes
- Netlify uses **Netlify Functions** under the hood to run your Next.js API routes (`/api/event`, `/api/submit`). The `@netlify/plugin-nextjs` handles this automatically.
- If your build fails, check that the Node.js version matches. You can set `NODE_VERSION=20` in Netlify environment variables.
- Custom domain setup is under **Domain management** in Netlify site settings.

## 4. Production Testing Checklist

- [ ] Visit the Netlify URL and verify the page loads (dark theme, no scroll).
- [ ] Check Supabase `events` table for a `page_view` event with hashed IP.
- [ ] Click "If Interested, Click This" — verify `cta_click` + `form_open` events.
- [ ] Submit the form with valid data. Verify success state and `submissions` table entry.
- [ ] Submit again with the same email — verify duplicate error message.
- [ ] Submit 3+ times from the same IP to trigger the rate limiter.
- [ ] Vote Yes/Maybe/No on the standalone section — verify `price_vote_section` event.
- [ ] Test honeypot by filling the hidden field (via dev tools) — verify silent rejection.
