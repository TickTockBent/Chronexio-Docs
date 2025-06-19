import { API_CONFIG, API_CATEGORIES } from './constants';

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
    try {
      // Get the main API info that contains all endpoints
      const response = await fetch(`${this.baseUrl}/v1`, {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const apiInfo = await response.json();
      
      // Transform the API info into the expected format
      const categories: Record<string, CategoryInfo> = {};
      const endpoints: EndpointInfo[] = [];
      
      if (apiInfo.endpoints) {
        Object.entries(apiInfo.endpoints).forEach(([categoryKey, categoryEndpoints]) => {
          const categoryInfo = API_CATEGORIES[categoryKey as keyof typeof API_CATEGORIES];
          
          if (categoryInfo && Array.isArray(categoryEndpoints)) {
            const categoryEndpointList: EndpointInfo[] = [];
            
            (categoryEndpoints as string[]).forEach((endpointString: string) => {
              const [method, path] = endpointString.split(' ');
              const endpoint: EndpointInfo = {
                endpoint: path,
                category: categoryKey,
                methods: [method],
                description: `${categoryInfo.title} - ${path}`,
                documentation_url: `/api/${categoryKey}#${path.replace(/\//g, '-')}`
              };
              
              categoryEndpointList.push(endpoint);
              if (!category || category === categoryKey) {
                endpoints.push(endpoint);
              }
            });
            
            categories[categoryKey] = {
              name: categoryInfo.title,
              description: categoryInfo.description,
              endpoints: categoryEndpointList,
              subcategories: []
            };
          }
        });
      }
      
      return {
        api_version: 'v1',
        documentation_version: '1.0.0',
        total_endpoints: endpoints.length,
        filtered_endpoints: endpoints.length,
        last_updated: new Date().toISOString(),
        categories,
        endpoints,
        features: {
          authentication_required: true,
          examples_included: true,
          openapi_available: false,
          interactive_testing: false,
        },
      };
      
    } catch (error) {
      console.error('API documentation fetch failed:', error);
      // Return fallback data
      return {
        api_version: 'v1',
        documentation_version: '1.0.0',
        total_endpoints: 0,
        filtered_endpoints: 0,
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
  }

  async getCategoryDocumentation(category: string): Promise<CategoryDocumentation> {
    try {
      // Get the main API documentation and filter for this category
      const apiDocs = await this.getApiDocumentation(category);
      const categoryInfo = apiDocs.categories[category];
      
      if (!categoryInfo) {
        return {
          category,
          description: `${category} API endpoints`,
          endpoints: [],
          total_endpoints: 0,
        };
      }
      
      // Convert EndpointInfo to EndpointDocumentation format
      const endpoints: EndpointDocumentation[] = categoryInfo.endpoints.map(endpoint => ({
        endpoint: endpoint.endpoint,
        methods: endpoint.methods,
        category: endpoint.category,
        description: endpoint.description || `${categoryInfo.name} endpoint`,
        authentication: 'Required - API key in Authorization header',
        response_fields: {
          'success': 'Boolean indicating request success',
          'data': 'Response payload containing the requested data',
          'meta': 'Request metadata including timestamp and request_id'
        },
        response_examples: {
          'success': {
            success: true,
            data: { example: 'Response data varies by endpoint' },
            meta: { timestamp: new Date().toISOString(), request_id: 'uuid' }
          }
        },
        tier_access: {
          'free': 'Limited requests per month',
          'developer': 'Higher rate limits',
          'team': 'Team features and analytics',
          'enterprise': 'Enterprise features and support'
        },
        rate_limits: {
          'free': '1,000 requests/month',
          'developer': '50,000 requests/month',
          'team': '500,000 requests/month',
          'enterprise': 'Custom limits'
        }
      }));
      
      return {
        category,
        description: categoryInfo.description,
        endpoints,
        total_endpoints: endpoints.length,
        examples: {
          basic: `curl -H "Authorization: Bearer cx_live_your_api_key" \\
  https://api.chronexio.com${endpoints[0]?.endpoint || '/v1/' + category}`
        },
        getting_started: {
          step1: 'Get an API key from https://portal.chronexio.com',
          step2: 'Include the API key in the Authorization header',
          step3: 'Make requests to the endpoints listed below'
        }
      };
      
    } catch (error) {
      console.error(`Category documentation fetch failed for ${category}:`, error);
      return {
        category,
        description: `${category} API endpoints`,
        endpoints: [],
        total_endpoints: 0,
      };
    }
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