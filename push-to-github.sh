#!/bin/bash
# Push latest Replit changes to GitHub main branch
# Uses GITHUB_TOKEN secret stored in Replit

if [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: GITHUB_TOKEN secret is not set in Replit."
  echo "Add it via the Secrets tab (lock icon) in the Replit sidebar."
  exit 1
fi

REPO="https://mytoyscare7903-maker:$GITHUB_TOKEN@github.com/mytoyscare7903-maker/premium-toy-care-main.git"

echo "Pushing to GitHub..."
git push "$REPO" main 2>&1 | grep -v "github_token\|GITHUB_TOKEN\|:.*@"

echo ""
echo "Done. Vercel will now auto-deploy from the latest GitHub main branch."
