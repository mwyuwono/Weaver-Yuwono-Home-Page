#!/bin/bash
# Webflow MCP Setup Verification Script
# Run this script to diagnose MCP configuration issues

echo "==================================="
echo "Webflow MCP Setup Verification"
echo "==================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Config file exists
echo "1. Checking if ~/.claude/.mcp.json exists..."
if [ -f ~/.claude/.mcp.json ]; then
    echo -e "${GREEN}✓ Config file exists${NC}"
else
    echo -e "${RED}✗ Config file NOT found${NC}"
    echo "   Run: cat > ~/.claude/.mcp.json << 'EOF'"
    echo "   (then paste the configuration from WEBFLOW_MCP_SETUP.md)"
    exit 1
fi
echo ""

# Check 2: File is readable
echo "2. Checking file permissions..."
if [ -r ~/.claude/.mcp.json ]; then
    echo -e "${GREEN}✓ File is readable${NC}"
    ls -la ~/.claude/.mcp.json
else
    echo -e "${RED}✗ File is not readable${NC}"
    echo "   Run: chmod 600 ~/.claude/.mcp.json"
    exit 1
fi
echo ""

# Check 3: Valid JSON
echo "3. Validating JSON syntax..."
if python3 -m json.tool ~/.claude/.mcp.json > /dev/null 2>&1; then
    echo -e "${GREEN}✓ JSON is valid${NC}"
else
    echo -e "${RED}✗ JSON syntax is invalid${NC}"
    echo "   Check for missing commas, quotes, or brackets"
    python3 -m json.tool ~/.claude/.mcp.json
    exit 1
fi
echo ""

# Check 4: Contains Webflow configuration
echo "4. Checking for Webflow configuration..."
if grep -q "webflow" ~/.claude/.mcp.json; then
    echo -e "${GREEN}✓ Webflow server configured${NC}"
else
    echo -e "${RED}✗ Webflow configuration not found${NC}"
    echo "   Add Webflow server to mcpServers section"
    exit 1
fi
echo ""

# Check 5: Has authorization header
echo "5. Checking for Authorization header..."
if grep -q "Authorization" ~/.claude/.mcp.json; then
    echo -e "${GREEN}✓ Authorization header present${NC}"
else
    echo -e "${RED}✗ Authorization header missing${NC}"
    echo "   Add OAuth token to headers section"
    exit 1
fi
echo ""

# Check 6: Has site ID
echo "6. Checking for Site ID..."
if grep -q "673ccceba3dcf36ccc28f470" ~/.claude/.mcp.json; then
    echo -e "${GREEN}✓ Site ID configured${NC}"
else
    echo -e "${YELLOW}⚠ Expected Site ID not found${NC}"
    echo "   Verify siteId in metadata section"
fi
echo ""

# Check 7: Network connectivity
echo "7. Testing network connectivity to Webflow MCP server..."
if curl -s -I https://mcp.webflow.com/sse > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Network connection successful${NC}"
else
    echo -e "${RED}✗ Cannot reach mcp.webflow.com${NC}"
    echo "   Check internet connection"
fi
echo ""

# Display current configuration
echo "==================================="
echo "Current Configuration:"
echo "==================================="
cat ~/.claude/.mcp.json
echo ""

# Final instructions
echo "==================================="
echo "Next Steps:"
echo "==================================="
echo "1. If all checks passed: Restart Claude Code"
echo "2. After restart, ask Claude: 'What MCP tools do you have access to?'"
echo "3. Expected tools should include: mcp__webflow__get_site, mcp__webflow__list_collections, etc."
echo ""
echo "If tools still don't appear after restart:"
echo "- Check WEBFLOW_MCP_SETUP.md for detailed troubleshooting"
echo "- Consider using Webflow REST API directly as alternative"
echo ""
echo "==================================="
