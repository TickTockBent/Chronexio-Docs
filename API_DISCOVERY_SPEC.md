# API Discovery Specification for Documentation System

This document outlines the expected API response structure for the Chronexio documentation system's three-layer discovery approach.

## Overview

The documentation system uses a three-layer discovery pattern:
1. **Layer 1**: `/v1` - Service catalog discovery
2. **Layer 2**: `/v1/{category}` - Category endpoint listing  
3. **Layer 3**: `/v1/{category}/{endpoint}` - Individual endpoint documentation

## Layer 1: Service Catalog (`/v1`)

**Expected Response Structure:**
```json
{
  "browse_services": {
    "uuid": {
      "name": "UUID Generation",
      "description": "Generate all UUID versions (v1-v8) including custom CX-UUIDv8",
      "discovery_url": "https://api.chronexio.com/v1/uuid",
      "browse_link": "Click to explore all UUID endpoints"
    },
    "hash": {
      "name": "Cryptographic Hashing", 
      "description": "Generate secure hashes using multiple algorithms",
      "discovery_url": "https://api.chronexio.com/v1/hash",
      "browse_link": "Click to explore all hash endpoints"
    }
    // ... other categories
  }
}
```

**Purpose**: Lists all available service categories with basic metadata.

## Layer 2: Category Endpoint Listing (`/v1/{category}`)

**Expected Response Structure:**
```json
{
  "service": "Cryptographic Hashing",
  "description": "Generate secure hashes using industry-standard algorithms for strings and files",
  "documentation": "https://docs.chronexio.com/api/hash",
  "endpoints": [
    {
      "method": "POST",
      "path": "/v1/hash/string", 
      "description": "Hash a text string using specified algorithm"
    },
    {
      "method": "POST",
      "path": "/v1/hash/file",
      "description": "Hash file content provided as base64"
    },
    {
      "method": "POST", 
      "path": "/v1/hash/string/batch",
      "description": "Hash multiple strings in a single request"
    },
    {
      "method": "POST",
      "path": "/v1/hash/file/batch", 
      "description": "Hash multiple files in a single request"
    }
  ],
  "examples": {
    "string_hash": {
      "description": "Hash a password",
      "request": "curl -X POST -H 'Authorization: Bearer YOUR_API_KEY' -H 'Content-Type: application/json' -d '{\"text\": \"mypassword\", \"algorithm\": \"sha256\"}' https://api.chronexio.com/v1/hash/string"
    }
  }
}
```

**Critical Requirements:**
- **Must include `endpoints` array** with objects containing:
  - `method`: HTTP method (GET, POST, etc.)
  - `path`: Full endpoint path
  - `description`: Brief description of what the endpoint does
- Optional fields: `service`, `description`, `documentation`, `examples`

## Layer 3: Individual Endpoint Documentation (`/v1/{category}/{endpoint}`)

**Expected Response Structure:**
```json
{
  "endpoint": "String Hashing",
  "description": "Hash text strings using various cryptographic algorithms",
  "method": "POST",
  "path": "/v1/hash/string",
  "authentication": "Bearer token required",
  "parameters": {
    "input": {
      "type": "string",
      "description": "Text string to hash", 
      "required": true,
      "example": "Hello World"
    },
    "algorithm": {
      "type": "string",
      "description": "Hash algorithm to use",
      "required": true,
      "example": "sha256"
    },
    "encoding": {
      "type": "string", 
      "description": "Output encoding format",
      "required": false,
      "default": "hex",
      "example": "hex"
    }
  },
  "examples": [
    {
      "description": "Hash string with SHA-256",
      "request": "curl -X POST -H 'Authorization: Bearer YOUR_API_KEY' -H 'Content-Type: application/json' -d '{\"input\": \"Hello World\", \"algorithm\": \"sha256\"}' https://api.chronexio.com/v1/hash/string",
      "response": {
        "success": true,
        "data": {
          "hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
          "algorithm": "sha256",
          "encoding": "hex"
        }
      }
    }
  ],
  "related_endpoints": [
    "https://api.chronexio.com/v1/hash",
    "https://api.chronexio.com/v1/hash/file"
  ],
  "get_api_key": "https://portal.chronexio.com",
  "documentation": "https://docs.chronexio.com",
  "note": "This is discovery mode. Include Authorization header to use this endpoint."
}
```

**Critical Requirements:**
- **Must include**: `endpoint`, `description`, `method`, `path`, `authentication`
- **Parameters**: Object with parameter definitions including `type`, `description`, `required`
- **Examples**: Array of example objects with `description`, `request`, `response`
- Optional: `related_endpoints`, `get_api_key`, `documentation`, `note`

## Working Example: UUID Category

The UUID endpoints follow this pattern correctly:

**Layer 2 Response** (`/v1/uuid`):
```json
{
  "service": "UUID Generation",
  "description": "Generate all UUID versions (v1-v8) including custom CX-UUIDv8", 
  "endpoints": [
    {
      "method": "GET",
      "path": "/v1/uuid/v1",
      "description": "Generate UUID Version 1 (time-based)"
    },
    {
      "method": "GET", 
      "path": "/v1/uuid/v4",
      "description": "Generate UUID Version 4 (random)"
    },
    {
      "method": "POST",
      "path": "/v1/uuid/ct-uuidv8/decode", 
      "description": "Decode Chronexio's custom UUID v8"
    }
  ]
}
```

**Layer 3 Response** (`/v1/uuid/v4`):
```json
{
  "endpoint": "UUID v4 Generation",
  "description": "Generate random UUID version 4 (RFC 4122)",
  "method": "GET",
  "path": "/v1/uuid/v4",
  "authentication": "Bearer token required",
  "examples": [
    {
      "description": "Generate a single UUID v4",
      "request": "curl -H 'Authorization: Bearer YOUR_API_KEY' https://api.chronexio.com/v1/uuid/v4",
      "response": {
        "success": true,
        "data": {
          "uuid": "550e8400-e29b-41d4-a716-446655440000",
          "version": 4
        }
      }
    }
  ],
  "related_endpoints": [
    "https://api.chronexio.com/v1/uuid",
    "https://api.chronexio.com/v1/uuid/bulk"
  ]
}
```

## Current Hash Endpoint Issues

The hash endpoints currently return a different structure:

❌ **Problem**: `/v1/hash` returns discovery metadata instead of endpoint list
❌ **Problem**: Endpoints listed in `examples[0].response.available_endpoints` instead of `endpoints` array
❌ **Problem**: `/v1/hash/file` returns GET method but should be POST for consistency

## Documentation System Behavior

**What the docs system does:**
1. Fetches `/v1/{category}` (Layer 2)
2. Parses `endpoints` array to build category page
3. For each endpoint, optionally fetches `/v1/{category}/{endpoint}` (Layer 3) for enhanced details
4. Displays endpoints in grid layout with method badges, paths, and descriptions

**What happens when structure is wrong:**
- Missing `endpoints` array → No endpoints show on category page  
- Wrong method → Incorrect badge colors (GET=green, POST=blue)
- Missing descriptions → Generic fallback text

## Recommended Changes for Hash Endpoints

To make hash endpoints work with the documentation system:

1. **Update `/v1/hash`** to return `endpoints` array instead of discovery metadata
2. **Ensure consistent methods**: All hash operations should be POST
3. **Update `/v1/hash/file`** method from GET to POST  
4. **Move endpoint list** from `examples[0].response.available_endpoints` to top-level `endpoints` array

This will make hash endpoints display properly in the documentation grid layout with correct method badges and descriptions.