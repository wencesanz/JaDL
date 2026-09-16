name: Sync from Notion

on:
  # Run every 6 hours
  schedule:
    - cron: '0 */6 * * *'
  # Allow manual trigger from the Actions tab
  workflow_dispatch:

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run Notion sync
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          DATABASE_ID: ${{ secrets.DATABASE_ID }}
        # Also writes sitemap.xml and feed.xml (see writeSitemap/writeFeed
        # in sync-notion.mjs) — no separate sitemap step needed.
        run: node scripts/sync-notion.mjs

      - name: Prerender studio pages
        run: node scripts/prerender.mjs

      - name: Commit changes (if any)
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add studios.json sitemap.xml feed.xml studio
          if [[ -n "$(git status --porcelain studios.json sitemap.xml feed.xml studio)" ]]; then
            git commit -m "chore: sync studios from Notion"
            git push
            echo "✔ Changes pushed."
          else
            echo "✔ No changes."
          fi
