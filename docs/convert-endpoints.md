# Convert/Encode API Endpoints

Complete documentation for all text and data conversion endpoints supporting multiple encoding formats.

## Base URL
```
https://api.chronexio.com/v1/convert
```

## Authentication
All endpoints require a valid API key in the Authorization header:
```
Authorization: Bearer cx_live_your_api_key_here
```

---

## Text Encoding

**Endpoint:** `/v1/convert/encode`

### GET /v1/convert/encode
Get information about available encoding conversions.

**Request:**
```bash
curl -H "Authorization: Bearer cx_live_..." \
     https://api.chronexio.com/v1/convert/encode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/convert/encode",
    "description": "Convert text to various encoded formats",
    "methods": ["GET", "POST"],
    "supported_conversions": {
      "utf8": ["base64", "base64url", "hex", "url", "html", "xml"],
      "binary": ["base64", "base64url", "hex"]
    },
    "request_format": {
      "input": "The text to encode (required)",
      "from": "Source format (default: utf8)",
      "to": "Target format (required)",
      "options": {
        "strict": "Strict validation mode (default: false)",
        "uppercase": "Use uppercase for hex output (default: false)"
      }
    },
    "example": {
      "input": "Hello, World!",
      "from": "utf8",
      "to": "base64"
    }
  }
}
```

### POST /v1/convert/encode
Convert text from one encoding format to another.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "Hello, World!",
       "from": "utf8",
       "to": "base64"
     }' \
     https://api.chronexio.com/v1/convert/encode
```

**Parameters:**
- `input` (string, required): Text or data to convert
- `from` (string, optional): Source format (default: utf8)
- `to` (string, required): Target format
- `options` (object, optional): Conversion options

**Supported Formats:**
- `utf8`: Unicode text (default)
- `base64`: Base64 encoding
- `base64url`: URL-safe Base64
- `hex`: Hexadecimal
- `url`: URL encoding
- `html`: HTML entity encoding
- `xml`: XML entity encoding
- `binary`: Binary string

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "Hello, World!",
    "output": "SGVsbG8sIFdvcmxkIQ==",
    "from": "utf8",
    "to": "base64",
    "input_length": 13,
    "output_length": 20,
    "encoding_efficiency": 0.65,
    "options": {}
  },
  "meta": {
    "processing_time_ms": 2,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Encoding Examples:**

**UTF-8 to Base64:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "Hello, World!",
       "to": "base64"
     }' \
     https://api.chronexio.com/v1/convert/encode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "Hello, World!",
    "output": "SGVsbG8sIFdvcmxkIQ==",
    "from": "utf8",
    "to": "base64"
  }
}
```

**UTF-8 to Hex:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "Hello, World!",
       "to": "hex",
       "options": {
         "uppercase": true
       }
     }' \
     https://api.chronexio.com/v1/convert/encode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "Hello, World!",
    "output": "48656C6C6F2C20576F726C6421",
    "from": "utf8",
    "to": "hex",
    "options": {
      "uppercase": true
    }
  }
}
```

**UTF-8 to URL Encoding:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "Hello, World! @#$%",
       "to": "url"
     }' \
     https://api.chronexio.com/v1/convert/encode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "Hello, World! @#$%",
    "output": "Hello%2C%20World%21%20%40%23%24%25",
    "from": "utf8",
    "to": "url"
  }
}
```

**UTF-8 to HTML Entities:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "<script>alert(\"Hello!\");</script>",
       "to": "html"
     }' \
     https://api.chronexio.com/v1/convert/encode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "<script>alert(\"Hello!\");</script>",
    "output": "&lt;script&gt;alert(&quot;Hello!&quot;);&lt;/script&gt;",
    "from": "utf8",
    "to": "html"
  }
}
```

---

## Text Decoding

**Endpoint:** `/v1/convert/decode`

### GET /v1/convert/decode
Get information about available decoding conversions.

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/convert/decode",
    "description": "Convert encoded text back to readable format",
    "methods": ["GET", "POST"],
    "supported_conversions": {
      "base64": ["utf8", "binary"],
      "base64url": ["utf8", "binary"],
      "hex": ["utf8", "binary"],
      "url": ["utf8"],
      "html": ["utf8"],
      "xml": ["utf8"]
    },
    "auto_detection": {
      "enabled": true,
      "formats": ["base64", "hex", "url"],
      "confidence_threshold": 0.8
    }
  }
}
```

