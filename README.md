# Chronexio Documentation Site

This is the official documentation site for Chronexio APIs, built with Next.js 15 and featuring dynamic API documentation generation.

## Features

- **Dynamic API Documentation**: Automatically generated from the live API
- **Interactive Testing**: Test endpoints directly in the browser
- **Comprehensive Guides**: Getting started, integration patterns, and examples
- **Modern Design**: Following Chronexio's design system and brand guidelines
- **Dark Mode Support**: Automatic theme switching with user preferences
- **Mobile Responsive**: Optimized for all device sizes

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) in your browser.

### Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Typography**: Inter, Space Grotesk, JetBrains Mono
- **Components**: Custom UI components following Chronexio brand
- **API Integration**: Dynamic documentation from Portal API

### Project Structure

```
/app/                 # Next.js App Router pages
  /api/              # API documentation pages
  /getting-started/  # Getting started guide
  /guides/           # Integration guides
  /examples/         # Code examples
/components/         # Reusable React components
  /ui/              # Basic UI components
  /navigation/      # Navigation components
  /providers/       # Context providers
/lib/               # Utility functions and API clients
/docs/              # Static markdown documentation
```

### Dynamic Documentation

The site fetches API documentation dynamically from the Chronexio Portal API:

- **Main docs endpoint**: `/v1/docs` - API overview and discovery
- **Category docs**: `/v1/docs/{category}` - Category-specific documentation  
- **Endpoint docs**: Individual endpoints return their own documentation via GET requests

This ensures the documentation is always up-to-date with the actual API implementation.

## Design System

The site follows Chronexio's design system with:

- **Colors**: Electric Blue (#0066ff), Neon Green (#00ff88), Deep Space (#0a0a0f)
- **Typography**: Space Grotesk for headings, Inter for body text, JetBrains Mono for code
- **Components**: Cards, buttons, badges, code blocks with consistent styling
- **Dark Mode**: Full dark mode support with automatic switching

## Deployment

The site is designed to be deployed on Vercel with automatic builds from the main branch.

### Environment Variables

- None required for basic functionality
- Optional: Analytics tracking IDs

### Build Optimization

- Static generation for performance
- Image optimization with Next.js
- Font optimization with Google Fonts
- Code splitting and tree shaking

## Contributing

1. Follow the existing code style and patterns
2. Ensure all components support dark mode
3. Add proper TypeScript types
4. Test responsive design on mobile devices
5. Update documentation for new features

## License

Proprietary - Chronexio, Inc.