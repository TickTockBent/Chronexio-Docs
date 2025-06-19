# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Chronexio API documentation repository containing comprehensive markdown documentation for the Chronexio API platform. The repository serves as the content source for docs.chronexio.com, a Next.js-based documentation site.

### Core Purpose
- **API Documentation**: Complete documentation for UUID, hash, convert, random, and text manipulation endpoints
- **Style Guide**: Brand and design system guidelines for consistent UI implementation
- **Site Specification**: Technical architecture for the documentation website

## Repository Structure

```
/docs/
├── chronexio_docs_site_spec.md    # Next.js site architecture & technical spec
├── chronexio_style_guide.md       # Brand guidelines, colors, typography, components
├── uuid-endpoints.md              # UUID v1-v8 generation and validation APIs
├── hash-endpoints.md              # Cryptographic hashing (SHA, MD5, bcrypt, etc.)
├── convert-endpoints.md           # Text/data encoding and conversion APIs
├── random-endpoints.md            # Random data generation endpoints
└── text-manipulation.md           # Text processing and manipulation APIs
```

## Content Architecture

### Documentation Standards
All API documentation follows a consistent structure:
- **Base URL**: https://api.chronexio.com/v1/{category}
- **Authentication**: Bearer token format: `cx_live_your_api_key_here`
- **Response Format**: Standardized JSON with success/data/meta structure
- **Code Examples**: curl, JavaScript, Python examples for each endpoint

### Frontmatter Schema
Documentation uses YAML frontmatter for metadata:
```yaml
---
title: "Endpoint Name"
description: "Brief description"
category: "Core APIs"
order: 1
version: "1.0"
lastUpdated: "2025-06-19"
endpoints:
  - method: "GET/POST"
    path: "/v1/category/endpoint"
    summary: "Description"
---
```

## Brand Guidelines (from chronexio_style_guide.md)

### Color Palette
- **Electric Blue (#0066ff)**: Primary CTAs, links, brand elements
- **Deep Space (#0a0a0f)**: Primary background, dark theme base
- **Neon Green (#00ff88)**: Success states, active indicators
- **Amber Warning (#ffaa00)**: Warning states, attention items
- **Critical Red (#ff3366)**: Error states, critical alerts

### Typography
- **Headlines**: Space Grotesk (300, 400, 500, 700)
- **Body Text**: Inter (400, 500, 600)
- **Code**: JetBrains Mono (400, 500, 700)

### Component Standards
- **Border radius**: 8px for buttons, 6px for inputs, 12px for cards
- **Spacing**: 4px base unit (0.25rem)
- **Shadows**: Subtle elevation with rgba(0, 0, 0, 0.1)

## Technical Architecture (from chronexio_docs_site_spec.md)

### Next.js 14 Implementation
- **App Router**: Server-side rendering for SEO
- **Content Processing**: MDX with remark/rehype plugins
- **Dependencies**: next-mdx-remote, gray-matter, tailwindcss, framer-motion

### Content Processing Pipeline
```typescript
// Markdown processing with frontmatter parsing
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
```

### Site Structure
- **Primary Domain**: docs.chronexio.com
- **Sections**: /getting-started, /api-reference, /guides, /examples, /sdks
- **Cross-linking**: Integration with portal.chronexio.com and www.chronexio.com

## API Categories

### UUID Endpoints (uuid-endpoints.md)
- **UUID v1**: Time-based with MAC address
- **UUID v4**: Random/pseudo-random
- **UUID v5**: Namespace and name-based (SHA-1)
- **UUID v7**: Time-ordered with random data
- **CX-UUID v8**: Chronexio's custom structured format

### Hash Endpoints (hash-endpoints.md)
- **Algorithms**: MD5, SHA1, SHA256, SHA384, SHA512, HMAC variants
- **Password Hashing**: bcrypt, scrypt, argon2id
- **Encodings**: hex, base64, base64url

### Convert Endpoints (convert-endpoints.md)
- **Text Encoding**: UTF-8, Base64, Hex, URL encoding
- **Binary Conversions**: Various format transformations
- **Validation**: Strict mode options

## Development Notes

### Content Updates
- Edit markdown files in `/docs/` directory
- Follow consistent API documentation structure
- Maintain frontmatter metadata for proper site generation
- Use standardized code examples with proper authentication headers

### Brand Consistency
- Follow color palette and typography guidelines from style guide
- Use consistent component patterns and spacing
- Maintain accessibility standards (WCAG 2.1 AA)
- Implement responsive design principles

### API Documentation Best Practices
- Include complete curl examples with authentication
- Provide response examples with realistic data
- Document error cases and status codes
- Include rate limiting and usage information
- Cross-reference related endpoints and guides