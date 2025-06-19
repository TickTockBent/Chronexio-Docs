import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { API_CATEGORIES, HTTP_METHODS } from '@/lib/constants';
import { apiClient } from '@/lib/api';

interface EndpointPageProps {
  params: Promise<{
    category: string;
    endpoint: string[];
  }>;
}

export async function generateMetadata({ params }: EndpointPageProps) {
  const { category, endpoint } = await params;
  const categoryInfo = API_CATEGORIES[category as keyof typeof API_CATEGORIES];
  const endpointPath = endpoint.join('/');
  
  if (!categoryInfo) {
    return {
      title: 'Endpoint Not Found',
    };
  }

  return {
    title: `${endpointPath} - ${categoryInfo.title} API`,
    description: `Complete documentation for the ${endpointPath} endpoint in the ${categoryInfo.title} API.`,
  };
}

async function getEndpointData(category: string, endpoint: string[]) {
  try {
    // Reconstruct the full endpoint path
    const endpointPath = endpoint.join('/');
    const fullPath = `/v1/${category}/${endpointPath}`;
    const endpointData = await apiClient.getEndpointDocumentation(fullPath);
    return endpointData;
  } catch (error) {
    console.error(`Failed to fetch endpoint data for ${category}/${endpointPath}:`, error);
    return null;
  }
}

export default async function EndpointPage({ params }: EndpointPageProps) {
  const { category, endpoint } = await params;
  const categoryInfo = API_CATEGORIES[category as keyof typeof API_CATEGORIES];
  const endpointPath = endpoint.join('/');
  
  if (!categoryInfo) {
    notFound();
  }

  const endpointData = await getEndpointData(category, endpoint);

  if (!endpointData) {
    notFound();
  }

  return (
    <div className="container mx-auto container-padding section-padding">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/api" className="hover:text-primary transition-colors">
          API Reference
        </Link>
        <span>/</span>
        <Link href={`/api/${category}`} className="hover:text-primary transition-colors">
          {categoryInfo.title}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{endpointPath}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-xl ${categoryInfo.bgColor}`}>
              <div className={`w-8 h-8 ${categoryInfo.color}`}>
                <div className="w-full h-full bg-current rounded-sm opacity-80" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                {endpointData.methods.map((method) => (
                  <Badge 
                    key={method} 
                    variant={method === 'GET' ? 'success' : method === 'POST' ? 'primary' : 'default'}
                    size="sm"
                  >
                    {method}
                  </Badge>
                ))}
                <code className="text-lg font-mono text-gray-900 dark:text-white">
                  {endpointData.endpoint}
                </code>
              </div>
              <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                {endpointData.description}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {endpointData.authentication}
              </p>
            </div>
          </div>
        </div>

        <Button asChild>
          <Link href={`/api/${category}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {categoryInfo.title}
          </Link>
        </Button>
      </div>

      {/* Examples */}
      {endpointData.response_examples && Object.keys(endpointData.response_examples).length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
            Examples
          </h2>
          
          <div className="space-y-6">
            {Object.entries(endpointData.response_examples).map(([key, example]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {typeof example === 'object' && example !== null && 'description' in example 
                      ? String(example.description) 
                      : `Example ${key.replace('example_', '')}`}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {typeof example === 'object' && example !== null && 'request' in example && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Request</h4>
                      <CodeBlock 
                        code={String(example.request)}
                        language="bash"
                        title="Request"
                      />
                    </div>
                  )}
                  
                  {typeof example === 'object' && example !== null && 'response' in example && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response</h4>
                      <CodeBlock 
                        code={JSON.stringify(example.response, null, 2)}
                        language="json"
                        title="Response"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Response Fields */}
      {endpointData.response_fields && Object.keys(endpointData.response_fields).length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
            Response Fields
          </h2>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {Object.entries(endpointData.response_fields).map(([field, description]) => (
                  <div key={field} className="flex items-start space-x-4">
                    <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      {field}
                    </code>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Related Endpoints */}
      {endpointData.see_also && endpointData.see_also.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
            Related Endpoints
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {endpointData.see_also.map((relatedUrl, index) => {
              // Extract endpoint path from URL
              const urlPath = relatedUrl.replace('https://api.chronexio.com', '');
              const pathParts = urlPath.split('/').filter(p => p);
              const relatedCategory = pathParts[1];
              const relatedEndpoint = pathParts.slice(2).join('/');
              
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <Link href={relatedEndpoint ? `/api/${relatedCategory}/${relatedEndpoint}` : `/api/${relatedCategory}`} className="block p-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-900 dark:text-white">
                        {urlPath}
                      </code>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}