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
      // Get the main API info to find available services
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
      
      if (apiInfo.browse_services) {
        // Process each service category
        for (const [categoryKey, serviceInfo] of Object.entries(apiInfo.browse_services)) {
          const categoryInfo = API_CATEGORIES[categoryKey as keyof typeof API_CATEGORIES];
          
          if (categoryInfo && typeof serviceInfo === 'object' && serviceInfo !== null) {
            try {
              // Fetch detailed endpoint information for this category
              const categoryResponse = await fetch(`${this.baseUrl}/v1/${categoryKey}`, {
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-store',
              });
              
              if (categoryResponse.ok) {
                const categoryData = await categoryResponse.json();
                const categoryEndpointList: EndpointInfo[] = [];
                
                if (categoryData.endpoints && Array.isArray(categoryData.endpoints)) {
                  categoryData.endpoints.forEach((endpointData: any) => {
                    const endpoint: EndpointInfo = {
                      endpoint: endpointData.path,
                      category: categoryKey,
                      methods: [endpointData.method],
                      description: endpointData.description || `${categoryInfo.title} endpoint`,
                      documentation_url: `/api/${categoryKey}#${endpointData.path.replace(/\//g, '-')}`
                    };
                    
                    categoryEndpointList.push(endpoint);
                    if (!category || category === categoryKey) {
                      endpoints.push(endpoint);
                    }
                  });
                }
                
                categories[categoryKey] = {
                  name: categoryInfo.title,
                  description: categoryInfo.description,
                  endpoints: categoryEndpointList,
                  subcategories: []
                };
              }
            } catch (categoryError) {
              console.error(`Failed to fetch category ${categoryKey}:`, categoryError);
            }
          }
        }
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
      
      // Convert EndpointInfo to EndpointDocumentation format with second-layer discovery
      const endpoints: EndpointDocumentation[] = [];
      
      for (const endpoint of categoryInfo.endpoints) {
        try {
          // Try to get detailed documentation using second-layer discovery
          const detailedDoc = await this.getEndpointDocumentation(endpoint.endpoint);
          endpoints.push(detailedDoc);
        } catch (error) {
          // Fallback to basic endpoint info if second-layer discovery fails
          console.warn(`Second-layer discovery failed for ${endpoint.endpoint}, using basic info`);
          endpoints.push({
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
              'basic': {
                success: true,
                data: { example: 'Response data varies by endpoint' },
                meta: { timestamp: new Date().toISOString(), request_id: 'uuid' }
              }
            }
          });
        }
      }
      
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
    try {
      // Use the second layer discovery to get detailed endpoint information
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const endpointData = await response.json();
      
      // Transform the discovery response into EndpointDocumentation format
      const documentation: EndpointDocumentation = {
        endpoint: endpointData.path || path,
        methods: [endpointData.method || 'GET'],
        category: path.split('/')[2] || 'api', // Extract category from path like /v1/uuid/v4
        description: endpointData.description || `API endpoint: ${path}`,
        authentication: endpointData.authentication || 'Bearer token required',
        response_fields: {
          'success': 'Boolean indicating request success',
          'data': 'Response payload with the generated data',
          'meta': 'Request metadata including timestamp and request_id'
        },
        response_examples: {}
      };
      
      // Add parameters if available
      if (endpointData.parameters && typeof endpointData.parameters === 'object') {
        documentation.parameters = {};
        Object.entries(endpointData.parameters).forEach(([paramName, paramData]: [string, any]) => {
          documentation.parameters![paramName] = {
            type: paramData.type || 'string',
            description: paramData.description || '',
            required: paramData.required || false,
            example: paramData.example
          };
        });
      }
      
      // Add examples if available
      if (endpointData.examples && Array.isArray(endpointData.examples)) {
        endpointData.examples.forEach((example: any, index: number) => {
          documentation.response_examples![`example_${index + 1}`] = {
            description: example.description,
            request: example.request,
            response: example.response
          };
        });
      }
      
      // Add related endpoints if available
      if (endpointData.related_endpoints && Array.isArray(endpointData.related_endpoints)) {
        documentation.see_also = endpointData.related_endpoints;
      }
      
      
      return documentation;
      
    } catch (error) {
      console.error(`Endpoint documentation fetch failed for ${path}:`, error);
      // Return fallback data for build time
      return {
        endpoint: path,
        methods: ['GET'],
        category: path.split('/')[2] || 'api',
        description: `API endpoint: ${path}`,
        authentication: 'Bearer token required',
        response_fields: {
          'success': 'Boolean indicating request success',
          'data': 'Response payload',
          'meta': 'Request metadata'
        },
      };
    }
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