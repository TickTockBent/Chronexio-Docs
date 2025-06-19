# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Chronexio API documentation repository containing comprehensive markdown documentation for the Chronexio API platform. The repository serves as the content source for docs.chronexio.com, a Next.js-based documentation site.

### Core Purpose
- **API Documentation**: Complete documentation for UUID, hash, convert, random, and text manipulation endpoints
- **Style Guide**: Brand and design system guidelines for consistent UI implementation
- **Site Specification**: Technical architecture for the documentation website

## Development Commands

### Essential Commands
```bash
# Development server on port 3001
npm run dev

# Production build
npm run build

# Start production server on port 3001
npm start

# Linting (ALWAYS run before committing)
npm run lint

# Type checking (ALWAYS run before committing)
npm run type-check
```

### Development Workflow
1. Run `npm run dev` to start the development server
2. Before committing changes, ALWAYS run both `npm run lint` and `npm run type-check`
3. The site runs on port 3001 to avoid conflicts with other services

## Architecture Overview

### Next.js 15 App Router Structure
This is a Next.js 15 application using the App Router with TypeScript. Key architectural patterns:

**Dynamic API Documentation**: The `/api/[category]` pages dynamically fetch live API documentation from `https://api.chronexio.com/v1` and render it with fallback handling for build time.

**API Client (`lib/api.ts`)**: Centralized API client with error handling and fallback data. The `apiClient.getCategoryDocumentation()` method transforms live API responses into documentation structure.

**Constants (`lib/constants.ts`)**: Configuration for API categories, navigation, colors, and UI constants. The `API_CATEGORIES` object defines the 5 main API categories: uuid, hash, convert, random, text.

**Component System**: Located in `/components/ui/` with consistent design system components (Card, Button, Badge, CodeBlock) following the Chronexio brand guidelines.

**Styling**: Tailwind CSS with custom theme extending brand colors (Electric Blue #0066ff, Neon Green #00ff88, Deep Space #0a0a0f). Custom font setup with Space Grotesk, Inter, and JetBrains Mono.

### Key Files to Understand
- `app/api/[category]/page.tsx` - Dynamic API category pages that fetch and render live documentation
- `lib/api.ts` - API client with live data fetching and fallback handling  
- `lib/constants.ts` - Core configuration and category definitions
- `app/layout.tsx` - Root layout with font setup and metadata
- `tailwind.config.ts` - Custom theme with brand colors and typography

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

## Current Implementation Status

### Completed Pages
- **Homepage** (`/`) - Landing with hero, API categories, features
- **API Reference** (`/api`) - Dynamic API overview with status indicators
- **Category Pages** (`/api/[category]`) - Dynamic category documentation
- **Getting Started** (`/getting-started`) - Complete onboarding guide
- **Guides** (`/guides`) - Coming soon page with planned content preview
- **Examples** (`/examples`) - Coming soon page with upcoming examples

### Dynamic API Integration
- **Live Documentation**: Fetches from Portal API endpoints
- **Fallback Handling**: Graceful degradation during build/development
- **Category Discovery**: Auto-discovery of API categories and endpoints
- **Real-time Status**: API health indicators and performance metrics

### Development Notes

#### Site Architecture
- **Next.js 15** with App Router and TypeScript
- **Dynamic routing** for API categories: `/api/[category]`
- **Server-side rendering** with static generation where possible
- **API client** with error handling and fallback data

#### Content Strategy
- **Static Pages**: Guides, examples, getting started (markdown-based)
- **Dynamic Pages**: API reference (generated from live API)
- **Coming Soon Pages**: Professional placeholders with planned content previews
- **Responsive Design**: Mobile-first with desktop enhancements

#### Brand Consistency
- **Design System**: Matches marketing site exactly
- **Color Palette**: Electric Blue, Neon Green, Deep Space
- **Typography**: Space Grotesk, Inter, JetBrains Mono
- **Components**: Consistent cards, buttons, badges, code blocks
- **Light Mode**: Optimized for excellent light mode experience

#### API Documentation Features
- **Method Badges**: Color-coded HTTP methods (GET, POST, etc.)
- **Tier Information**: Access levels per subscription tier
- **Rate Limits**: User-specific rate limiting information
- **Code Examples**: Multi-language examples with copy functionality
- **Error Documentation**: Complete error code references