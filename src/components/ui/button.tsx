import { cloneElement, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-pill px-5 py-2.5 text-sm font-bold transition duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        primary:
          "bg-forest-900 !text-text-inverse shadow-[0_16px_36px_rgba(17,32,25,0.20)] hover:bg-forest-800",
        secondary:
          "glass-surface !text-forest-900 hover:border-gold-500/34 hover:bg-surface",
        ghost:
          "!text-forest-900 hover:bg-forest-50/82",
        inverse:
          "bg-surface !text-forest-900 shadow-[0_14px_34px_rgba(4,12,8,0.18)] hover:bg-background-muted",
      },
      size: {
        sm: "min-h-10 px-4 text-xs",
        md: "min-h-11 px-5 text-sm",
        lg: "min-h-12 px-5 text-sm md:px-6",
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
