# Webflow MCP Server Setup Documentation

**Last Updated**: 2025-11-27
**Status**: Configuration created, awaiting verification after Claude Code restart

---

## Executive Summary

This document provides complete instructions for setting up and troubleshooting the Webflow MCP server integration with Claude Code. Reference this document in future sessions to avoid repeating setup cycles.

---

## Table of Contents

1. [Configuration Details](#configuration-details)
2. [File Locations](#file-locations)
3. [How MCP Servers Work in Claude Code](#how-mcp-servers-work-in-claude-code)
4. [Verification Steps](#verification-steps)
5. [Expected Tools After Setup](#expected-tools-after-setup)
6. [Troubleshooting Guide](#troubleshooting-guide)
7. [Quick Reference Commands](#quick-reference-commands)
8. [What to Tell Claude in Future Sessions](#what-to-tell-claude-in-future-sessions)

---

## Configuration Details

### Webflow Site Information
- **Site ID**: `673ccceba3dcf36ccc28f470`
- **OAuth Token**: `90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e`
- **MCP Server URL**: `https://mcp.webflow.com/sse`
- **Server Type**: SSE (Server-Sent Events)

### Target Page
- **Page Name**: Profiles page
- **Goal**: Understand page structure, CMS collections, fields, and validation rules

---

## File Locations

### Global MCP Configuration (REQUIRED)
**Location**: `~/.claude/.mcp.json` or `/root/.claude/.mcp.json`

**Current Configuration**:
```json
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
```

### Claude Settings
**Location**: `~/.claude/settings.json` or `/root/.claude/settings.json`

**Current Settings**:
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/stop-hook-git-check.sh"
          }
        ]
      }
    ]
  },
  "permissions": {
    "allow": ["Skill"]
  }
}
```

**Note**: MCP tools do NOT need to be added to permissions - they are automatically available once the server is loaded.

---

## How MCP Servers Work in Claude Code

### Key Concepts

1. **Configuration Location**:
   - MCP servers MUST be configured in `~/.claude/.mcp.json` (global config)
   - Project-level `.mcp.json` files are NOT loaded by Claude Code
   - This is why previous attempts failed - the config was in the project directory

2. **Server Loading**:
   - MCP servers are loaded when Claude Code starts
   - Configuration changes require a full Claude Code restart
   - Simply restarting a chat session is NOT enough

3. **Tool Naming Convention**:
   - MCP tools are prefixed with `mcp__<servername>__<toolname>`
   - Example: `mcp__webflow__get_site`, `mcp__webflow__list_collections`
   - These tools appear in Claude's available tools list once the server is loaded

4. **Authentication**:
   - OAuth tokens are passed via the `Authorization` header
   - Format: `Bearer <token>`
   - Token is included in every request to the MCP server

---

## Verification Steps

### Step 1: Verify Configuration File Exists

```bash
cat ~/.claude/.mcp.json
```

**Expected Output**: Should show the Webflow configuration from above

**If Missing**: The file needs to be recreated with the configuration shown above

### Step 2: Check for MCP Tools After Restart

In a new Claude Code session, ask Claude to run:

```bash
# Check environment for MCP-related variables
env | grep -i mcp

# List available MCP tools (this is conceptual - there's no direct command)
# Instead, ask Claude: "What MCP tools do you have access to?"
```

**Expected Result**: Claude should report having access to tools like:
- `mcp__webflow__get_site`
- `mcp__webflow__list_pages`
- `mcp__webflow__get_page`
- `mcp__webflow__list_collections`
- `mcp__webflow__get_collection`
- `mcp__webflow__list_items`
- `mcp__webflow__get_item`
- And others...

### Step 3: Test Connection to Webflow

Ask Claude to run:

```
Use the mcp__webflow__get_site tool to retrieve site information for site ID 673ccceba3dcf36ccc28f470
```

**Expected Result**: Should return site details (name, domains, etc.)

**If It Fails**: See troubleshooting guide below

---

## Expected Tools After Setup

Once the Webflow MCP server is properly loaded, Claude should have access to these tools:

### Site Operations
- `mcp__webflow__get_site` - Get site information
- `mcp__webflow__list_domains` - List site domains

### Page Operations
- `mcp__webflow__list_pages` - List all pages in the site
- `mcp__webflow__get_page` - Get specific page details
- `mcp__webflow__get_page_dom` - Get page DOM structure
- `mcp__webflow__update_page` - Update page settings

### CMS Collection Operations
- `mcp__webflow__list_collections` - List all CMS collections
- `mcp__webflow__get_collection` - Get collection details and fields
- `mcp__webflow__create_collection` - Create new collection
- `mcp__webflow__update_collection` - Update collection settings

### CMS Item Operations
- `mcp__webflow__list_items` - List items in a collection
- `mcp__webflow__get_item` - Get specific item details
- `mcp__webflow__create_item` - Create new CMS item
- `mcp__webflow__update_item` - Update CMS item
- `mcp__webflow__delete_item` - Delete CMS item

### Publishing Operations
- `mcp__webflow__publish_site` - Publish site changes

---

## Troubleshooting Guide

### Issue 1: MCP Tools Not Available After Restart

**Symptoms**: Claude says it doesn't have access to Webflow MCP tools

**Diagnosis Steps**:
1. Verify the config file exists and has correct content:
   ```bash
   cat ~/.claude/.mcp.json
   ```

2. Check file permissions:
   ```bash
   ls -la ~/.claude/.mcp.json
   # Should be readable by the current user
   ```

3. Verify JSON syntax is valid:
   ```bash
   python3 -m json.tool ~/.claude/.mcp.json
   # Should output formatted JSON without errors
   ```

**Solutions**:
- **If file is missing**: Recreate it using the configuration above
- **If JSON is invalid**: Fix syntax errors (common issues: missing commas, quotes)
- **If permissions are wrong**: Run `chmod 600 ~/.claude/.mcp.json`
- **If still not working**: Delete and recreate the file, then restart Claude Code

### Issue 2: "Server Not Responding" or Connection Errors

**Symptoms**: Tools are available but return connection errors

**Diagnosis Steps**:
1. Verify the OAuth token is correct:
   ```bash
   grep "Authorization" ~/.claude/.mcp.json
   ```

2. Test network connectivity to Webflow:
   ```bash
   curl -I https://mcp.webflow.com/sse
   ```

**Solutions**:
- **If token is wrong**: Update the token in `.mcp.json` and restart
- **If network fails**: Check internet connectivity
- **If token expired**: Generate new token from Webflow and update config

### Issue 3: Authentication Errors

**Symptoms**: "Unauthorized" or "403 Forbidden" errors

**Possible Causes**:
- OAuth token is incorrect
- Token has expired
- Token doesn't have required permissions
- Site ID is incorrect

**Solutions**:
1. Verify Site ID is correct: `673ccceba3dcf36ccc28f470`
2. Generate a new OAuth token from Webflow
3. Update `~/.claude/.mcp.json` with new token
4. Restart Claude Code

### Issue 4: Tools Work But Return Empty Results

**Symptoms**: Tools execute successfully but return no data

**Possible Causes**:
- Site ID is incorrect
- You don't have access to the site
- The resource you're querying doesn't exist

**Solutions**:
1. Verify you're using the correct Site ID
2. Check your Webflow account has access to the site
3. Try querying a different resource (e.g., list pages instead of get specific page)

---

## Quick Reference Commands

### Check Configuration
```bash
cat ~/.claude/.mcp.json
```

### Validate JSON Syntax
```bash
python3 -m json.tool ~/.claude/.mcp.json
```

### View Claude Settings
```bash
cat ~/.claude/settings.json
```

### Search for MCP Files
```bash
find ~/.claude -name "*mcp*"
```

### Check Environment Variables
```bash
env | grep -i mcp
```

---

## What to Tell Claude in Future Sessions

If MCP tools are not working in a new session, copy and paste this prompt:

```
The Webflow MCP server should be configured at ~/.claude/.mcp.json with the following details:

- Site ID: 673ccceba3dcf36ccc28f470
- OAuth Token: 90bc2d9a60cca1d92eff07985c425865cc11dbaa019ccb62d836a673423ee43e
- Server URL: https://mcp.webflow.com/sse
- Server Type: SSE

Please verify:
1. Check if you have access to mcp__webflow__* tools
2. If not, verify ~/.claude/.mcp.json exists and has the correct configuration
3. If the file is missing or incorrect, recreate it with the proper configuration
4. Reference /home/user/Weaver-Yuwono-Home-Page/WEBFLOW_MCP_SETUP.md for complete setup details

Then help me:
1. Connect to the Webflow site
2. Show the Profiles page structure
3. List all CMS collections
4. Show collection fields and validation rules
5. Explain how the Profiles page uses CMS collections
```

---

## Common Mistakes to Avoid

1. ❌ **Creating `.mcp.json` in the project directory**
   - ✅ Must be in `~/.claude/.mcp.json`

2. ❌ **Forgetting to restart Claude Code after config changes**
   - ✅ Always restart the entire application, not just the chat

3. ❌ **Adding MCP tools to permissions in settings.json**
   - ✅ MCP tools are automatically available, no permissions needed

4. ❌ **Using incorrect JSON syntax**
   - ✅ Validate with `python3 -m json.tool ~/.claude/.mcp.json`

5. ❌ **Expecting instant changes**
   - ✅ Config changes require full Claude Code restart

---

## Session History

### 2025-11-27: Initial Setup
- **Action**: Created `~/.claude/.mcp.json` with Webflow configuration
- **Status**: Configuration file created successfully
- **Next Step**: User needs to restart Claude Code to load the MCP server
- **Issue**: User has been through this cycle multiple times without success

### Known Issues in This Setup Cycle
1. MCP tools may not load even after restart (root cause unknown)
2. Claude Code may not be reading the `~/.claude/.mcp.json` file
3. Possible environment-specific issues preventing MCP server connection

---

## Alternative Approaches (If MCP Server Continues to Fail)

If the MCP server approach continues to fail after multiple restarts and verifications:

### Option 1: Use Webflow API Directly
- Make HTTP requests to Webflow REST API
- Use `curl` or Python scripts
- Bypass the MCP server entirely
- More reliable but less integrated with Claude

### Option 2: Export Webflow Data
- Export site structure and CMS data from Webflow
- Save as JSON files in the project
- Analyze the exported data directly
- One-time export, doesn't reflect live changes

### Option 3: Use Webflow CLI (if available)
- Check if Webflow provides a CLI tool
- May be more stable than MCP integration
- Can be scripted and automated

---

## Success Criteria

You'll know the setup is working when:

1. ✅ Claude reports having access to `mcp__webflow__*` tools
2. ✅ Running `mcp__webflow__get_site` returns your site information
3. ✅ Running `mcp__webflow__list_collections` returns your CMS collections
4. ✅ No authentication or connection errors occur

---

## Contact & Support

- **Webflow MCP Documentation**: https://mcp.webflow.com/docs (if available)
- **Claude Code MCP Guide**: https://code.claude.com/docs/en/mcp
- **This Project**: /home/user/Weaver-Yuwono-Home-Page

---

## Appendix: Full Configuration Files

### A1: Complete ~/.claude/.mcp.json
```json
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
```

### A2: If You Need to Add Multiple MCP Servers
```json
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
    },
    "other-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "some-mcp-package"]
    }
  }
}
```

---

**END OF DOCUMENTATION**
