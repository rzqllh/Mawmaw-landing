import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string | string[];
  title?: string; // Used to prevent duplicate h1 if the markdown starts with the same title
  className?: string;
  variant?: "article" | "project";
}

export function MarkdownContent({ content, title, className, variant = "article" }: MarkdownContentProps) {
  // Normalize content: if it's an array (like in Article schema Phase 1), join it.
  const rawMarkdown = Array.isArray(content) ? content.join("\n\n") : content;

  // Prevent duplicated top-level heading
  // If the markdown starts with "# [Title]", we slice it out from the display content.
  let displayMarkdown = rawMarkdown;
  if (title) {
    const headingPrefix = `# ${title}`;
    if (displayMarkdown.trim().startsWith(headingPrefix)) {
      displayMarkdown = displayMarkdown.trim().slice(headingPrefix.length).trim();
    }
  }

  return (
    <div className={cn(
      "prose prose-forest max-w-3xl",
      variant === "article" ? "prose-lg md:prose-xl leading-relaxed prose-dropcap" : "prose-base md:prose-lg leading-loose",
      className
    )}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h2 className="mt-12 mb-6 font-serif text-3xl md:text-5xl font-semibold text-forest-900 leading-tight" {...props} />,
          h2: ({node, ...props}) => <h2 className="mt-12 mb-6 font-serif text-3xl md:text-4xl font-semibold text-forest-900 leading-tight" {...props} />,
          h3: ({node, ...props}) => <h3 className="mt-8 mb-4 font-serif text-2xl md:text-3xl font-semibold text-forest-900 leading-tight" {...props} />,
          p: ({node, ...props}) => <p className="mb-6 text-text-secondary" {...props} />,
          ul: ({node, ...props}) => <ul className="mb-6 ml-6 list-disc marker:text-gold-500 space-y-2 text-text-secondary" {...props} />,
          ol: ({node, ...props}) => <ol className="mb-6 ml-6 list-decimal marker:text-gold-500 marker:font-bold space-y-2 text-text-secondary" {...props} />,
          li: ({node, ...props}) => <li className="pl-2" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="blockquote-japandi" {...props} />
          ),
          a: ({node, ...props}) => (
            <a className="font-semibold text-gold-700 underline decoration-gold-500/30 decoration-2 underline-offset-4 hover:decoration-gold-500 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          img: ({node, ...props}) => (
            <span className="my-10 block overflow-hidden rounded-2xl shadow-card bg-background-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-auto object-cover m-0" {...props} alt={props.alt || ""} />
              {props.alt && (
                <span className="block p-4 text-center text-sm italic text-text-muted">
                  {props.alt}
                </span>
              )}
            </span>
          ),
          strong: ({node, ...props}) => <strong className="font-semibold text-forest-900" {...props} />,
          hr: ({node, ...props}) => <hr className="my-12 border-t border-forest-900/10" {...props} />,
        }}
      >
        {displayMarkdown}
      </ReactMarkdown>
    </div>
  );
}
