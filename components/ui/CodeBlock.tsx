'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ 
  code, 
  language = 'text', 
  title,
  showLineNumbers = false,
  className 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className={cn('relative group', className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
          <span className="text-sm font-medium text-gray-300">{title}</span>
          <span className="text-xs text-gray-500 uppercase">{language}</span>
        </div>
      )}
      
      <div className="relative">
        <pre className={cn(
          'bg-gray-code text-gray-100 p-4 font-code text-sm overflow-x-auto scrollbar-thin',
          title ? 'rounded-b-lg' : 'rounded-lg'
        )}>
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <div className="table">
                {lines.map((line, index) => (
                  <div key={index} className="table-row">
                    <span className="table-cell pr-4 text-gray-500 select-none text-right">
                      {index + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              code.trim()
            )}
          </code>
        </pre>
        
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function InlineCode({ className, children, ...props }: InlineCodeProps) {
  return (
    <code 
      className={cn(
        'bg-gray-light dark:bg-gray-code/50 text-gray-code dark:text-gray-100 px-2 py-1 rounded text-sm font-code',
        className
      )} 
      {...props}
    >
      {children}
    </code>
  );
}