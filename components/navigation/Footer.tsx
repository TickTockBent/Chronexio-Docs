import React from 'react';
import Link from 'next/link';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'API Reference', href: '/api' },
        { label: 'Getting Started', href: '/getting-started' },
        { label: 'Examples', href: '/examples' },
        { label: 'Guides', href: '/guides' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: 'https://chronexio.com/about' },
        { label: 'Blog', href: 'https://chronexio.com/blog' },
        { label: 'Careers', href: 'https://chronexio.com/careers' },
        { label: 'Contact', href: 'https://chronexio.com/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Portal', href: 'https://portal.chronexio.com' },
        { label: 'Status', href: 'https://status.chronexio.com' },
        { label: 'Changelog', href: '/changelog' },
        { label: 'Support', href: 'https://portal.chronexio.com/support' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: 'https://chronexio.com/privacy' },
        { label: 'Terms of Service', href: 'https://chronexio.com/terms' },
        { label: 'Cookie Policy', href: 'https://chronexio.com/cookies' },
        { label: 'SLA', href: 'https://chronexio.com/sla' },
      ],
    },
  ];

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: SITE_CONFIG.links.github, 
      icon: Github 
    },
    { 
      label: 'Twitter', 
      href: SITE_CONFIG.links.twitter, 
      icon: Twitter 
    },
    { 
      label: 'Discord', 
      href: SITE_CONFIG.links.discord, 
      icon: MessageCircle 
    },
  ];

  return (
    <footer className="bg-dark-bg text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link 
              href="/" 
              className="flex items-center space-x-2 font-heading font-bold text-xl text-white hover:text-primary transition-colors mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-success rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CX</span>
              </div>
              <span>Chronexio</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              {SITE_CONFIG.description}
            </p>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
              <span className="text-gray-300">All systems operational</span>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium text-white mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Chronexio. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}