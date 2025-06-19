import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Code2, Clock, Mail, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'Code Examples',
  description: 'Real-world code examples and implementation patterns for Chronexio APIs - Coming Soon.',
};

export default function ExamplesPage() {
  const upcomingExamples = [
    {
      title: 'User Authentication System',
      description: 'Complete authentication flow with UUID session tokens and secure password hashing',
      technologies: ['React', 'Node.js', 'bcrypt'],
      category: 'Authentication',
      complexity: 'Intermediate',
      features: ['JWT tokens', 'Password hashing', 'Session management', 'UUID generation'],
    },
    {
      title: 'Content Management Pipeline',
      description: 'Text processing, email extraction, and content validation system',
      technologies: ['Python', 'FastAPI', 'SQLAlchemy'],
      category: 'Text Processing',
      complexity: 'Advanced',
      features: ['Email validation', 'Text extraction', 'Content filtering', 'Batch processing'],
    },
    {
      title: 'Data Migration Tool',
      description: 'Secure data transformation with encoding, hashing, and UUID mapping',
      technologies: ['Go', 'PostgreSQL', 'Redis'],
      category: 'Data Processing',
      complexity: 'Advanced',
      features: ['Data encoding', 'Hash verification', 'UUID mapping', 'Progress tracking'],
    },
    {
      title: 'API Testing Framework',
      description: 'Comprehensive testing suite with random data generation and validation',
      technologies: ['Jest', 'TypeScript', 'Supertest'],
      category: 'Testing',
      complexity: 'Intermediate',
      features: ['Random test data', 'API mocking', 'Validation helpers', 'Performance tests'],
    },
    {
      title: 'Real-time Chat Application',
      description: 'WebSocket chat with UUID room IDs and message hashing for integrity',
      technologies: ['Next.js', 'Socket.io', 'Prisma'],
      category: 'Real-time',
      complexity: 'Advanced',
      features: ['Room management', 'Message integrity', 'User sessions', 'Rate limiting'],
    },
    {
      title: 'E-commerce Order System',
      description: 'Order processing with UUID tracking, payment hashing, and customer validation',
      technologies: ['Vue.js', 'Express', 'MongoDB'],
      category: 'E-commerce',
      complexity: 'Advanced',
      features: ['Order tracking', 'Payment security', 'Customer validation', 'Inventory management'],
    },
    {
      title: 'File Upload Service',
      description: 'Secure file handling with hash verification and metadata processing',
      technologies: ['React', 'AWS S3', 'Lambda'],
      category: 'File Processing',
      complexity: 'Intermediate',
      features: ['File validation', 'Hash verification', 'Metadata extraction', 'Storage optimization'],
    },
    {
      title: 'Analytics Dashboard',
      description: 'Data visualization with UUID tracking and statistical analysis',
      technologies: ['React', 'D3.js', 'Node.js'],
      category: 'Analytics',
      complexity: 'Intermediate',
      features: ['Event tracking', 'Data visualization', 'Statistical analysis', 'Real-time updates'],
    },
  ];

  const categoryColors = {
    Authentication: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Text Processing': 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Data Processing': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Testing: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'Real-time': 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'E-commerce': 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'File Processing': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Analytics: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  };

  const complexityColors = {
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
        <span className="text-gray-900 dark:text-white">Examples</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
          <Code2 className="h-8 w-8" />
        </div>
        
        <Badge variant="warning" className="mb-4">
          Coming Soon
        </Badge>
        
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Code Examples
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Real-world code examples, implementation patterns, and complete applications 
          showcasing Chronexio APIs in production scenarios.
        </p>

        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Code2 className="h-4 w-4" />
            <span>8 examples planned</span>
          </div>
          <div>•</div>
          <div>Multiple languages</div>
          <div>•</div>
          <div>Production-ready code</div>
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
                Examples Repository Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We&apos;re building a comprehensive collection of real-world examples showing how to integrate 
                Chronexio APIs into popular frameworks and use cases. Each example will include complete 
                source code, documentation, and deployment instructions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="primary" size="sm">
                  <Link href="mailto:examples@chronexio.com?subject=Example Request">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Specific Example
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href="https://github.com/chronexio" target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    Watch for Updates
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Examples Preview */}
      <div className="mb-12">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          Planned Examples
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {upcomingExamples.map((example, index) => (
            <Card key={index} className="opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    className={categoryColors[example.category as keyof typeof categoryColors]} 
                    size="sm"
                  >
                    {example.category}
                  </Badge>
                  <Badge 
                    className={complexityColors[example.complexity as keyof typeof complexityColors]} 
                    size="sm"
                  >
                    {example.complexity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription className="mb-3">{example.description}</CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {example.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="default" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Key Features:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {example.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What to Expect */}
      <div className="mb-12">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          What to Expect
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-10 h-10 bg-success/10 text-success rounded-lg flex items-center justify-center mb-3">
                <Code2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Complete Source Code</CardTitle>
              <CardDescription>
                Full, runnable applications with commented code and clear structure
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-10 h-10 bg-warning/10 text-warning rounded-lg flex items-center justify-center mb-3">
                <Github className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">GitHub Repository</CardTitle>
              <CardDescription>
                Open-source examples with version control and issue tracking
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-10 h-10 bg-error/10 text-error rounded-lg flex items-center justify-center mb-3">
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </div>
              <CardTitle className="text-lg">Step-by-Step Setup</CardTitle>
              <CardDescription>
                Detailed instructions for installation, configuration, and deployment
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Temporary Alternatives */}
      <div className="bg-gray-50 dark:bg-dark-surface/50 rounded-xl p-8">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Get Started Now
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          While we&apos;re preparing the example repository, here&apos;s how you can start building:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card interactive asChild>
            <Link href="/getting-started">
              <CardHeader>
                <CardTitle className="text-lg">Quick Start</CardTitle>
                <CardDescription>
                  Basic examples to get your first API call working
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
                  Code snippets and examples for each endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  View Endpoints
                  <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card interactive asChild>
            <Link href="https://portal.chronexio.com">
              <CardHeader>
                <CardTitle className="text-lg">Try the Portal</CardTitle>
                <CardDescription>
                  Interactive testing and API key management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  Open Portal
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