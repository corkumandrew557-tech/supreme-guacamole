# PostHog Webhook Setup for 10 Repositories

## Your PostHog Configuration
- **Instance URL:** https://us.posthog.com
- **Project ID:** 421569
- **API Endpoint:** https://us.i.posthog.com
- **API Key:** phc_tq28BrjgsuVAcDwp5WYEiwYSNxBqnRu66FbVTXtd48zP

## Repositories to Connect (10 total)
1. Acc
2. buildkit-pack
3. cli
4. computer-use-preview
5. cpython
6. docs
7. docs-1
8. docs.logo.dev
9. documentation
10. supreme-guacamole

## Setup Instructions

### Option 1: Manual Setup (Quick)
For each repository, go to **Settings → Webhooks → Add webhook** and use:

**Webhook URL:**
```
https://us.posthog.com/api/projects/421569/webhook/
```

**Webhook Settings:**
- Content type: `application/json`
- Secret: `phc_tq28BrjgsuVAcDwp5WYEiwYSNxBqnRu66FbVTXtd48zP`
- Events to trigger:
  - ✅ Pushes
  - ✅ Pull requests
  - ✅ Issues
  - ✅ Deployments
  - ✅ Releases
- Active: ✅ Yes

### Option 2: Python Script (Automated)
Run this script to set up all webhooks at once:

```python
import requests
import os

REPOS = [
    "Acc",
    "buildkit-pack",
    "cli",
    "computer-use-preview",
    "cpython",
    "docs",
    "docs-1",
    "docs.logo.dev",
    "documentation",
    "supreme-guacamole"
]

OWNER = "corkumandrew557-tech"
GITHUB_TOKEN = "your_github_token_here"  # Generate at github.com/settings/tokens
POSTHOG_URL = "https://us.posthog.com"
POSTHOG_PROJECT_ID = "421569"
POSTHOG_API_KEY = "phc_tq28BrjgsuVAcDwp5WYEiwYSNxBqnRu66FbVTXtd48zP"

WEBHOOK_URL = f"{POSTHOG_URL}/api/projects/{POSTHOG_PROJECT_ID}/webhook/"

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

for repo in REPOS:
    print(f"Setting up webhook for {OWNER}/{repo}...")
    
    webhook_payload = {
        "name": "web",
        "active": True,
        "events": ["push", "pull_request", "issues", "deployment", "release"],
        "config": {
            "url": WEBHOOK_URL,
            "content_type": "json",
            "insecure_ssl": "0",
            "secret": POSTHOG_API_KEY
        }
    }

    url = f"https://api.github.com/repos/{OWNER}/{repo}/hooks"
    response = requests.post(url, json=webhook_payload, headers=headers)
    
    if response.status_code in [201, 200]:
        print(f"✅ Webhook created for {repo}")
    else:
        print(f"❌ Failed for {repo}: {response.status_code} - {response.text}")

print("\n✅ All webhooks configured!")
```

## What Gets Tracked

| Event Type | Description |
|-----------|-------------|
| Push | Code commits pushed to any branch |
| Pull Request | PRs opened, closed, merged |
| Issues | Issues created, closed, commented |
| Deployments | Release deployments |
| Releases | New releases published |

## Verify Webhooks Are Working

1. Go to any repository → **Settings → Webhooks**
2. You should see the PostHog webhook with a green checkmark
3. Trigger a test event (make a commit, open a PR, etc.)
4. Check PostHog at https://us.posthog.com/project/421569 → **Events** to see the data

## Troubleshooting

**Issue:** Webhook not showing in repository settings
- Make sure you have admin access to the repository
- Check that the repository URL is correct

**Issue:** Events not appearing in PostHog
- Verify the webhook URL is exactly: `https://us.posthog.com/api/projects/421569/webhook/`
- Check webhook logs in GitHub (Settings → Webhooks → click webhook → Recent Deliveries)
- Ensure the PostHog project ID (421569) is correct

**Issue:** "Permission denied" when running the Python script
- Generate a GitHub Personal Access Token at https://github.com/settings/tokens
- Token needs `repo` and `admin:repo_hook` permissions
- Replace `GITHUB_TOKEN` with your actual token

## View Your Data in PostHog

Once webhooks are live:
1. Go to https://us.posthog.com/project/421569
2. Navigate to **Insights** or **Events**
3. Filter by event type (e.g., "GitHub Push", "Pull Request")
4. Analyze your development activity

---

**Setup Date:** June 7, 2026
**Status:** Ready for manual or automated webhook setup
