import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Key, Code, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata = {
  title: 'Getting Started',
  description: 'Get up and running with Chronexio APIs in minutes. Complete guide from signup to your first API call.',
};

export default function GettingStartedPage() {
  const quickStartCode = `curl -H "Authorization: Bearer cx_live_your_api_key" \\
  https://api.chronexio.com/v1/uuid/v4

{
  "success": true,
  "data": {
    "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "version": 4,
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "processing_time_ms": 1
  }
}`;

  const authExamples = {
    curl: `curl -H "Authorization: Bearer cx_live_your_api_key" \\
  https://api.chronexio.com/v1/uuid/v4`,
    javascript: `const response = await fetch('https://api.chronexio.com/v1/uuid/v4', {
  headers: {
    'Authorization': 'Bearer cx_live_your_api_key'
  }
});

const data = await response.json();
console.log(data.data.uuid);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer cx_live_your_api_key'
}

response = requests.get(
    'https://api.chronexio.com/v1/uuid/v4',
    headers=headers
)

data = response.json()
print(data['data']['uuid'])`
  };

  const steps = [
    {
      icon: Key,
      title: 'Get Your API Key',
      description: 'Sign up for a free account and generate your API key',
      content: (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Create your account at{' '}
            <Link href="https://portal.chronexio.com" className="text-primary hover:underline">
              portal.chronexio.com
            </Link>{' '}
            and get instant access to your API key.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Free tier includes 1,000 requests/month</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>No credit card required</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Instant activation</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      icon: Code,
      title: 'Make Your First Request',
      description: 'Send your first API request and get a response',
      content: (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Replace <code className="code-inline">cx_live_your_api_key</code> with your actual API key:
          </p>
          <CodeBlock code={quickStartCode} language="bash" title="First API Request" />
        </div>
      ),
    },
    {
      icon: Zap,
      title: 'Explore the APIs',
      description: 'Discover all available endpoints and capabilities',
      content: (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Explore our comprehensive API categories:
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Badge variant="primary" size="sm">UUID</Badge>
              <span className="text-sm">Generate UUIDs v1-v8 including custom CX-UUID</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="success" size="sm">Hash</Badge>
              <span className="text-sm">Cryptographic hashing and password security</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="warning" size="sm">Convert</Badge>
              <span className="text-sm">Data encoding and format conversion</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="error" size="sm">Random</Badge>
              <span className="text-sm">Secure random data generation</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto container-padding section-padding">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="primary" className="mb-4">
          Getting Started
        </Badge>
        
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Start Building with Chronexio
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get up and running with Chronexio APIs in minutes. From signup to your first successful API call.
        </p>
      </div>

      {/* Quick Setup Steps */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
          Three Steps to Success
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {step.content}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Authentication Guide */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          Authentication
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle>API Key Authentication</CardTitle>
            <CardDescription>
              All API requests require authentication using your API key in the Authorization header.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Authentication Format
                </h4>
                <CodeBlock 
                  code="Authorization: Bearer cx_live_your_api_key_here"
                  language="text"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">cURL</h5>
                  <CodeBlock code={authExamples.curl} language="bash" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">JavaScript</h5>
                  <CodeBlock code={authExamples.javascript} language="javascript" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Python</h5>
                  <CodeBlock code={authExamples.python} language="python" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Format */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          Response Format
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Success Response</CardTitle>
              <CardDescription>
                All successful responses follow this consistent structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                code={`{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "processing_time_ms": 1
  }
}`}
                language="json"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Error Response</CardTitle>
              <CardDescription>
                Error responses include detailed information for debugging
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                code={`{
  "success": false,
  "error": {
    "message": "Invalid API key",
    "code": "UNAUTHORIZED",
    "details": {}
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}`}
                language="json"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 dark:bg-dark-surface/50 rounded-xl p-8">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Next Steps
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card interactive asChild>
            <Link href="/api">
              <CardHeader>
                <CardTitle className="text-lg">API Reference</CardTitle>
                <CardDescription>
                  Explore all available endpoints and their documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  Browse APIs
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card interactive asChild>
            <Link href="/examples">
              <CardHeader>
                <CardTitle className="text-lg">Code Examples</CardTitle>
                <CardDescription>
                  Real-world examples and integration patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  View Examples
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card interactive asChild>
            <Link href="/guides">
              <CardHeader>
                <CardTitle className="text-lg">Integration Guides</CardTitle>
                <CardDescription>
                  Detailed guides for common use cases and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  Read Guides
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}