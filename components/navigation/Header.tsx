'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { NAVIGATION_ITEMS } from '@/lib/constants';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-200',
        isScrolled
          ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-gray-200 dark:border-dark-border shadow-sm'
          : 'bg-white dark:bg-dark-bg border-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-heading font-bold text-xl text-gray-900 dark:text-white hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-success rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CX</span>
            </div>
            <span>Chronexio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    pathname.startsWith(item.href)
                      ? 'text-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  )}
                >
                  {item.title}
                </Link>
                
                {/* Dropdown for API Reference */}
                {item.children && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          <div className="font-medium">{child.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{child.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hidden sm:flex"
              title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
            >
              {getThemeIcon()}
            </Button>

            {/* Get API Key Button */}
            <Button asChild className="hidden sm:flex">
              <Link href="https://portal.chronexio.com">
                Get API Key
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-dark-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname.startsWith(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-2 border-t border-gray-200 dark:border-dark-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full justify-start mb-2"
                >
                  {getThemeIcon()}
                  <span className="ml-2">Theme: {theme}</span>
                </Button>
                
                <Button asChild className="w-full">
                  <Link href="https://portal.chronexio.com">
                    Get API Key
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}