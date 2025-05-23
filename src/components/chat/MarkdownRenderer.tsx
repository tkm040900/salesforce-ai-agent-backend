
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        // Customize heading styles
        h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-semibold mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-medium mb-2">{children}</h3>,
        
        // Customize paragraph styles
        p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
        
        // Customize list styles
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="ml-2">{children}</li>,
        
        // Customize code styles
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
          }
          return (
            <code className="block bg-muted p-3 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
              {children}
            </code>
          );
        },
        
        // Customize blockquote styles
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-2">
            {children}
          </blockquote>
        ),
        
        // Customize table styles
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-border rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
        th: ({ children }) => (
          <th className="border border-border px-3 py-2 text-left font-medium">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-3 py-2">
            {children}
          </td>
        ),
        
        // Customize link styles
        a: ({ children, href }) => (
          <a 
            href={href} 
            className="text-primary hover:underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        
        // Customize strong/bold styles
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        
        // Customize emphasis/italic styles
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
