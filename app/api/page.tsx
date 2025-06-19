import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { API_CATEGORIES } from '@/lib/constants';
import { apiClient } from '@/lib/api';

export const metadata = {
  title: 'API Reference',
  description: 'Complete API reference for Chronexio - UUID generation, hashing, text processing, and more.',
};

async function getApiOverview() {
  try {
    const [docsData, statusData] = await Promise.all([
      apiClient.getApiDocumentation(),
      apiClient.getApiStatus(),
    ]);
    
    return { docsData, statusData };
  } catch (error) {
    console.error('Failed to fetch API overview:', error);
    // Return fallback data
    return {
      docsData: {
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
      },
      statusData: { status: 'online' as const, uptime: '99.99%' },
    };
  }
}

export default async function ApiReferencePage() {
  const { docsData, statusData } = await getApiOverview();

  return (
    <div className="container mx-auto container-padding section-padding">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Badge variant="success" className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>API Status: {statusData.status}</span>
          </Badge>
        </div>
        
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          API Reference
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Complete documentation for all Chronexio APIs. Generate UUIDs, hash data, 
          process text, and more with enterprise-grade performance.
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <div>Version: {docsData.api_version}</div>
          <div>•</div>
          <div>{docsData.total_endpoints} Endpoints</div>
          <div>•</div>
          <div>Updated: {new Date(docsData.last_updated).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Start</CardTitle>
            <CardDescription>
              Get up and running with your first API call
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" size="sm">
              <Link href="/getting-started">
                View Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interactive Testing</CardTitle>
            <CardDescription>
              Test API endpoints directly in your browser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" size="sm">
              <Link href="/api/playground">
                Try APIs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">API Status</CardTitle>
            <CardDescription>
              Monitor real-time API performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" size="sm">
              <Link href="https://status.chronexio.com" target="_blank">
                <Activity className="mr-2 h-4 w-4" />
                View Status
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* API Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          API Categories
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(API_CATEGORIES).map(([key, category]) => {
            const categoryEndpoints = Object.values(docsData.categories).find(
              cat => cat.name.toLowerCase() === key
            );
            
            return (
              <Card key={key} interactive asChild>
                <Link href={`/api/${key}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.bgColor}`}>
                          <div className={`w-5 h-5 ${category.color}`}>
                            {/* Icon placeholder */}
                            <div className="w-full h-full bg-current rounded-sm opacity-80" />
                          </div>
                        </div>
                        <CardTitle>{category.title}</CardTitle>
                      </div>
                      <Badge variant="default" size="sm">
                        {categoryEndpoints?.endpoints.length || '10+'} endpoints
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {category.description}
                    </CardDescription>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Documentation
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-gray-50 dark:bg-dark-surface/50 rounded-xl p-8">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Recent Updates
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Badge variant="primary" size="sm">v1.2.0</Badge>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Enhanced UUID v8 Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Added support for custom CX-UUID v8 generation with structured data.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Badge variant="success" size="sm">New</Badge>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Interactive API Testing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test endpoints directly in the documentation with your API key.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Badge variant="warning" size="sm">Improved</Badge>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Rate Limiting Documentation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Added detailed rate limiting information for all subscription tiers.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button asChild variant="secondary" size="sm">
            <Link href="/changelog">
              View Full Changelog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}