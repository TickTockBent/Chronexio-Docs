import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'Integration Guides',
  description: 'Comprehensive integration guides and best practices for Chronexio APIs - Coming Soon.',
};

export default function GuidesPage() {
  const upcomingGuides = [
    {
      title: 'Authentication Patterns',
      description: 'Secure API key management and authentication strategies',
      category: 'Security',
      difficulty: 'Beginner',
      estimatedTime: '10 minutes',
    },
    {
      title: 'Rate Limiting Best Practices',
      description: 'Optimizing your requests and handling rate limits gracefully',
      category: 'Performance',
      difficulty: 'Intermediate',
      estimatedTime: '15 minutes',
    },
    {
      title: 'Error Handling Strategies',
      description: 'Robust error handling patterns for production applications',
      category: 'Reliability',
      difficulty: 'Intermediate',
      estimatedTime: '20 minutes',
    },
    {
      title: 'Batch Processing with UUID APIs',
      description: 'Efficiently generate large volumes of UUIDs',
      category: 'UUID',
      difficulty: 'Advanced',
      estimatedTime: '25 minutes',
    },
    {
      title: 'Secure Password Hashing',
      description: 'Implementing secure password storage with bcrypt and argon2',
      category: 'Hash',
      difficulty: 'Intermediate',
      estimatedTime: '30 minutes',
    },
    {
      title: 'Building a Text Processing Pipeline',
      description: 'Email validation, text extraction, and processing workflows',
      category: 'Text',
      difficulty: 'Advanced',
      estimatedTime: '45 minutes',
    },
    {
      title: 'Random Data for Testing',
      description: 'Generating realistic test data for development and QA',
      category: 'Random',
      difficulty: 'Beginner',
      estimatedTime: '15 minutes',
    },
    {
      title: 'Data Conversion Workflows',
      description: 'Building robust encoding and format conversion pipelines',
      category: 'Convert',
      difficulty: 'Intermediate',
      estimatedTime: '20 minutes',
    },
  ];

  const categoryColors = {
    Security: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Performance: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Reliability: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    UUID: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Hash: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Text: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    Random: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Convert: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  };

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="container mx-auto container-padding section-padding">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">Guides</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
          <BookOpen className="h-8 w-8" />
        </div>
        
        <Badge variant="warning" className="mb-4">
          Coming Soon
        </Badge>
        
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Integration Guides
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Comprehensive guides covering integration patterns, best practices, and real-world use cases 
          for building production applications with Chronexio APIs.
        </p>

        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>8 guides planned</span>
          </div>
          <div>•</div>
          <div>From beginner to advanced</div>
          <div>•</div>
          <div>Step-by-step tutorials</div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <Card className="mb-12 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Guides Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We&apos;re working on comprehensive integration guides to help you get the most out of Chronexio APIs. 
                Each guide will include step-by-step instructions, code examples, and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="primary" size="sm">
                  <Link href="mailto:docs@chronexio.com?subject=Guide Request">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Priority Guide
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href="/api">
                    View API Reference
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Guides Preview */}
      <div className="mb-12">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          Planned Guides
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingGuides.map((guide, index) => (
            <Card key={index} className="opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    className={categoryColors[guide.category as keyof typeof categoryColors]} 
                    size="sm"
                  >
                    {guide.category}
                  </Badge>
                  <Badge 
                    className={difficultyColors[guide.difficulty as keyof typeof difficultyColors]} 
                    size="sm"
                  >
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{guide.estimatedTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Temporary Alternatives */}
      <div className="bg-gray-50 dark:bg-dark-surface/50 rounded-xl p-8">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          In the Meantime
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          While we&apos;re preparing the comprehensive guides, here are some resources to help you get started:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card interactive asChild>
            <Link href="/getting-started">
              <CardHeader>
                <CardTitle className="text-lg">Quick Start Guide</CardTitle>
                <CardDescription>
                  Get up and running with your first API call in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  Start Building
                  <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card interactive asChild>
            <Link href="/api">
              <CardHeader>
                <CardTitle className="text-lg">API Reference</CardTitle>
                <CardDescription>
                  Complete documentation for all endpoints with examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  Browse APIs
                  <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card interactive asChild>
            <Link href="https://portal.chronexio.com/support">
              <CardHeader>
                <CardTitle className="text-lg">Get Support</CardTitle>
                <CardDescription>
                  Need help? Our support team is ready to assist you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  Contact Support
                  <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}