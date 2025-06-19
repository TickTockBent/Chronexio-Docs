import { API_CONFIG } from './constants';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    request_id?: string;
    processing_time_ms?: number;
  };
}

export interface EndpointInfo {
  endpoint: string;
  category: string;
  subcategory?: string;
  methods: string[];
  description?: string;
  documentation_url?: string;
}

export interface CategoryInfo {
  name: string;
  description: string;
  endpoints: EndpointInfo[];
  subcategories: string[];
}

export interface DocsApiResponse {
  api_version: string;
  documentation_version: string;
  total_endpoints: number;
  filtered_endpoints: number;
  last_updated: string;
  categories: Record<string, CategoryInfo>;
  endpoints: EndpointInfo[];
  features: {
    authentication_required: boolean;
    examples_included: boolean;
    openapi_available: boolean;
    interactive_testing: boolean;
  };
}

export interface EndpointDocumentation {
  endpoint: string;
  methods: string[];
  category: string;
  description: string;
  authentication: string;
  parameters?: Record<string, {
    type: string;
    description: string;
    required?: boolean;
    default?: unknown;
    example?: unknown;
  }>;
  request_body?: {
    type: string;
    description: string;
    schema: Record<string, unknown>;
    example?: unknown;
  };
  response_fields: Record<string, string>;
  response_examples?: Record<string, unknown>;
  error_codes?: Record<string, {
    description: string;
    example?: unknown;
  }>;
  tier_access?: Record<string, string>;
  rate_limits?: Record<string, string>;
  see_also?: string[];
}

export interface CategoryDocumentation {
  category: string;
  description: string;
  endpoints: EndpointDocumentation[];
  total_endpoints: number;
  examples?: Record<string, unknown>;
  patterns?: Record<string, unknown>;
  getting_started?: Record<string, unknown>;
  common_errors?: Record<string, unknown>;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    // Use the Portal API directly for docs endpoints
    this.baseUrl = 'https://api.chronexio.com';
  }

  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        cache: 'no-store', // Ensure fresh data for server-side rendering
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      // Return a fallback response for build-time errors
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'FETCH_ERROR'
        }
      } as ApiResponse<T>;
    }
  }

  async getApiDocumentation(category?: string): Promise<DocsApiResponse> {
    const response = await this.fetchApi<DocsApiResponse>(
      category ? `${API_CONFIG.docsEndpoint}?category=${category}` : API_CONFIG.docsEndpoint
    );
    
    if (!response.success || !response.data) {
      // Return fallback data for build time
      return {
        api_version: 'v1',
        documentation_version: '1.0.0',
        total_endpoints: 50,
        filtered_endpoints: 50,
        last_updated: new Date().toISOString(),
        categories: {},
        endpoints: [],
        features: {
          authentication_required: true,
          examples_included: false,
          openapi_available: false,
          interactive_testing: false,
        },
      };
    }

    return response.data;
  }

  async getCategoryDocumentation(category: string): Promise<CategoryDocumentation> {
    const response = await this.fetchApi<CategoryDocumentation>(
      `${API_CONFIG.docsEndpoint}/${category}`
    );
    
    if (!response.success || !response.data) {
      // Return fallback data for build time
      return {
        category,
        description: `${category} API endpoints`,
        endpoints: [],
        total_endpoints: 0,
      };
    }

    return response.data;
  }

  async getEndpointDocumentation(path: string): Promise<EndpointDocumentation> {
    const response = await this.fetchApi<EndpointDocumentation>(`/v1${path}`);
    
    if (!response.success || !response.data) {
      // Return fallback data for build time
      return {
        endpoint: path,
        methods: ['GET', 'POST'],
        category: 'api',
        description: `API endpoint: ${path}`,
        authentication: 'Required - API key in Authorization header',
        response_fields: {},
      };
    }

    return response.data;
  }

  async getApiStatus(): Promise<{ status: 'online' | 'degraded' | 'offline'; uptime: string }> {
    try {
      const response = await this.fetchApi('/v1/status');
      return {
        status: response.success ? 'online' : 'degraded',
        uptime: response.meta?.timestamp || new Date().toISOString(),
      };
    } catch {
      return {
        status: 'offline',
        uptime: new Date().toISOString(),
      };
    }
  }
}

export const apiClient = new ApiClient();