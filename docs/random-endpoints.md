# Random/Cryptographic API Endpoints

Complete documentation for all random data generation and cryptographic utility endpoints.

## Base URL
```
https://api.chronexio.com/v1/random
```

## Authentication
All endpoints require a valid API key in the Authorization header:
```
Authorization: Bearer cx_live_your_api_key_here
```

---

## Random Bytes Generation

**Endpoint:** `/v1/random/bytes`

### GET /v1/random/bytes
Get information about random bytes generation capabilities.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/random/bytes
```

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/random/bytes",
    "methods": ["POST"],
    "description": "Generate cryptographically secure random bytes",
    "parameters": {
      "length": "Number of bytes to generate (1-4096)",
      "encoding": "Output format: hex, base64, base64url, binary",
      "options": {
        "entropy_source": "Quality level: standard, high_quality, compound",
        "include_metadata": "Include entropy source information"
      }
    },
    "tier_limits": {
      "free": "256 bytes max",
      "developer": "1024 bytes max",
      "team": "4096 bytes max",
      "enterprise": "Unlimited"
    }
  }
}
```

### POST /v1/random/bytes
Generate cryptographically secure random bytes.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "length": 32,
       "encoding": "hex",
       "options": {
         "entropy_source": "high_quality",
         "include_metadata": true
       }
     }' \
     https://api.chronexio.com/v1/random/bytes
```

**Parameters:**
- `length` (integer, required): Number of bytes (1-4096, varies by tier)
- `encoding` (string, optional): Output encoding (default: hex)
- `options` (object, optional): Generation options

**Encoding Options:**
- `hex`: Hexadecimal output
- `base64`: Base64 encoding
- `base64url`: URL-safe Base64
- `binary`: Binary string

**Entropy Sources:**
- `standard`: Local cryptographic random (fastest)
- `high_quality`: Enhanced entropy collection
- `compound`: Maximum entropy mixing (slowest, highest quality)

**Response:**
```json
{
  "success": true,
  "data": {
    "bytes": "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    "length": 32,
    "encoding": "hex",
    "entropy_bits": 256,
    "entropy_metadata": {
      "sources": ["local_crypto", "system_time", "process_metrics"],
      "estimated_entropy": 256,
      "collection_time_ms": 5,
      "quality_level": "high"
    }
  },
  "meta": {
    "processing_time_ms": 8,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Batch Bytes Generation

**Endpoint:** `/v1/random/bytes/batch`

### POST /v1/random/bytes/batch
Generate multiple random byte sequences in a single request.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "requests": [
         {"length": 16, "encoding": "hex"},
         {"length": 32, "encoding": "base64"},
         {"length": 8, "encoding": "base64url"}
       ],
       "options": {
         "entropy_source": "compound"
       }
     }' \
     https://api.chronexio.com/v1/random/bytes/batch
```

**Response:**
```json
{
  "success": true,
  "data": {
    "batch_size": 3,
    "successful": 3,
    "failed": 0,
    "results": [
      {
        "index": 0,
        "success": true,
        "data": {
          "bytes": "a1b2c3d4e5f6789012345678901234567890abcd",
          "length": 16,
          "encoding": "hex",
          "entropy_bits": 128
        }
      },
      {
        "index": 1,
        "success": true,
        "data": {
          "bytes": "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY=",
          "length": 32,
          "encoding": "base64",
          "entropy_bits": 256
        }
      },
      {
        "index": 2,
        "success": true,
        "data": {
          "bytes": "MTIzNDU2NzE",
          "length": 8,
          "encoding": "base64url",
          "entropy_bits": 64
        }
      }
    ],
    "entropy_source": "compound"
  }
}
```

---

## Random String Generation

**Endpoint:** `/v1/random/string`

### GET /v1/random/string
Get information about random string generation.

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/random/string",
    "description": "Generate random strings with customizable character sets",
    "supported_charsets": [
      "alphanumeric", "alphabetic", "numeric", "uppercase", "lowercase",
      "symbols", "safe_symbols", "custom"
    ],
    "max_length": {
      "free": 256,
      "developer": 1024,
      "team": 4096,
      "enterprise": 16384
    }
  }
}
```

### POST /v1/random/string
Generate random string with specified character set.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "length": 32,
       "charset": "alphanumeric",
       "options": {
         "entropy_source": "standard"
       }
     }' \
     https://api.chronexio.com/v1/random/string
