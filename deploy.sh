#!/usr/bin/env bash
# APR Records Impact Explorer — one-shot deploy
# Run from this folder:  bash deploy.sh
set -e

REPO_NAME="apr-impact-explorer"
cd "$(dirname "$0")"

echo "==> Checking prerequisites…"

# Homebrew (only needed if gh/vercel are missing)
if ! command -v brew >/dev/null 2>&1; then
  if ! command -v gh >/dev/null 2>&1 || ! command -v vercel >/dev/null 2>&1; then
    echo "Homebrew is required to install gh/vercel. Install it from https://brew.sh and re-run."
    exit 1
  fi
fi

# GitHub CLI
if ! command -v gh >/dev/null 2>&1; then
  echo "==> Installing GitHub CLI (gh)…"
  brew install gh
fi

# Vercel CLI
if ! command -v vercel >/dev/null 2>&1; then
  echo "==> Installing Vercel CLI…"
  npm install -g vercel
fi

# Auth: GitHub
if ! gh auth status >/dev/null 2>&1; then
  echo "==> Logging into GitHub (a browser window will open)…"
  gh auth login -h github.com -p https -w
fi

# Auth: Vercel
if ! vercel whoami >/dev/null 2>&1; then
  echo "==> Logging into Vercel (follow the prompt)…"
  vercel login
fi

# Clear any stale lock files from sandbox session
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

# Init git if it isn't already
if [ ! -d .git ]; then
  echo "==> Initializing git…"
  git init -q -b main
  git add -A
  git -c commit.gpgsign=false commit -q -m "Initial commit — APR Records Impact Explorer"
else
  # Roll any uncommitted files into a fresh commit
  if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git -c commit.gpgsign=false commit -q -m "Pre-deploy snapshot"
  fi
fi

# Create or push the GitHub repo
if git remote get-url origin >/dev/null 2>&1; then
  echo "==> Pushing to existing origin…"
  git push -u origin main
else
  echo "==> Creating GitHub repo and pushing…"
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
fi

REPO_URL=$(gh repo view --json url -q .url 2>/dev/null || echo "")
echo "==> GitHub repo: $REPO_URL"

# Deploy to Vercel
echo "==> Deploying to Vercel (production)…"
vercel link --yes --project "$REPO_NAME" 2>/dev/null || true
vercel --prod --yes

echo
echo "Done. Live URL is printed above."
echo "Future deploys: just \`git push\` — Vercel auto-builds on every commit."
