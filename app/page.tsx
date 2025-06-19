import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Code, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { API_CATEGORIES } from '@/lib/constants';

export default function HomePage() {
  const quickStartExample = `curl -H "Authorization: Bearer cx_live_your_api_key" \\
  https://api.chronexio.com/v1/uuid/v4

{
  "success": true,
  "data": {
    "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "version": 4,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}`;

  return (
    <div className="flex flex-col">
      {/* Documentation Header */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Chronexio API Documentation
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Complete reference documentation for UUID generation, hashing, text processing, 
              and data conversion APIs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/getting-started">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="secondary" asChild>
                <Link href="/api">Browse APIs</Link>
              </Button>
              
              <Button variant="ghost" asChild>
                <Link href="https://portal.chronexio.com">
                  Get API Key
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Example */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                  Quick Example
                </h2>
                <p className="text-gray-600 mb-6">
                  Generate a UUID with a simple API call. Get your API key from the{' '}
                  <Link href="https://portal.chronexio.com" className="text-primary hover:underline">
                    Chronexio Portal
                  </Link>{' '}
                  to get started.
                </p>
                <div className="flex gap-3">
                  <Button asChild size="sm">
                    <Link href="/getting-started">View Setup Guide</Link>
                  </Button>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/api/uuid">UUID Documentation</Link>
                  </Button>
                </div>
              </div>
              
              <CodeBlock 
                code={quickStartExample}
                language="bash"
                title="Example Request"
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
              Browse API Documentation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive API documentation organized by category
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.entries(API_CATEGORIES).map(([key, category]) => (
              <Card key={key} interactive asChild>
                <Link href={`/api/${key}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.bgColor}`}>
                        <div className={`w-5 h-5 ${category.color}`}>
                          <div className="w-full h-full bg-current rounded-sm opacity-80" />
                        </div>
                      </div>
                      <CardTitle className="text-base">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">{category.description}</CardDescription>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Documentation
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
              Need More Help?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/guides">View Guides</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/examples">Code Examples</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://portal.chronexio.com">Portal Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}