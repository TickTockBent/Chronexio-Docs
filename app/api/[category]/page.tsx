import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { API_CATEGORIES, HTTP_METHODS } from '@/lib/constants';
import { apiClient } from '@/lib/api';
import { capitalizeFirst } from '@/lib/utils';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = API_CATEGORIES[category as keyof typeof API_CATEGORIES];
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryInfo.title} API`,
    description: `${categoryInfo.description} - Complete API documentation with examples and guides.`,
  };
}

async function getCategoryData(category: string) {
  try {
    const categoryData = await apiClient.getCategoryDocumentation(category);
    return categoryData;
  } catch (error) {
    console.error(`Failed to fetch category data for ${category}:`, error);
    return null;
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = API_CATEGORIES[category as keyof typeof API_CATEGORIES];
  
  if (!categoryInfo) {
    notFound();
  }

  const categoryData = await getCategoryData(category);

  return (
    <div className="container mx-auto container-padding section-padding">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/api" className="hover:text-primary transition-colors">
          API Reference
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{categoryInfo.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-xl ${categoryInfo.bgColor}`}>
              <div className={`w-8 h-8 ${categoryInfo.color}`}>
                {/* Icon placeholder */}
                <div className="w-full h-full bg-current rounded-sm opacity-80" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
                {categoryInfo.title} API
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {categoryInfo.description}
              </p>
            </div>
          </div>
          
          {categoryData && (
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{categoryData.total_endpoints} endpoints</span>
              <span>•</span>
              <span>REST API</span>
              <span>•</span>
              <span>JSON responses</span>
            </div>
          )}
        </div>

        <Button asChild>
          <Link href={`/api/${category}/playground`}>
            <Play className="mr-2 h-4 w-4" />
            Try API
          </Link>
        </Button>
      </div>

      {/* Quick Start Example */}
      {categoryData?.examples && (
        <div className="mb-12">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
            Quick Start
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Get started with the {categoryInfo.title} API in seconds. 
                Here&apos;s a basic example to get you up and running.
              </p>
              
              {categoryData.getting_started && (
                <div className="space-y-3">
                  {Object.entries(categoryData.getting_started).map(([step, description]) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        {step.replace('step', '')}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                        {String(description)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <CodeBlock 
              code={String(categoryData.getting_started?.example_curl || `curl -H "Authorization: Bearer cx_live_your_api_key" \\
  https://api.chronexio.com/v1/${category}/endpoint`)}
              language="bash"
              title={`${capitalizeFirst(category)} API Example`}
            />
          </div>
        </div>
      )}

      {/* Endpoints List */}
      <div className="mb-12">
        <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
          Endpoints
        </h2>
        
        {categoryData?.endpoints ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryData.endpoints.map((endpoint, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 h-full">
                <Link href={`/api/${category}${endpoint.endpoint.replace(`/v1/${category}/`, '/')}`} className="block p-4 hover:bg-gray-50 h-full">
                  <div className="flex flex-col h-full space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {endpoint.methods.map((method) => (
                          <Badge 
                            key={method} 
                            variant={method === 'GET' ? 'success' : method === 'POST' ? 'primary' : 'default'}
                            size="sm"
                          >
                            {method}
                          </Badge>
                        ))}
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </div>
                    <div className="flex-1">
                      <code className="text-sm font-mono text-gray-900 dark:text-white block mb-2 break-all">
                        {endpoint.endpoint}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                        {endpoint.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Loading endpoint documentation...
            </p>
            <Button asChild variant="secondary">
              <Link href="/api">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to API Reference
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Common Patterns */}
      {categoryData?.patterns && (
        <div className="mb-12">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
            Common Patterns
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(categoryData.patterns).map(([patternName, patternData]) => (
              <Card key={patternName}>
                <CardHeader>
                  <CardTitle className="text-lg">{capitalizeFirst(patternName.replace('_', ' '))}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {typeof patternData === 'object' && patternData !== null 
                      ? Object.entries(patternData).map(([key, value]) => (
                          <div key={key} className="mb-2">
                            <strong>{capitalizeFirst(key.replace('_', ' '))}:</strong> {String(value)}
                          </div>
                        ))
                      : String(patternData)
                    }
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Common Errors */}
      {categoryData?.common_errors && (
        <div>
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
            Common Errors
          </h2>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {Object.entries(categoryData.common_errors).map(([errorCode, description]) => (
                  <div key={errorCode} className="flex items-start space-x-4">
                    <Badge variant="error" size="sm" className="mt-0.5">
                      {errorCode}
                    </Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                      {String(description)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}