### POST /v1/convert/decode
Decode text from encoded format back to readable text.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "SGVsbG8sIFdvcmxkIQ==",
       "from": "base64",
       "to": "utf8"
     }' \
     https://api.chronexio.com/v1/convert/decode
```

**Parameters:**
- `input` (string, required): Encoded text to decode
- `from` (string, required): Source encoding format
- `to` (string, optional): Target format (default: utf8)
- `options` (object, optional): Decoding options

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "SGVsbG8sIFdvcmxkIQ==",
    "output": "Hello, World!",
    "from": "base64",
    "to": "utf8",
    "input_length": 20,
    "output_length": 13,
    "decoding_confidence": 1.0
  }
}
```

**Auto-Detection Example:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "48656C6C6F2C20576F726C6421",
       "auto_detect": true,
       "to": "utf8"
     }' \
     https://api.chronexio.com/v1/convert/decode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "48656C6C6F2C20576F726C6421",
    "output": "Hello, World!",
    "from": "hex",
    "to": "utf8",
    "auto_detected": true,
    "detection_confidence": 0.95
  }
}
```

---

## Batch Encoding

**Endpoint:** `/v1/convert/encode/batch`

### GET /v1/convert/encode/batch
Get information about batch conversion capabilities.

**Response:**
```json
{
  "success": true,
  "data": {
    "endpoint": "/api/v1/convert/encode/batch",
    "description": "Convert multiple strings in a single request",
    "method": "POST",
    "batch_limits": {
      "free": "5 conversions maximum",
      "developer": "50 conversions maximum",
      "team": "500 conversions maximum",
      "enterprise": "5000 conversions maximum"
    },
    "efficiency_benefits": [
      "Reduced API call overhead",
      "Consistent processing context",
      "Atomic batch operations"
    ]
  }
}
```

### POST /v1/convert/encode/batch
Convert multiple strings in a single request.

**Request:**
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "requests": [
         {
           "input": "Hello, World!",
           "to": "base64"
         },
         {
           "input": "Another string",
           "to": "hex",
           "options": {"uppercase": true}
         },
         {
           "input": "Special chars: @#$%",
           "to": "url"
         }
       ]
     }' \
     https://api.chronexio.com/v1/convert/encode/batch
```

**Parameters:**
- `requests` (array, required): Array of conversion requests
  - `input` (string): Text to convert
  - `from` (string, optional): Source format
  - `to` (string): Target format
  - `options` (object, optional): Conversion options

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
          "input": "Hello, World!",
          "output": "SGVsbG8sIFdvcmxkIQ==",
          "from": "utf8",
          "to": "base64"
        }
      },
      {
        "index": 1,
        "success": true,
        "data": {
          "input": "Another string",
          "output": "416E6F74686572207374726E67",
          "from": "utf8",
          "to": "hex"
        }
      },
      {
        "index": 2,
        "success": true,
        "data": {
          "input": "Special chars: @#$%",
          "output": "Special%20chars%3A%20%40%23%24%25",
          "from": "utf8",
          "to": "url"
        }
      }
    ]
  }
}
```

---

## Format-Specific Options

### Base64 Options
```json
{
  "options": {
    "url_safe": true,
    "padding": false
  }
}
```

### Hex Options
```json
{
  "options": {
    "uppercase": true,
    "delimiter": ":",
    "prefix": "0x"
  }
}
```

### URL Encoding Options
```json
{
  "options": {
    "encode_spaces_as_plus": false,
    "strict_rfc3986": true
  }
}
```

### HTML Entity Options
```json
{
  "options": {
    "encode_quotes": true,
    "encode_apostrophes": true,
    "numeric_entities": false
  }
}
```

---

## Conversion Matrix

| From → To | base64 | hex | url | html | xml | binary |
|-----------|--------|-----|-----|------|-----|--------|
| **utf8**  | ✓      | ✓   | ✓   | ✓    | ✓   | ✓      |
| **base64**| -      | ✓*  | ✗   | ✗    | ✗   | ✓      |
| **hex**   | ✓*     | -   | ✗   | ✗    | ✗   | ✓      |
| **url**   | ✗      | ✗   | -   | ✗    | ✗   | ✗      |
| **html**  | ✗      | ✗   | ✗   | -    | ✗   | ✗      |
| **xml**   | ✗      | ✗   | ✗   | ✗    | -   | ✗      |
| **binary**| ✓      | ✓   | ✗   | ✗    | ✗   | -      |

*\* Via UTF-8 intermediate conversion*

---

## Advanced Features

### Format Detection
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "Automatic format detection",
       "detect_format": true
     }' \
     https://api.chronexio.com/v1/convert/encode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "Automatic format detection",
    "detected_format": "utf8",
    "confidence": 1.0,
    "possible_formats": ["utf8", "ascii"],
    "recommendations": [
      {
        "to": "base64",
        "reason": "Most common encoding for data transmission"
      },
      {
        "to": "url",
        "reason": "Suitable for URL parameters"
      }
    ]
  }
}
```

