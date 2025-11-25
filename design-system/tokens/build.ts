#!/usr/bin/env node
/**
 * Material Design 3 Web Token Filter
 * 
 * Filters Material Design 3 tokens to web-only tokens and applies custom overrides.
 * Outputs LLM-optimized JSON and human-readable Markdown.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface Token {
  class: string;
  type: string;
  id: string;
  name: string;
  value: string | number;
  category_id: string;
  description?: string;
  tags: string[];
}

interface TokenData {
  entities: Token[];
}

interface WebToken {
  id: string;
  category: string;
  value: string | number;
  description?: string;
  custom?: boolean;
  theme?: 'light' | 'dark';
}

interface CustomOverrides {
  [key: string]: string | number;
}

// Web-relevant token categories and types
const WEB_CATEGORIES = ['color', 'typography', 'shape', 'elevation', 'motion', 'state'];
const WEB_TYPES = ['color', 'dimension', 'fontFamily', 'fontWeight', 'lineHeight', 'fontSize', 'letterSpacing', 'cornerRadius', 'shadow', 'duration', 'easing'];

// Platform-specific tags to exclude
const EXCLUDE_TAGS = ['android', 'ios', 'flutter', 'compose', 'swift', 'kotlin'];

// Token ID patterns to include (web-relevant)
const INCLUDE_PATTERNS = [
  /^md\.sys\./,           // System tokens
  /^md\.ref\.palette\./,  // Color palette (for reference)
  /^md\.ref\.typeface\./, // Typeface (for reference)
];

function isWebToken(token: Token): boolean {
  // Must match include patterns
  const matchesPattern = INCLUDE_PATTERNS.some(pattern => pattern.test(token.id));
  if (!matchesPattern) return false;

  // Exclude platform-specific tokens
  const hasExcludedTag = token.tags.some(tag => EXCLUDE_TAGS.includes(tag.toLowerCase()));
  if (hasExcludedTag) return false;

  // Must be web-relevant type
  if (!WEB_TYPES.includes(token.type)) return false;

  // Exclude tokens with platform-specific category IDs
  if (token.category_id && EXCLUDE_TAGS.some(tag => token.category_id.toLowerCase().includes(tag))) {
    return false;
  }

  return true;
}

function extractCategory(tokenId: string): string {
  // Extract category from token ID: md.sys.color.primary -> color
  const parts = tokenId.split('.');
  if (parts.length >= 3 && parts[1] === 'sys') {
    return parts[2]; // color, typography, shape, etc.
  }
  if (parts.length >= 2 && parts[1] === 'ref') {
    return parts[2]; // palette, typeface, etc.
  }
  return 'other';
}

function normalizeTokenId(tokenId: string): string {
  // Remove theme suffix for normalization (.light, .dark)
  return tokenId.replace(/\.(light|dark)$/, '');
}

function parseTheme(tokenId: string): 'light' | 'dark' | undefined {
  if (tokenId.endsWith('.light')) return 'light';
  if (tokenId.endsWith('.dark')) return 'dark';
  return undefined;
}

function loadCustomOverrides(): CustomOverrides {
  try {
    const customPath = join(__dirname, 'custom.json');
    const content = readFileSync(customPath, 'utf-8');
    const parsed = JSON.parse(content);
    
    // Remove metadata keys
    const overrides: CustomOverrides = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!key.startsWith('_') && typeof value !== 'object') {
        overrides[key] = value as string | number;
      }
    }
    return overrides;
  } catch (error) {
    console.warn('No custom.json found or invalid format. Using defaults.');
    return {};
  }
}

function buildTokens(): void {
  console.log('Reading Material Design 3 tokens...');
  
  const tokensPath = join(rootDir, 'vendor', 'material-tokens', 'dsp', 'data', 'tokens.json');
  const tokensData: TokenData = JSON.parse(readFileSync(tokensPath, 'utf-8'));
  
  console.log(`Found ${tokensData.entities.length} total tokens`);
  
  // Filter to web tokens
  const webTokens = tokensData.entities.filter(isWebToken);
  console.log(`Filtered to ${webTokens.length} web-relevant tokens`);
  
  // Load custom overrides
  const customOverrides = loadCustomOverrides();
  const customCount = Object.keys(customOverrides).length;
  if (customCount > 0) {
    console.log(`Applying ${customCount} custom overrides...`);
  }
  
  // Process tokens into web format
  const processedTokens: Map<string, WebToken> = new Map();
  
  for (const token of webTokens) {
    const normalizedId = normalizeTokenId(token.id);
    const theme = parseTheme(token.id);
    const category = extractCategory(token.id);
    
    // Skip if not a web category
    if (!WEB_CATEGORIES.includes(category) && category !== 'palette' && category !== 'typeface') {
      continue;
    }
    
    // Check for custom override
    const isCustom = normalizedId in customOverrides;
    const value = isCustom ? customOverrides[normalizedId] : token.value;
    
    // Create or update token entry
    const key = theme ? `${normalizedId}:${theme}` : normalizedId;
    processedTokens.set(key, {
      id: normalizedId,
      category,
      value,
      description: token.description,
      custom: isCustom,
      theme,
    });
  }
  
  // Convert to array and sort
  const tokenArray: WebToken[] = Array.from(processedTokens.values()).sort((a, b) => {
    // Sort by category, then by ID
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.id.localeCompare(b.id);
  });
  
  console.log(`Generated ${tokenArray.length} processed tokens`);
  
  // Create metadata
  const metadata = {
    generated: new Date().toISOString(),
    customizations: customCount > 0 ? Object.keys(customOverrides) : [],
    tokenCount: tokenArray.length,
    source: 'material-foundation/material-tokens',
  };
  
  // Output JSON (LLM-optimized)
  const jsonOutput = {
    _meta: metadata,
    tokens: tokenArray,
  };
  
  const jsonPath = join(__dirname, 'material3.web.json');
  writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf-8');
  console.log(`✓ Wrote ${jsonPath}`);
  
  // Output Markdown (human-readable)
  const mdPath = join(__dirname, 'material3.web.md');
  const mdContent = generateMarkdown(jsonOutput, customOverrides);
  writeFileSync(mdPath, mdContent, 'utf-8');
  console.log(`✓ Wrote ${mdPath}`);
  
  // Output CSS (for direct use in consuming projects)
  const cssPath = join(__dirname, 'material3.web.css');
  const cssContent = generateCSS(jsonOutput);
  writeFileSync(cssPath, cssContent, 'utf-8');
  console.log(`✓ Wrote ${cssPath}`);
  
  // Check file size
  const jsonSize = JSON.stringify(jsonOutput).length;
  const sizeKB = (jsonSize / 1024).toFixed(2);
  console.log(`\nToken file size: ${sizeKB} KB`);
  
  if (jsonSize > 150 * 1024) {
    console.warn('⚠ Warning: Token file exceeds 150KB target');
  }
}

function generateMarkdown(data: { _meta: any; tokens: WebToken[] }, customOverrides: CustomOverrides): string {
  let md = '# Material Design 3 Web Tokens\n\n';
  
  // Metadata section
  md += '## Metadata\n\n';
  md += `- **Generated**: ${data._meta.generated}\n`;
  md += `- **Token Count**: ${data._meta.tokenCount}\n`;
  md += `- **Source**: ${data._meta.source}\n`;
  
  if (data._meta.customizations.length > 0) {
    md += `- **Customizations**: ${data._meta.customizations.length} token(s) overridden\n`;
    md += '\n### Custom Token Overrides\n\n';
    md += '| Token ID | Custom Value |\n';
    md += '|----------|-------------|\n';
    for (const tokenId of data._meta.customizations) {
      md += `| \`${tokenId}\` | \`${customOverrides[tokenId]}\` |\n`;
    }
    md += '\n';
  }
  
  md += '---\n\n';
  
  // Group tokens by category
  const byCategory = new Map<string, WebToken[]>();
  for (const token of data.tokens) {
    if (!byCategory.has(token.category)) {
      byCategory.set(token.category, []);
    }
    byCategory.get(token.category)!.push(token);
  }
  
  // Generate tables for each category
  const categoryOrder = ['color', 'typography', 'shape', 'elevation', 'motion', 'state', 'palette', 'typeface'];
  
  for (const category of categoryOrder) {
    const tokens = byCategory.get(category);
    if (!tokens || tokens.length === 0) continue;
    
    md += `## ${category.charAt(0).toUpperCase() + category.slice(1)} Tokens\n\n`;
    md += '| ID | Value | Description | Custom | Theme |\n';
    md += '|----|-------|-------------|--------|------|\n';
    
    for (const token of tokens) {
      const id = `\`${token.id}\``;
      const value = typeof token.value === 'string' ? `\`${token.value}\`` : token.value;
      const desc = token.description || '-';
      const custom = token.custom ? '[CUSTOM]' : '';
      const theme = token.theme || '-';
      
      md += `| ${id} | ${value} | ${desc} | ${custom} | ${theme} |\n`;
    }
    
    md += '\n';
  }
  
  return md;
}

function generateCSS(data: { _meta: any; tokens: WebToken[] }): string {
  let css = '/* Material Design 3 Web Tokens - CSS Custom Properties */\n';
  css += `/* Generated: ${data._meta.generated} */\n`;
  css += `/* Token Count: ${data._meta.tokenCount} */\n`;
  css += `/* Source: ${data._meta.source} */\n\n`;
  
  if (data._meta.customizations.length > 0) {
    css += `/* Customizations: ${data._meta.customizations.length} token(s) overridden */\n`;
  }
  
  css += ':root {\n';
  
  // Convert token IDs to CSS custom property names
  // md.sys.color.primary -> --md-sys-color-primary
  for (const token of data.tokens) {
    const cssVarName = `--${token.id.replace(/\./g, '-')}`;
    const value = typeof token.value === 'string' ? token.value : String(token.value);
    css += `  ${cssVarName}: ${value};\n`;
  }
  
  css += '}\n';
  
  return css;
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    buildTokens();
    console.log('\n✓ Token build complete!');
  } catch (error) {
    console.error('\n✗ Error building tokens:', error);
    process.exit(1);
  }
}


