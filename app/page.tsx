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

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-millisecond response times with global edge deployment',
    },
    {
      icon: Shield,
      title: 'Enterprise Ready',
      description: 'SOC2 compliant with 99.99% uptime SLA',
    },
    {
      icon: Code,
      title: 'Developer First',
      description: 'Clean APIs, comprehensive docs, and extensive SDKs',
    },
    {
      icon: Gauge,
      title: 'Scalable',
      description: 'From startup to enterprise, built to handle any scale',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-surface">
        <div className="container mx-auto container-padding text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-6">
              API Documentation
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Developer infrastructure that moves at the{' '}
              <span className="gradient-text">speed of thought</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Complete documentation for Chronexio APIs. Generate UUIDs, hash data, process text, 
              and more with enterprise-grade reliability and performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/getting-started">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="secondary" size="lg" asChild>
                <Link href="/api">View API Reference</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Quick Start
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get your first API response in under 30 seconds
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Get your API key
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sign up at{' '}
                      <Link href="https://portal.chronexio.com" className="text-primary hover:underline">
                        portal.chronexio.com
                      </Link>{' '}
                      and generate your API key instantly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Make your first request
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Use the example on the right to generate your first UUID.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-success text-white rounded-full flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Start building
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Explore our comprehensive API reference and integration guides.
                    </p>
                  </div>
                </div>
              </div>
              
              <CodeBlock 
                code={quickStartExample}
                language="bash"
                title="Generate UUID"
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Categories */}
      <section className="section-padding bg-gray-50 dark:bg-dark-surface/50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              API Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive APIs for all your development needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(API_CATEGORIES).map(([key, category]) => (
              <Card key={key} interactive asChild>
                <Link href={`/api/${key}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.bgColor}`}>
                        <div className={`w-5 h-5 ${category.color}`}>
                          {/* Icon would go here - simplified for now */}
                          <div className="w-full h-full bg-current rounded-sm opacity-80" />
                        </div>
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{category.description}</CardDescription>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
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

      {/* Features Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Chronexio?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Built for developers who demand performance and reliability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to start building?
          </h2>
          <p className="text-xl text-primary-light mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Chronexio for their infrastructure needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/getting-started">Get Started</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild className="text-white border-white hover:bg-white/10">
              <Link href="https://portal.chronexio.com">Get API Key</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}