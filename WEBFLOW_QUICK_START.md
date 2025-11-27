# Webflow MCP Quick Start Guide

**Copy and paste this into your next Claude session:**

---

## Quick Verification Checklist

After restarting Claude Code, ask Claude to run these commands:

```bash
# 1. Verify config file exists
cat ~/.claude/.mcp.json

# 2. Check if it has Webflow configuration
grep -A 10 "webflow" ~/.claude/.mcp.json
```

Expected output should show:
- Site ID: `673ccceba3dcf36ccc28f470`
- Authorization header with your token
- URL: `https://mcp.webflow.com/sse`

---

## Quick Test Prompt

```
Check if you have access to Webflow MCP tools:
1. List all available tools that start with "mcp__webflow__"
2. If you have them, use mcp__webflow__get_site to connect to site 673ccceba3dcf36ccc28f470
3. If you don't have them, read /home/user/Weaver-Yuwono-Home-Page/WEBFLOW_MCP_SETUP.md for troubleshooting
```

---

## My Webflow Setup

- **Site ID**: `673ccceba3dcf36ccc28f470`
- **Token**: `90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e`
- **Config Location**: `~/.claude/.mcp.json`
- **Full Docs**: `/home/user/Weaver-Yuwono-Home-Page/WEBFLOW_MCP_SETUP.md`

---

## What I Need From Webflow

1. **Profiles page structure**: Elements, layout, settings
2. **All CMS collections**: List them
3. **Collection fields**: Show fields and validation rules for each collection
4. **CMS integration**: Explain how the Profiles page uses the CMS collections

---

## If MCP Tools Are NOT Available

Ask Claude to:

```bash
# Recreate the config file
cat > ~/.claude/.mcp.json << 'EOF'
{
  "mcpServers": {
    "webflow": {
      "type": "sse",
      "url": "https://mcp.webflow.com/sse",
      "headers": {
        "Authorization": "Bearer 90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e"
      },
      "metadata": {
        "siteId": "673ccceba3dcf36ccc28f470"
      }
    }
  }
}
EOF

# Verify it was created
cat ~/.claude/.mcp.json
```

Then restart Claude Code again.

---

## Alternative: Use Webflow API Directly

If MCP continues to fail, ask Claude to use the Webflow REST API directly:

```bash
# Example: List collections via curl
curl -X GET "https://api.webflow.com/v2/sites/673ccceba3dcf36ccc28f470/collections" \
  -H "Authorization: Bearer 90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e" \
  -H "accept: application/json"
```

---

**Full documentation**: `/home/user/Weaver-Yuwono-Home-Page/WEBFLOW_MCP_SETUP.md`
