# Next Session Instructions - Webflow MCP Integration

**Share this entire document with Claude in your next session after restarting Claude Code.**

---

## Context

The Webflow MCP server is configured at `~/.claude/.mcp.json` with:
- Site ID: `673ccceba3dcf36ccc28f470`
- OAuth Token: `90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e`
- Server URL: `https://mcp.webflow.com/sse`

## Your Task

Please complete these steps in order:

### Step 1: Verify MCP Tools Are Available

Check if you have access to Webflow MCP tools. List all available tools that start with `mcp__webflow__`.

**Expected tools include:**
- `mcp__webflow__get_site`
- `mcp__webflow__list_pages`
- `mcp__webflow__get_page`
- `mcp__webflow__list_collections`
- `mcp__webflow__get_collection`
- `mcp__webflow__list_items`
- `mcp__webflow__get_item`

### Step 2: If Tools Are Available

Proceed with the analysis:

1. **Connect to Webflow site** (ID: `673ccceba3dcf36ccc28f470`)
   - Use `mcp__webflow__get_site` to verify connection

2. **Show Profiles page structure**
   - List all pages to find the Profiles page
   - Get the page DOM and layout structure
   - Document elements, settings, and configuration

3. **List all CMS collections**
   - Use `mcp__webflow__list_collections`
   - Show collection names and IDs

4. **Show collection fields and validation rules**
   - For each collection, get detailed field information
   - Document field types, validation rules, required/optional status

5. **Explain how the Profiles page uses CMS collections**
   - Identify which collections are bound to the Profiles page
   - Explain the data flow and integration

### Step 3: If Tools Are NOT Available

If you don't have access to `mcp__webflow__*` tools:

1. **Verify the configuration exists:**
   ```bash
   cat ~/.claude/.mcp.json
   ```

   Expected output should show the Webflow server configuration with Site ID `673ccceba3dcf36ccc28f470`

2. **If configuration is missing, recreate it:**
   ```bash
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
   ```

3. **Tell the user:** "MCP configuration recreated. Please restart Claude Code again and share this document in the next session."

### Step 4: Alternative Approach (Only if MCP continues to fail)

If MCP tools remain unavailable after multiple restarts, use the Webflow REST API directly:

```bash
# Get site info
curl -X GET "https://api.webflow.com/v2/sites/673ccceba3dcf36ccc28f470" \
  -H "Authorization: Bearer 90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e" \
  -H "accept: application/json"

# List collections
curl -X GET "https://api.webflow.com/v2/sites/673ccceba3dcf36ccc28f470/collections" \
  -H "Authorization: Bearer 90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e" \
  -H "accept: application/json"

# List pages
curl -X GET "https://api.webflow.com/v2/sites/673ccceba3dcf36ccc28f470/pages" \
  -H "Authorization: Bearer 90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e" \
  -H "accept: application/json"
```

Then analyze the JSON responses to complete the original task.

## Goal

Understand the complete architecture of the Profiles page:
- Page structure (elements, layout, settings)
- All CMS collections
- Collection fields and validation rules
- How the Profiles page integrates with CMS collections

## Additional Resources

- Full documentation: `/home/user/Weaver-Yuwono-Home-Page/WEBFLOW_MCP_SETUP.md`
- Diagnostic script: `/home/user/Weaver-Yuwono-Home-Page/verify-mcp-setup.sh`
- Quick reference: `/home/user/Weaver-Yuwono-Home-Page/WEBFLOW_QUICK_START.md`

---

**Start with Step 1 and proceed based on the results.**
