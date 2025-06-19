# UUID API Endpoints

Complete documentation for all UUID generation, validation, and utility endpoints.

## Base URL
```
https://api.chronexio.com/v1/uuid
```

## Authentication
All endpoints require a valid API key in the Authorization header:
```
Authorization: Bearer cx_live_your_api_key_here
```

---

## UUID v1 - Time-based with MAC Address

**Endpoint:** `/v1/uuid/v1`

### GET /v1/uuid/v1
Generate a single UUID v1.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/uuid/v1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "version": 1,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 1",
      "description": "Time-based UUID with MAC address",
      "privacy_note": "May expose hardware MAC address and timestamp"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "processing_time_ms": 2
  }
}
```

### POST /v1/uuid/v1
Generate multiple UUID v1s.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{"count": 5}' \
     https://api.chronexio.com/v1/uuid/v1
```

**Parameters:**
- `count` (integer, 1-100): Number of UUIDs to generate

**Response:**
```json
{
  "success": true,
  "data": {
    "uuids": [
      "123e4567-e89b-12d3-a456-426614174000",
      "123e4567-e89b-12d3-a456-426614174001",
      "123e4567-e89b-12d3-a456-426614174002"
    ],
    "count": 3,
    "version": 1,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 1",
      "description": "Time-based UUID with MAC address",
      "privacy_note": "May expose hardware MAC address and timestamp"
    }
  }
}
```

---

## UUID v2 - DCE Security

**Endpoint:** `/v1/uuid/v2`

### GET /v1/uuid/v2
Generate a single UUID v2.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/uuid/v2
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "000003e8-e89b-21d3-9456-426614174000",
    "version": 2,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 2",
      "description": "DCE Security UUID with embedded POSIX UID/GID",
      "privacy_note": "May expose local user/group identifiers"
    }
  }
}
```

### POST /v1/uuid/v2
Generate multiple UUID v2s.

**Parameters:**
- `count` (integer, 1-100): Number of UUIDs to generate

---

## UUID v3 - Namespace-based (MD5)

**Endpoint:** `/v1/uuid/v3`

### POST /v1/uuid/v3
Generate deterministic UUID v3 based on namespace and name.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "name": "example.com",
       "namespace": "dns"
     }' \
     https://api.chronexio.com/v1/uuid/v3
```

**Parameters:**
- `name` (string, required): The name to hash
- `namespace` (string, required): Namespace identifier
- `count` (integer, 1-100, optional): Number of UUIDs to generate

**Supported Namespaces:**
- `dns` - Domain Name System
- `url` - Uniform Resource Locator  
- `oid` - Object Identifier
- `x500` - X.500 Distinguished Name
- Custom UUID string

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "5df41881-3aed-3515-88a7-2f4a814cf09e",
    "name": "example.com",
    "namespace": "dns",
    "namespace_uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "version": 3,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 3",
      "description": "Namespace-based UUID using MD5 hashing",
      "note": "Deterministic: same namespace + name always produces same UUID"
    }
  }
}
```

---

## UUID v4 - Random

**Endpoint:** `/v1/uuid/v4`

### GET /v1/uuid/v4
Generate a single random UUID v4.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/uuid/v4
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "version": 4,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 4",
      "description": "Random UUID",
      "note": "Most commonly used, cryptographically random"
    }
  }
}
```

### POST /v1/uuid/v4
Generate multiple random UUID v4s.

**Parameters:**
- `count` (integer, 1-100): Number of UUIDs to generate

---

## UUID v5 - Namespace-based (SHA-1)

**Endpoint:** `/v1/uuid/v5`

### POST /v1/uuid/v5
Generate deterministic UUID v5 based on namespace and name.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "name": "example.com",
       "namespace": "dns"
     }' \
     https://api.chronexio.com/v1/uuid/v5
```

**Parameters:**
- `name` (string, required): The name to hash
- `namespace` (string, required): Namespace identifier  
- `count` (integer, 1-100, optional): Number of UUIDs to generate

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "2ed6657d-e927-568b-95e1-2665a8aea6a2",
    "name": "example.com",
    "namespace": "dns",
    "namespace_uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "version": 5,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 5",
      "description": "Namespace-based UUID using SHA-1 hashing",
      "note": "Deterministic: same namespace + name always produces same UUID"
    }
  }
}
```

