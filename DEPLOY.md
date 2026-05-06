# Deploy Guide — APR Records Impact Explorer

The repo is already initialized with `main` as the default branch and one commit. From here you have two paths to ship: GitHub via CLI, then Vercel via CLI or web import.

## 1. Push to GitHub

### Option A — GitHub CLI (one command)

```bash
cd "/Users/bythumb/Documents/Claude/Projects/Persuasive Presentation"
gh repo create apr-impact-explorer --public --source=. --remote=origin --push
```

This creates the repo on your account, adds it as `origin`, and pushes `main`.

### Option B — Web + manual remote

1. Create an empty repo at <https://github.com/new> named `apr-impact-explorer` (do NOT initialize with a README).
2. Then:

```bash
cd "/Users/bythumb/Documents/Claude/Projects/Persuasive Presentation"
git remote add origin https://github.com/<your-username>/apr-impact-explorer.git
git push -u origin main
```

## 2. Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
cd "/Users/bythumb/Documents/Claude/Projects/Persuasive Presentation"
vercel            # first-run, links the project (answer the prompts)
vercel --prod     # ship to production
```

Defaults are correct: framework `Next.js`, no env vars, no build overrides.

### Option B — Vercel web (auto-deploys on every push)

1. Go to <https://vercel.com/new>.
2. Click "Import" next to the `apr-impact-explorer` repo.
3. Leave all defaults (framework auto-detects as Next.js). Click **Deploy**.
4. Every future `git push` to `main` auto-deploys.

## 3. Local dev

```bash
npm run dev    # http://localhost:3000
npm run build  # production build sanity check
```

## Notes

- No environment variables required.
- App is fully client-rendered after first paint (state-based view switching), so it works on Vercel's free tier with zero serverless cost.
- The static prerender is ~5 KB / 92 KB First Load JS — fast on any connection.
