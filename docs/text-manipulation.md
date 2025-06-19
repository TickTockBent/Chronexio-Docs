# Text Manipulation API

The Text Manipulation API provides powerful string processing capabilities for splitting, joining, replacing, and transforming text.

## Base URL

```
https://api.chronexio.com/api/v1/text/manipulate
```

## Authentication

All endpoints require a valid API key passed in the `Authorization` header:

```
Authorization: Bearer cx_live_your_api_key_here
```

## Endpoints

### Split String

Split a string into an array of parts using various delimiter options.

**Endpoint:** `POST /split`

**Request Body:**
```json
{
  "input": "apple,banana,orange",
  "delimiter": ",",
  "options": {
    "max_splits": 0,
    "trim_whitespace": true,
    "remove_empty": true,
    "multiple_delimiters": [",", ";", ":"],
    "regex_pattern": false
  }
}
```

**Parameters:**
- `input` (string, required): The string to split
- `delimiter` (string, required): The delimiter to split by
- `options` (object, optional):
  - `max_splits` (number): Maximum number of splits to perform (0 = unlimited)
  - `trim_whitespace` (boolean): Trim whitespace from each part
  - `remove_empty` (boolean): Remove empty strings from results
  - `multiple_delimiters` (array): Array of delimiters to use
  - `regex_pattern` (boolean): Treat delimiter as regex pattern

**Response:**
```json
{
  "success": true,
  "data": {
    "parts": ["apple", "banana", "orange"],
    "count": 3,
    "original_length": 20,
    "delimiter_used": ","
  }
}
```

### Join Array

Join an array of strings into a single string with formatting options.

**Endpoint:** `POST /join`

**Request Body:**
```json
{
  "parts": ["apple", "banana", "orange"],
  "delimiter": ", ",
  "options": {
    "final_delimiter": " and ",
    "quote_items": true,
    "quote_char": "\"",
    "prefix": "Items: ",
    "suffix": "."
  }
}
```

**Parameters:**
- `parts` (array, required): Array of strings to join
- `delimiter` (string, required): Delimiter to use between items
- `options` (object, optional):
  - `final_delimiter` (string): Different delimiter before last item
  - `quote_items` (boolean): Wrap each item in quotes
  - `quote_char` (string): Quote character to use
  - `prefix` (string): String to prepend to result
  - `suffix` (string): String to append to result

**Response:**
```json
{
  "success": true,
  "data": {
    "joined": "Items: \"apple\", \"banana\" and \"orange\".",
    "length": 38,
    "part_count": 3
  }
}
```

### Replace Text

Replace occurrences of a pattern in text with support for regex and case sensitivity.

**Endpoint:** `POST /replace`

**Request Body:**
```json
{
  "input": "Hello World! Hello Universe!",
  "pattern": "Hello",
  "replacement": "Hi",
  "options": {
    "case_sensitive": true,
    "replace_all": true,
    "regex": false,
    "word_boundary": false
  }
}
```

**Parameters:**
- `input` (string, required): The text to search in
- `pattern` (string, required): The pattern to search for
- `replacement` (string, required): The replacement text
- `options` (object, optional):
  - `case_sensitive` (boolean): Match case exactly
  - `replace_all` (boolean): Replace all occurrences
  - `regex` (boolean): Treat pattern as regex
  - `word_boundary` (boolean): Match whole words only

**Response:**
```json
{
  "success": true,
  "data": {
    "result": "Hi World! Hi Universe!",
    "replacements": 2,
    "original_length": 28,
    "new_length": 22
  }
}
```

### Transform Text

Apply one or more transformations to text.

**Endpoint:** `POST /transform`

**Request Body:**
```json
{
  "input": "Hello World",
  "transformations": ["lowercase", "reverse"],
  "options": {
    "preserve_original": false
  }
}
```

**Parameters:**
- `input` (string, required): The text to transform
- `transformations` (array, required): Array of transformations to apply
- `options` (object, optional):
  - `preserve_original` (boolean): Include original text in response

**Available Transformations:**
- Case: `lowercase`, `uppercase`, `titlecase`, `camelcase`, `pascalcase`, `snakecase`, `kebabcase`
- Manipulation: `reverse`, `shuffle`, `sort_chars`
- Whitespace: `remove_spaces`, `normalize_spaces`, `trim`, `ltrim`, `rtrim`
- Filtering: `remove_punctuation`, `remove_numbers`, `remove_special_chars`
- Unicode: `normalize_unicode`, `remove_accents`, `transliterate`

**Response:**
```json
{
  "success": true,
  "data": {
    "result": "dlrow olleh",
    "transformations_applied": ["lowercase", "reverse"],
    "original": "Hello World"
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Input cannot be empty",
    "details": {
      "field": "input"
    }
  }
}
```

**Common Error Codes:**
- `INVALID_INPUT`: Invalid input data
- `INPUT_TOO_LARGE`: Input exceeds tier limits
- `INVALID_DELIMITER`: Invalid delimiter provided
- `INVALID_REGEX`: Invalid regex pattern
- `INVALID_TRANSFORMATION`: Unknown transformation
- `UNAUTHORIZED`: Invalid or missing API key
- `TIER_LIMIT_EXCEEDED`: Request exceeds tier limits

## Rate Limits

Rate limits vary by subscription tier:

| Tier | Requests/Hour | Max Input Size |
|------|---------------|----------------|
| Free | 100 | 1 KB |
| Developer | 10,000 | 100 KB |
| Team | 100,000 | 1 MB |
| Enterprise | Unlimited | Unlimited |

## Examples

### Split CSV Data
```bash
curl -X POST https://api.chronexio.com/api/v1/text/manipulate/split \
  -H "Authorization: Bearer cx_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "John,Doe,30,Engineer",
    "delimiter": ",",
    "options": {
      "trim_whitespace": true
    }
  }'
```

### Format a List with Oxford Comma
```bash
curl -X POST https://api.chronexio.com/api/v1/text/manipulate/join \
  -H "Authorization: Bearer cx_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "parts": ["apples", "oranges", "bananas"],
    "delimiter": ", ",
    "options": {
      "final_delimiter": ", and "
    }
  }'
```

### Clean and Normalize Text
```bash
curl -X POST https://api.chronexio.com/api/v1/text/manipulate/transform \
  -H "Authorization: Bearer cx_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "  HELLO   WORLD!!!  123  ",
    "transformations": [
      "trim",
      "lowercase",
      "remove_punctuation",
      "remove_numbers",
      "normalize_spaces"
    ]
  }'
```