---

## UUID v6 - Reordered Time-based

**Endpoint:** `/v1/uuid/v6`

### GET /v1/uuid/v6
Generate a single UUID v6.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/uuid/v6
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "1ec9414c-232a-6b00-b3c8-9e6bdeced846",
    "version": 6,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 6",
      "description": "Reordered time-based UUID (improved v1)",
      "note": "Sortable, timestamp-first format for better database indexing"
    }
  }
}
```

### POST /v1/uuid/v6
Generate multiple UUID v6s.

**Parameters:**
- `count` (integer, 1-100): Number of UUIDs to generate
- `timestamp` (integer/string, optional): Custom timestamp (Unix ms or ISO string)

---

## UUID v7 - Unix Timestamp-based

**Endpoint:** `/v1/uuid/v7`

### GET /v1/uuid/v7
Generate a single UUID v7.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/uuid/v7
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "01856c5a-9b8e-7000-8b85-9634e7b4b2c3",
    "version": 7,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": {
      "name": "Version 7", 
      "description": "Unix timestamp-based UUID",
      "note": "Sortable, millisecond precision Unix timestamp with random data"
    }
  }
}
```

### POST /v1/uuid/v7
Generate multiple UUID v7s.

**Parameters:**
- `count` (integer, 1-100): Number of UUIDs to generate
- `timestamp` (integer/string, optional): Custom timestamp (Unix ms or ISO string)

---

## UUID v8 - Custom/Vendor-specific

**Endpoint:** `/v1/uuid/v8`

### GET /v1/uuid/v8
Get UUID v8 information and redirect to CX-UUIDv8.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "UUID v8 implementation available at CX-UUIDv8 endpoint",
    "redirect_to": "/v1/uuid/cx-uuidv8",
    "info": {
      "name": "Version 8",
      "description": "Custom/vendor-specific UUID with user-defined schema",
      "note": "Configurable field layout: timestamps, fixed values, random data"
    }
  }
}
```

---

## CX-UUIDv8 - Chronexio Custom UUID v8

**Endpoint:** `/v1/uuid/cx-uuidv8`

### GET /v1/uuid/cx-uuidv8
Get CX-UUIDv8 information and available presets.

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "CX-UUIDv8",
    "description": "Chronexio's structured UUID v8 implementation",
    "version": "1.0.0",
    "documentation": "https://docs.chronexio.com/cx-uuidv8",
    "specification": "https://github.com/chronexioassoc/cx-uuidv8-spec",
    "total_bits": 122,
    "reserved_bits": 6,
    "presets": {
      "timestamp-random": {
        "description": "48-bit timestamp + 74-bit random",
        "layout": [
          {"name": "timestamp", "type": "unix_time", "bits": 48},
          {"name": "entropy", "type": "random", "bits": 74}
        ]
      },
      "discord-snowflake": {
        "description": "Discord-style snowflake format",
        "layout": [
          {"name": "timestamp", "type": "unix_time", "bits": 42},
          {"name": "worker_id", "type": "fixed", "value": 1, "bits": 5},
          {"name": "process_id", "type": "fixed", "value": 1, "bits": 5},
          {"name": "sequence", "type": "random", "bits": 70}
        ]
      }
    }
  }
}
```

### POST /v1/uuid/cx-uuidv8
Generate custom UUID v8 with structured schema.

**Request (with preset):**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "preset": "timestamp-random"
     }' \
     https://api.chronexio.com/v1/uuid/cx-uuidv8
```

**Request (with custom layout):**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "layout": [
         {"name": "timestamp", "type": "unix_time", "bits": 48},
         {"name": "region", "type": "fixed", "value": 3, "bits": 8},
         {"name": "entropy", "type": "random", "bits": 66}
       ]
     }' \
     https://api.chronexio.com/v1/uuid/cx-uuidv8
```

**Parameters:**
- `preset` (string): Use predefined layout
- `layout` (array): Custom field definitions
- `values` (object, optional): Override field values