```

**Parameters:**
- `length` (integer, required): String length
- `charset` (string, required): Character set to use
- `options` (object, optional): Generation options

**Character Sets:**
- `alphanumeric`: A-Z, a-z, 0-9
- `alphabetic`: A-Z, a-z
- `numeric`: 0-9
- `uppercase`: A-Z
- `lowercase`: a-z
- `symbols`: Special characters
- `safe_symbols`: URL-safe symbols
- `custom`: User-defined characters

**Response:**
```json
{
  "success": true,
  "data": {
    "string": "Kj8mN2pQ9wE5rTyU3bA7xZ1nC4vB6hM9",
    "length": 32,
    "charset": "alphanumeric",
    "entropy_bits": 190.3
  }
}
```

---

## Token Generation

### Session Tokens

**Endpoint:** `/v1/random/token/session`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "format": "session",
       "include_timestamp": true,
       "include_checksum": false
     }' \
     https://api.chronexio.com/v1/random/token/session
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "sess_01HKQR8Y3NZ1XG4M7P2B9WE5F6_a1b2c3d4e5f67890",
    "format": "session",
    "length": 48,
    "entropy_bits": 284,
    "metadata": {
      "includes_timestamp": true,
      "includes_checksum": false,
      "expires_suggestion": "24h"
    }
  }
}
```

### API Key Tokens

**Endpoint:** `/v1/random/token/api-key`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "length": 48,
       "include_checksum": true,
       "prefix": "cx_live_"
     }' \
     https://api.chronexio.com/v1/random/token/api-key
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "cx_live_a1b2c3d4e5f6789012345678901234567890abcdef123456",
    "length": 56,
    "entropy_bits": 288,
    "includes_checksum": true,
    "metadata": {
      "prefix": "cx_live_",
      "checksum_algorithm": "blake2b",
      "security_level": "high"
    }
  }
}
```

### Correlation IDs

**Endpoint:** `/v1/random/token/correlation-id`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "format": "trace",
       "include_timestamp": true,
       "include_node_id": true
     }' \
     https://api.chronexio.com/v1/random/token/correlation-id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "trace-01hkqr8y3nz1xg4m7p2b9we5f6-node01-a1b2c3d4",
    "format": "trace",
    "length": 48,
    "entropy_bits": 192,
    "metadata": {
      "timestamp_component": "01hkqr8y3nz1xg4m7p2b9we5f6",
      "node_component": "node01",
      "random_component": "a1b2c3d4",
      "sortable": true
    }
  }
}
```

### CSRF Tokens

**Endpoint:** `/v1/random/token/csrf`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "length": 32,
       "encoding": "base64url"
     }' \
     https://api.chronexio.com/v1/random/token/csrf
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "Kj8mN2pQ9wE5rTyU3bA7xZ1nC4vB6hM9yHq4tR2uS8w",
    "length": 32,
    "encoding": "base64url",
    "entropy_bits": 256,
    "metadata": {
      "usage": "CSRF protection",
      "expires_suggestion": "1h",
      "security_note": "Bind to user session"
    }
  }
}
```

---

## Device & Hardware IDs

### Device IDs

**Endpoint:** `/v1/random/device-id`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "format": "hex",
       "length": 16,
       "prefix": "dev_",
       "collision_resistance": "high"
     }' \
     https://api.chronexio.com/v1/random/device-id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "device_id": "dev_a1b2c3d4e5f67890",
    "format": "hex",
    "length": 20,
    "entropy_bits": 128,
    "collision_resistance": "high",
    "metadata": {
      "estimated_uniqueness": "2^128",
      "suitable_for": ["device_tracking", "hardware_id", "instance_id"]
    }
  }
}
```

### Machine IDs

**Endpoint:** `/v1/random/machine-id`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "format": "alphanumeric",
       "length": 24,
       "prefix": "machine_",
       "include_timestamp": true,
       "include_hardware_hint": true
     }' \
     https://api.chronexio.com/v1/random/machine-id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "machine_id": "machine_Kj8mN2pQ9wE5rTyU3bA7xZ-ts:1kqr8y3n-hw:a1b2",
    "format": "alphanumeric",
    "length": 47,
    "base_length": 24,
    "entropy_bits": 142,
    "includes_timestamp": true,
    "includes_hardware_hint": true,
    "prefix_length": 8,
    "usage_guidance": {
      "persistence": "Suitable for persistent machine identification",
      "licensing": "Can be used for software licensing and asset tracking",
      "security": "Not suitable for authentication - use for identification only",
      "storage": "Store with machine registration or configuration data"
    }
  }
}
```

---

## Cryptographic Utilities

### Nonces

**Endpoint:** `/v1/random/nonce`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "length": 16,
       "encoding": "hex",
       "context": "encryption"
     }' \
     https://api.chronexio.com/v1/random/nonce
```