### Validation Mode
```bash
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "SGVsbG8sIFdvcmxkIQ==",
       "from": "base64",
       "to": "utf8",
       "options": {
         "strict": true,
         "validate_input": true
       }
     }' \
     https://api.chronexio.com/v1/convert/decode
```

**Response:**
```json
{
  "success": true,
  "data": {
    "input": "SGVsbG8sIFdvcmxkIQ==",
    "output": "Hello, World!",
    "from": "base64",
    "to": "utf8",
    "validation": {
      "input_valid": true,
      "padding_correct": true,
      "character_set_valid": true,
      "length_valid": true
    }
  }
}
```

---

## Plan Limitations

### Free Tier
- **Max Input Size:** 1 MB per request
- **Batch Size:** 5 conversions
- **Supported Formats:** Basic (utf8, base64, hex, url)
- **Advanced Features:** Limited

### Developer Tier
- **Max Input Size:** 10 MB per request
- **Batch Size:** 50 conversions
- **Supported Formats:** All standard formats
- **Advanced Features:** Format detection, validation

### Team Tier
- **Max Input Size:** 100 MB per request
- **Batch Size:** 500 conversions
- **Supported Formats:** All formats + binary
- **Advanced Features:** All features

### Enterprise Tier
- **Max Input Size:** 1 GB per request
- **Batch Size:** 5000 conversions
- **Supported Formats:** All formats + custom
- **Advanced Features:** All features + custom encoders

---

## Use Cases

### Data Transmission
```bash
# Encode binary data for JSON transport
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "Binary file content here",
       "to": "base64"
     }' \
     https://api.chronexio.com/v1/convert/encode
```

### URL Parameters
```bash
# Encode data for URL parameters
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "search query with spaces & symbols",
       "to": "url"
     }' \
     https://api.chronexio.com/v1/convert/encode
```

### Web Security
```bash
# Encode user input for HTML output
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "<script>alert(\"xss\")</script>",
       "to": "html"
     }' \
     https://api.chronexio.com/v1/convert/encode
```

### Debug & Analysis
```bash
# Convert to hex for debugging
curl -X POST \
     -H "Authorization: Bearer cx_live_..." \
     -H "Content-Type: application/json" \
     -d '{
       "input": "Debug this string",
       "to": "hex",
       "options": {
         "uppercase": true,
         "delimiter": " "
       }
     }' \
     https://api.chronexio.com/v1/convert/encode
```

---

## Error Responses

```json
{
  "success": false,
  "error": {
    "code": "INVALID_ENCODING",
    "message": "Input contains invalid base64 characters",
    "details": {
      "from": "base64",
      "to": "utf8",
      "invalid_characters": ["@", "#"],
      "position": 15
    }
  }
}
```

**Common Error Codes:**
- `INVALID_ENCODING` - Input not valid for specified format
- `CONVERSION_NOT_SUPPORTED` - Unsupported conversion path
- `INPUT_TOO_LARGE` - Input exceeds size limits
- `BATCH_SIZE_EXCEEDED` - Too many conversions in batch
- `MALFORMED_INPUT` - Input format is corrupted
- `CHARACTER_SET_ERROR` - Invalid characters for encoding

---

## Rate Limits

Conversion operations count toward your overall API rate limits:

- **Free Tier:** 1,000 requests/hour, 10,000/day
- **Developer Tier:** 50,000 requests/hour, 1M/day
- **Team Tier:** 250,000 requests/hour, 5M/day
- **Enterprise Tier:** Unlimited

Large file processing may consume additional quota based on processing time and size.