**Field Types:**
- `unix_time`: Unix timestamp (milliseconds)
- `fixed`: Static value
- `random`: Random data

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "01856c5a-9b8e-8003-a1b2-9634e7b4b2c3",
    "version": 8,
    "schema": "cx-uuidv8",
    "fields": {
      "timestamp": 1705401000000,
      "region": 3,
      "entropy": "a1b29634e7b4b2c3"
    },
    "layout": [
      {"name": "timestamp", "type": "unix_time", "bits": 48},
      {"name": "region", "type": "fixed", "value": 3, "bits": 8},
      {"name": "entropy", "type": "random", "bits": 66}
    ],
    "timestamp": "2024-01-15T10:30:00.000Z",
    "info": "Chronexio UUID v8 with structured data"
  }
}
```

### POST /v1/uuid/cx-uuidv8/decode
Decode a CX-UUIDv8 back to its components.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "uuid": "01856c5a-9b8e-8003-a1b2-9634e7b4b2c3",
       "layout": [
         {"name": "timestamp", "type": "unix_time", "bits": 48},
         {"name": "region", "type": "fixed", "value": 3, "bits": 8},
         {"name": "entropy", "type": "random", "bits": 66}
       ]
     }' \
     https://api.chronexio.com/v1/uuid/cx-uuidv8/decode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "01856c5a-9b8e-8003-a1b2-9634e7b4b2c3",
    "valid": true,
    "version": 8,
    "schema": "cx-uuidv8",
    "decoded_fields": {
      "timestamp": 1705401000000,
      "timestamp_iso": "2024-01-15T10:30:00.000Z",
      "region": 3,
      "entropy": "a1b29634e7b4b2c3"
    },
    "layout_used": [
      {"name": "timestamp", "type": "unix_time", "bits": 48},
      {"name": "region", "type": "fixed", "value": 3, "bits": 8},
      {"name": "entropy", "type": "random", "bits": 66}
    ]
  }
}
```

---

## UUID Validation

**Endpoint:** `/v1/uuid/validate`

### POST /v1/uuid/validate
Validate any UUID format and detect version.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
     }' \
     https://api.chronexio.com/v1/uuid/validate
```

**Parameters:**
- `uuid` (string, required): UUID string to validate

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "valid": true,
    "version": 4,
    "variant": "RFC 4122",
    "version_info": {
      "name": "Version 4",
      "description": "Random UUID",
      "note": "Most commonly used, cryptographically random"
    }
  }
}
```

**Invalid UUID Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "invalid-uuid",
    "valid": false,
    "error": "Invalid UUID format"
  }
}
```

---

## Bulk UUID Generation

**Endpoint:** `/v1/uuid/bulk`

### POST /v1/uuid/bulk
Generate multiple UUIDs of different versions in one request.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "requests": [
         {"version": 4, "count": 5},
         {"version": 7, "count": 3},
         {"version": 1, "count": 2}
       ]
     }' \
     https://api.chronexio.com/v1/uuid/bulk
```

**Parameters:**
- `requests` (array): Array of generation requests
  - `version` (integer, 1-8): UUID version
  - `count` (integer, 1-100): Number to generate
  - Additional version-specific parameters

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "version": 4,
        "count": 5,
        "uuids": ["uuid1", "uuid2", "uuid3", "uuid4", "uuid5"]
      },
      {
        "version": 7,
        "count": 3,
        "uuids": ["uuid6", "uuid7", "uuid8"]
      },
      {
        "version": 1,
        "count": 2,
        "uuids": ["uuid9", "uuid10"]
      }
    ],
    "total_generated": 10,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Common Error Codes:**
- `AUTHENTICATION_REQUIRED` - Missing or invalid API key
- `VALIDATION_ERROR` - Invalid request parameters
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `GENERATION_ERROR` - UUID generation failed
- `INTERNAL_ERROR` - Server error

---

## Rate Limits

API calls are subject to rate limiting based on your subscription tier:

- **Free Tier:** 1,000 requests/hour, 10,000/day
- **Developer Tier:** 50,000 requests/hour, 1M/day  
- **Team Tier:** 250,000 requests/hour, 5M/day
- **Enterprise Tier:** Unlimited

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```