**Response:**
```json
{
  "success": true,
  "data": {
    "nonce": "a1b2c3d4e5f6789012345678901234567890abcd",
    "length": 16,
    "encoding": "hex",
    "entropy_bits": 128,
    "context": "encryption",
    "usage_notes": {
      "uniqueness": "Must be unique per encryption operation",
      "reuse": "Never reuse with the same key",
      "storage": "Can be stored alongside ciphertext"
    }
  }
}
```

### Salt Generation

**Endpoint:** `/v1/random/salt`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "length": 32,
       "encoding": "base64",
       "purpose": "password_hashing"
     }' \
     https://api.chronexio.com/v1/random/salt
```

**Response:**
```json
{
  "success": true,
  "data": {
    "salt": "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw",
    "length": 32,
    "encoding": "base64",
    "entropy_bits": 256,
    "purpose": "password_hashing",
    "usage_notes": {
      "uniqueness": "Must be unique per password/user",
      "storage": "Store with hashed password",
      "minimum_length": "16 bytes recommended for passwords"
    }
  }
}
```

### Key Material

**Endpoint:** `/v1/random/key-material`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "length": 32,
       "encoding": "base64",
       "key_type": "symmetric",
       "entropy_source": "compound"
     }' \
     https://api.chronexio.com/v1/random/key-material
```

**Response:**
```json
{
  "success": true,
  "data": {
    "key_material": "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw",
    "length": 32,
    "encoding": "base64",
    "entropy_bits": 256,
    "key_type": "symmetric",
    "security_notes": {
      "protection": "Protect this value - treat as sensitive cryptographic material",
      "storage": "Store in secure key management system",
      "usage": "Suitable for AES-256 encryption keys",
      "lifecycle": "Implement key rotation policies"
    }
  }
}
```

### Request IDs

**Endpoint:** `/v1/random/request-id`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "format": "uuid_v4",
       "include_timestamp": false
     }' \
     https://api.chronexio.com/v1/random/request-id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "request_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "format": "uuid_v4",
    "length": 36,
    "entropy_bits": 122,
    "includes_timestamp": false,
    "usage_guidance": {
      "purpose": "Request tracing and correlation",
      "logging": "Include in all log messages for this request",
      "headers": "Add to X-Request-ID response header",
      "debugging": "Essential for distributed system debugging"
    }
  }
}
```

---

## Batch Mixed Operations

**Endpoint:** `/v1/random/batch/mixed`

### POST /v1/random/batch/mixed
Generate multiple different types of random data in a single request.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "requests": [
         {
           "type": "bytes",
           "parameters": {
             "length": 16,
             "encoding": "hex"
           }
         },
         {
           "type": "string",
           "parameters": {
             "length": 32,
             "charset": "alphanumeric"
           }
         },
         {
           "type": "token",
           "parameters": {
             "format": "session",
             "include_timestamp": true
           }
         },
         {
           "type": "device-id",
           "parameters": {
             "format": "hex",
             "length": 16,
             "prefix": "dev_"
           }
         }
       ],
       "options": {
         "entropy_source": "high_quality"
       }
     }' \
     https://api.chronexio.com/v1/random/batch/mixed
```

**Response:**
```json
{
  "success": true,
  "data": {
    "batch_size": 4,
    "successful": 4,
    "failed": 0,
    "results": [
      {
        "index": 0,
        "type": "bytes",
        "success": true,
        "data": {
          "bytes": "a1b2c3d4e5f6789012345678901234567890abcd",
          "length": 16,
          "encoding": "hex",
          "entropy_bits": 128
        }
      },
      {
        "index": 1,
        "type": "string",
        "success": true,
        "data": {
          "string": "Kj8mN2pQ9wE5rTyU3bA7xZ1nC4vB6hM9",
          "length": 32,
          "charset": "alphanumeric",
          "entropy_bits": 190.3
        }
      },
      {
        "index": 2,
        "type": "token",
        "success": true,
        "data": {
          "token": "sess_01HKQR8Y3NZ1XG4M7P2B9WE5F6_a1b2c3d4e5f67890",
          "format": "session",
          "length": 48,
          "entropy_bits": 284,
          "metadata": {
            "includes_timestamp": true
          }
        }
      },
      {
        "index": 3,
        "type": "device-id",
        "success": true,
        "data": {
          "device_id": "dev_a1b2c3d4e5f67890",
          "format": "hex",
          "length": 20,
          "entropy_bits": 128,
          "collision_resistance": "medium"
        }
      }
    ],
    "entropy_source": "high_quality",
    "entropy_metadata": {
      "sources": ["local_crypto", "system_time", "process_metrics"],
      "collection_time": 8,
      "shared_entropy": true
    }
  }
}
```

