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

function withoutMarkdownNode<T extends { node?: unknown }>(props: T) {
  const elementProps = { ...props };
  delete elementProps.node;
  return elementProps;
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
          h1: (props) => <h2 className="mt-12 mb-6 font-serif text-3xl md:text-5xl font-semibold text-forest-900 leading-tight" {...withoutMarkdownNode(props)} />,
          h2: (props) => <h2 className="mt-12 mb-6 font-serif text-3xl md:text-4xl font-semibold text-forest-900 leading-tight" {...withoutMarkdownNode(props)} />,
          h3: (props) => <h3 className="mt-8 mb-4 font-serif text-2xl md:text-3xl font-semibold text-forest-900 leading-tight" {...withoutMarkdownNode(props)} />,
          p: (props) => <p className="mb-6 text-text-secondary" {...withoutMarkdownNode(props)} />,
          ul: (props) => <ul className="mb-6 ml-6 list-disc marker:text-gold-500 space-y-2 text-text-secondary" {...withoutMarkdownNode(props)} />,
          ol: (props) => <ol className="mb-6 ml-6 list-decimal marker:text-gold-500 marker:font-bold space-y-2 text-text-secondary" {...withoutMarkdownNode(props)} />,
          li: (props) => <li className="pl-2" {...withoutMarkdownNode(props)} />,
          blockquote: (props) => (
            <blockquote className="blockquote-japandi" {...withoutMarkdownNode(props)} />
          ),
          a: (props) => (
            <a className="font-semibold text-gold-700 underline decoration-gold-500/30 decoration-2 underline-offset-4 hover:decoration-gold-500 transition-colors" target="_blank" rel="noopener noreferrer" {...withoutMarkdownNode(props)} />
          ),
          img: (props) => {
            const elementProps = withoutMarkdownNode(props);
            return (
              <span className="my-10 block overflow-hidden rounded-2xl shadow-card bg-background-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-auto object-cover m-0" {...elementProps} alt={elementProps.alt || ""} />
                {elementProps.alt && (
                  <span className="block p-4 text-center text-sm italic text-text-muted">
                    {elementProps.alt}
                  </span>
                )}
              </span>
            );
          },
          strong: (props) => <strong className="font-semibold text-forest-900" {...withoutMarkdownNode(props)} />,
          hr: (props) => <hr className="my-12 border-t border-forest-900/10" {...withoutMarkdownNode(props)} />,
        }}
      >
        {displayMarkdown}
      </ReactMarkdown>
    </div>
  );
}
