import React from 'react';
import Link from 'next/link';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const documentationLinks = [
    { label: 'API Reference', href: '/api' },
    { label: 'Getting Started', href: '/getting-started' },
    { label: 'Examples', href: '/examples' },
    { label: 'Guides', href: '/guides' },
  ];

  const externalLinks = [
    { label: 'Main Website', href: 'https://www.chronexio.com' },
    { label: 'Portal', href: 'https://portal.chronexio.com' },
    { label: 'Status', href: 'https://status.chronexio.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 font-heading font-bold text-xl text-white hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-success rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CX</span>
              </div>
              <span>Chronexio</span>
            </Link>
            <p className="text-gray-300 text-sm max-w-md">
              API documentation for developer infrastructure
            </p>
          </div>

          {/* Links Sections */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Documentation Links */}
            <div>
              <h3 className="font-medium text-white mb-3">Documentation</h3>
              <ul className="space-y-2">
                {documentationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* External Links */}
            <div>
              <h3 className="font-medium text-white mb-3">Chronexio</h3>
              <ul className="space-y-2">
                {externalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <div className="text-sm text-gray-300">
            © {currentYear} Chronexio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}