---

## Entropy Status & Testing

### Entropy Status

**Endpoint:** `/v1/random/entropy/status`

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/random/entropy/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "system_entropy": {
      "available": true,
      "quality": "high",
      "sources_online": 3,
      "estimated_entropy_rate": "256 bits/second"
    },
    "entropy_sources": [
      {
        "name": "local_crypto",
        "status": "available",
        "quality": "high",
        "rate_limit": "unlimited"
      },
      {
        "name": "system_time",
        "status": "available", 
        "quality": "medium",
        "rate_limit": "1000/second"
      },
      {
        "name": "process_metrics",
        "status": "available",
        "quality": "low",
        "rate_limit": "100/second"
      }
    ],
    "recommendations": {
      "entropy_source": "compound",
      "reason": "All sources available for maximum quality"
    }
  }
}
```

### Entropy Testing

**Endpoint:** `/v1/random/entropy/test`

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "sample_size": 1024,
       "entropy_source": "compound",
       "run_statistical_tests": true
     }' \
     https://api.chronexio.com/v1/random/entropy/test
```

**Response:**
```json
{
  "success": true,
  "data": {
    "test_results": {
      "sample_size": 1024,
      "entropy_source": "compound",
      "shannon_entropy": 7.998,
      "statistical_tests": {
        "frequency_test": "PASS",
        "serial_test": "PASS", 
        "runs_test": "PASS",
        "longest_runs_test": "PASS"
      },
      "quality_assessment": {
        "overall": "EXCELLENT",
        "bias_detected": false,
        "patterns_detected": false,
        "randomness_score": 0.998
      },
      "collection_metadata": {
        "sources_used": ["local_crypto", "system_time", "process_metrics"],
        "collection_time_ms": 15,
        "mixing_algorithm": "blake2b_kdf"
      }
    },
    "interpretation": {
      "suitable_for": ["cryptographic_keys", "session_tokens", "nonces"],
      "confidence_level": "high",
      "notes": "Entropy quality meets cryptographic standards"
    }
  }
}
```

---

## Plan Limitations

### Free Tier
- **Max Bytes per Request:** 256 bytes
- **Max String Length:** 256 characters
- **Batch Size:** 1 request
- **Entropy Sources:** Standard only
- **Token Types:** Basic session tokens
- **Device IDs:** Standard format only

### Developer Tier
- **Max Bytes per Request:** 1024 bytes
- **Max String Length:** 1024 characters
- **Batch Size:** 10 requests
- **Entropy Sources:** All available
- **Token Types:** All supported
- **Device IDs:** All formats and options

### Team Tier
- **Max Bytes per Request:** 4096 bytes
- **Max String Length:** 4096 characters
- **Batch Size:** 100 requests
- **Entropy Sources:** All available
- **Token Types:** All supported
- **Device IDs:** All formats and options

### Enterprise Tier
- **Max Bytes per Request:** Unlimited
- **Max String Length:** 16384 characters
- **Batch Size:** 1000 requests
- **Entropy Sources:** All available + custom
- **Token Types:** All supported + custom formats
- **Device IDs:** All formats and custom algorithms

---

## Error Responses

```json
{
  "success": false,
  "error": {
    "code": "LENGTH_EXCEEDS_LIMIT",
    "message": "Requested length exceeds tier limit of 256 bytes",
    "details": {
      "requested": 512,
      "limit": 256,
      "tier": "free"
    }
  }
}
```

**Common Error Codes:**
- `LENGTH_EXCEEDS_LIMIT` - Requested size too large for tier
- `INVALID_CHARSET` - Unsupported character set
- `INVALID_ENCODING` - Unsupported output encoding
- `BATCH_SIZE_EXCEEDED` - Too many requests in batch
- `ENTROPY_UNAVAILABLE` - Entropy sources temporarily unavailable
- `TOKEN_FORMAT_INVALID` - Unsupported token format

---

## Rate Limits

Random generation operations count toward your overall API rate limits:

- **Free Tier:** 1,000 requests/hour, 10,000/day
- **Developer Tier:** 50,000 requests/hour, 1M/day
- **Team Tier:** 250,000 requests/hour, 5M/day
- **Enterprise Tier:** Unlimited

High-entropy operations may consume additional quota based on processing time.