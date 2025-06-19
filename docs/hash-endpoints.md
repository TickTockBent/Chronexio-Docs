# Hash API Endpoints

Complete documentation for all cryptographic hashing endpoints supporting multiple algorithms and encoding formats.

## Base URL
```
https://api.chronexio.com/v1/hash
```

## Authentication
All endpoints require a valid API key in the Authorization header:
```
Authorization: Bearer cx_live_your_api_key_here
```

---

## String Hashing

**Endpoint:** `/v1/hash/string`

### GET /v1/hash/string
Get information about the string hashing endpoint and your plan limits.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/hash/string
```

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/hash/string",
    "description": "Hash string input with specified algorithm",
    "method": "POST",
    "supported_algorithms": [
      "md5", "sha1", "sha256", "sha384", "sha512",
      "hmac-sha256", "hmac-sha512",
      "bcrypt", "scrypt", "argon2id"
    ],
    "supported_encodings": ["hex", "base64", "base64url"],
    "current_plan_limits": {
      "max_string_length": 1048576,
      "allowed_algorithms": ["sha256"],
      "password_hashing": false,
      "hmac": false
    },
    "example_requests": {
      "basic_sha256": {
        "input": "hello world",
        "algorithm": "sha256"
      },
      "hmac_example": {
        "input": "message to authenticate",
        "algorithm": "hmac-sha256",
        "options": { "key": "secret_key" }
      },
      "password_hashing": {
        "input": "password123",
        "algorithm": "bcrypt",
        "options": { "rounds": 12 }
      }
    }
  }
}
```

### POST /v1/hash/string
Hash a string using the specified algorithm.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "hello world",
       "algorithm": "sha256",
       "encoding": "hex"
     }' \
     https://api.chronexio.com/v1/hash/string
```

**Parameters:**
- `input` (string, required): String to hash
- `algorithm` (string, required): Hashing algorithm
- `encoding` (string, optional): Output encoding (default: hex)
- `options` (object, optional): Algorithm-specific options

**Supported Algorithms by Tier:**

**Free Tier:**
- `sha256` only

**Developer+ Tiers:**
- `md5`, `sha1`, `sha256`, `sha384`, `sha512`
- `hmac-sha256`, `hmac-sha512`
- `bcrypt`, `scrypt`, `argon2id`

**Response:**
```json
{
  "success": true,
  "data": {
    "hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    "algorithm": "sha256",
    "encoding": "hex",
    "input_length": 11
  },
  "meta": {
    "processing_time_ms": 2,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**HMAC Example:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "message to authenticate",
       "algorithm": "hmac-sha256",
       "encoding": "hex",
       "options": {
         "key": "secret_key"
       }
     }' \
     https://api.chronexio.com/v1/hash/string
```

**Password Hashing Example:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "password123",
       "algorithm": "bcrypt",
       "options": {
         "rounds": 12
       }
     }' \
     https://api.chronexio.com/v1/hash/string
```

---

## Batch String Hashing

**Endpoint:** `/v1/hash/string/batch`

### GET /v1/hash/string/batch
Get information about batch string hashing capabilities.

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/hash/string/batch",
    "description": "Hash multiple strings in a single request",
    "method": "POST",
    "batch_limits": {
      "free": "1 string maximum",
      "developer": "10 strings maximum", 
      "team": "100 strings maximum",
      "enterprise": "1000 strings maximum"
    },
    "efficiency_benefits": [
      "Reduced API call overhead",
      "Consistent processing time",
      "Atomic batch operations"
    ]
  }
}
```

### POST /v1/hash/string/batch
Hash multiple strings in a single request.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "requests": [
         {
           "input": "hello world",
           "algorithm": "sha256"
         },
         {
           "input": "password123", 
           "algorithm": "bcrypt",
           "options": {"rounds": 10}
         },
         {
           "input": "secret message",
           "algorithm": "hmac-sha256",
           "options": {"key": "secret_key"}
         }
       ]
     }' \
     https://api.chronexio.com/v1/hash/string/batch
```

**Parameters:**
- `requests` (array, required): Array of hash requests
  - `input` (string): String to hash
  - `algorithm` (string): Hashing algorithm  
  - `encoding` (string, optional): Output encoding
  - `options` (object, optional): Algorithm options

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
          "hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
          "algorithm": "sha256",
          "encoding": "hex",
          "input_length": 11
        }
      },
      {
        "index": 1,
        "success": true,
        "data": {
          "hash": "$2b$10$N9qo8uLOickgx2ZMRZoMye",
          "algorithm": "bcrypt",
          "encoding": "bcrypt",
          "input_length": 11
        }
      },
      {
        "index": 2,
        "success": true,
        "data": {
          "hash": "20794bf25b97fcf6f988f20e5b51b7e43e24ad28c3e5b4e80f38b5a1d9b7d0ea",
          "algorithm": "hmac-sha256", 
          "encoding": "hex",
          "input_length": 14
        }
      }
    ]
  }
}
```

---

## File Hashing

**Endpoint:** `/v1/hash/file`

### GET /v1/hash/file
Get information about file hashing capabilities.

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/hash/file",
    "description": "Hash file contents with specified algorithm",
    "method": "POST",
    "supported_upload_methods": [
      "base64_content",
      "multipart_form_data",
      "binary_content"
    ],
    "max_file_sizes": {
      "free": "1 MB",
      "developer": "10 MB",
      "team": "100 MB", 
      "enterprise": "1 GB"
    },
    "supported_algorithms": [
      "md5", "sha1", "sha256", "sha384", "sha512"
    ]
  }
}
```

