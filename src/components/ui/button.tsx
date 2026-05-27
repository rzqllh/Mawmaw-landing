import { cloneElement, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        primary:
          "bg-forest-900 !text-text-inverse shadow-card hover:bg-forest-800",
        secondary:
          "glass-surface !text-forest-900 hover:border-gold-500/30 hover:bg-surface",
        ghost:
          "!text-forest-900 hover:bg-forest-50",
        inverse:
          "bg-surface !text-forest-900 hover:bg-background-muted",
      },
      size: {
        sm: "min-h-10 px-4 text-xs",
        md: "min-h-11 px-5 text-sm",
        lg: "min-h-12 px-6 text-sm md:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  asChild,
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
