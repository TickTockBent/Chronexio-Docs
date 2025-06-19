export const SITE_CONFIG = {
  name: 'Chronexio',
  description: 'Developer infrastructure that moves at the speed of thought',
  url: 'https://docs.chronexio.com',
  ogImage: 'https://docs.chronexio.com/og-image.png',
  links: {
    github: 'https://github.com/chronexio',
    twitter: 'https://twitter.com/chronexio',
    discord: 'https://discord.gg/chronexio',
  },
};

export const API_CONFIG = {
  baseUrl: 'https://api.chronexio.com',
  version: 'v1',
  docsEndpoint: '/v1/docs',
};

export const NAVIGATION_ITEMS = [
  {
    title: 'Getting Started',
    href: '/getting-started',
    description: 'Quick start guide and basic concepts',
  },
  {
    title: 'API Reference',
    href: '/api',
    description: 'Complete API documentation',
    children: [
      { title: 'UUID', href: '/api/uuid', description: 'UUID generation and validation' },
      { title: 'Hash', href: '/api/hash', description: 'Cryptographic hashing' },
      { title: 'Convert', href: '/api/convert', description: 'Data encoding and conversion' },
      { title: 'Random', href: '/api/random', description: 'Random data generation' },
      { title: 'Text', href: '/api/text', description: 'Text processing and validation' },
    ],
  },
  {
    title: 'Guides',
    href: '/guides',
    description: 'Integration guides and best practices',
  },
  {
    title: 'Examples',
    href: '/examples',
    description: 'Code examples and use cases',
  },
];

export const API_CATEGORIES = {
  uuid: {
    title: 'UUID',
    description: 'Generate and validate UUIDs v1-v8',
    icon: 'Hash',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  hash: {
    title: 'Hash',
    description: 'Cryptographic hashing and password security',
    icon: 'Shield',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  convert: {
    title: 'Convert',
    description: 'Data encoding and format conversion',
    icon: 'RefreshCw',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  random: {
    title: 'Random',
    description: 'Secure random data generation',
    icon: 'Shuffle',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  text: {
    title: 'Text',
    description: 'Text processing and validation',
    icon: 'Type',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
} as const;

export const HTTP_METHODS = {
  GET: { label: 'GET', color: 'method-get' },
  POST: { label: 'POST', color: 'method-post' },
  PUT: { label: 'PUT', color: 'method-put' },
  PATCH: { label: 'PATCH', color: 'method-put' },
  DELETE: { label: 'DELETE', color: 'method-delete' },
} as const;

export const STATUS_INDICATORS = {
  online: { label: 'Operational', color: 'status-online', bgColor: 'bg-success/10' },
  degraded: { label: 'Degraded', color: 'status-degraded', bgColor: 'bg-warning/10' },
  offline: { label: 'Down', color: 'status-offline', bgColor: 'bg-error/10' },
} as const;

export const TIER_COLORS = {
  free: 'text-gray-600 bg-gray-100',
  developer: 'text-blue-600 bg-blue-100',
  team: 'text-purple-600 bg-purple-100',
  enterprise: 'text-amber-600 bg-amber-100',
} as const;

export const CODE_EXAMPLES = {
  curl: {
    label: 'cURL',
    language: 'bash',
    icon: 'Terminal',
  },
  javascript: {
    label: 'JavaScript',
    language: 'javascript',
    icon: 'Code',
  },
  python: {
    label: 'Python',
    language: 'python',
    icon: 'Code',
  },
  node: {
    label: 'Node.js',
    language: 'javascript',
    icon: 'Code',
  },
} as const;