### POST /v1/hash/file
Hash file contents using the specified algorithm.

**Request (Base64 Content):**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "content": "SGVsbG8gV29ybGQ=",
       "content_type": "base64",
       "algorithm": "sha256",
       "encoding": "hex",
       "filename": "hello.txt"
     }' \
     https://api.chronexio.com/v1/hash/file
```

**Request (Multipart Form):**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -F "file=@document.pdf" \
     -F "algorithm=sha256" \
     -F "encoding=hex" \
     https://api.chronexio.com/v1/hash/file
```

**Parameters:**
- `content` (string): File content (base64 encoded)
- `content_type` (string): Content encoding type
- `algorithm` (string, required): Hashing algorithm
- `encoding` (string, optional): Output encoding
- `filename` (string, optional): Original filename

**Response:**
```json
{
  "success": true,
  "data": {
    "hash": "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969",
    "algorithm": "sha256",
    "encoding": "hex",
    "file_size": 1024,
    "filename": "document.pdf",
    "content_type": "application/pdf"
  },
  "meta": {
    "processing_time_ms": 15,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Batch File Hashing

**Endpoint:** `/v1/hash/file/batch`

### POST /v1/hash/file/batch
Hash multiple files in a single request.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "requests": [
         {
           "content": "SGVsbG8gV29ybGQ=",
           "content_type": "base64",
           "algorithm": "sha256",
           "filename": "hello.txt"
         },
         {
           "content": "VGVzdCBmaWxl",
           "content_type": "base64", 
           "algorithm": "md5",
           "filename": "test.txt"
         }
       ]
     }' \
     https://api.chronexio.com/v1/hash/file/batch
```

**Response:**
```json
{
  "success": true,
  "data": {
    "batch_size": 2,
    "successful": 2,
    "failed": 0,
    "total_size_bytes": 1536,
    "results": [
      {
        "index": 0,
        "success": true,
        "data": {
          "hash": "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969",
          "algorithm": "sha256",
          "encoding": "hex",
          "file_size": 1024,
          "filename": "hello.txt"
        }
      },
      {
        "index": 1,
        "success": true,
        "data": {
          "hash": "098f6bcd4621d373cade4e832627b4f6",
          "algorithm": "md5",
          "encoding": "hex", 
          "file_size": 512,
          "filename": "test.txt"
        }
      }
    ]
  }
}
```

---

## Algorithm Options

### Basic Hash Algorithms
No additional options required for: `md5`, `sha1`, `sha256`, `sha384`, `sha512`

### HMAC Algorithms
Required options for: `hmac-sha256`, `hmac-sha512`

```json
{
  "options": {
    "key": "secret_key_string"
  }
}
```

### Password Hashing Algorithms

**bcrypt:**
```json
{
  "options": {
    "rounds": 12
  }
}
```

**scrypt:**
```json
{
  "options": {
    "N": 16384,
    "r": 8,
    "p": 1,
    "keylen": 64
  }
}
```

**argon2id:**
```json
{
  "options": {
    "memory": 65536,
    "iterations": 3,
    "parallelism": 4,
    "hashLength": 32
  }
}
```

---

## Encoding Options

**hex** (default):
```
b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

**base64**:
```
uU0nuZNNPgimLlLX2n2r+sSE7+N6U4DukIj3rOLvzek=
```

**base64url**:
```
uU0nuZNNPgimLlLX2n2r-sSE7-N6U4DukIj3rOLvzek
```

---

## Plan Limitations

### Free Tier
- **Algorithms:** SHA-256 only
- **Max String Length:** 1 MB
- **Max File Size:** 1 MB
- **Batch Size:** 1 request
- **HMAC:** Not available
- **Password Hashing:** Not available

### Developer Tier
- **Algorithms:** All supported
- **Max String Length:** 10 MB
- **Max File Size:** 10 MB
- **Batch Size:** 10 requests
- **HMAC:** Available
- **Password Hashing:** Available

### Team Tier
- **Algorithms:** All supported
- **Max String Length:** 100 MB
- **Max File Size:** 100 MB
- **Batch Size:** 100 requests
- **HMAC:** Available
- **Password Hashing:** Available

### Enterprise Tier
- **Algorithms:** All supported + custom
- **Max String Length:** 1 GB
- **Max File Size:** 1 GB
- **Batch Size:** 1000 requests
- **HMAC:** Available
- **Password Hashing:** Available

---

## Error Responses

```json
{
  "success": false,
  "error": {
    "code": "ALGORITHM_NOT_ALLOWED",
    "message": "Algorithm 'bcrypt' requires Developer tier or higher",
    "details": {
      "tier": "free",
      "algorithm": "bcrypt",
      "allowed_algorithms": ["sha256"]
    }
  }
}
```

**Common Error Codes:**
- `ALGORITHM_NOT_ALLOWED` - Algorithm not available in current tier
- `INPUT_TOO_LARGE` - Input exceeds size limits
- `INVALID_ALGORITHM` - Unsupported algorithm
- `INVALID_ENCODING` - Unsupported encoding format
- `HMAC_KEY_REQUIRED` - HMAC algorithms require key option
- `BATCH_SIZE_EXCEEDED` - Too many requests in batch
- `PROCESSING_ERROR` - Hash computation failed

---

## Rate Limits

Hash operations count toward your overall API rate limits:

- **Free Tier:** 1,000 requests/hour, 10,000/day
- **Developer Tier:** 50,000 requests/hour, 1M/day
- **Team Tier:** 250,000 requests/hour, 5M/day
- **Enterprise Tier:** Unlimited

Large file processing may consume additional quota based on processing time.