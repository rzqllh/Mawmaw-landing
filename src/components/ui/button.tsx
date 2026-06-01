import { cloneElement, forwardRef, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-pill px-5 py-2.5 text-sm font-bold transition-all duration-150 active:duration-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed disabled:saturate-0",
  {
    variants: {
      variant: {
        default:
          "bg-gold-500 text-forest-900 border border-gold-400/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(17,32,25,0.1),0_8px_16px_rgba(212,190,66,0.15)] hover:bg-[#F2DE78] hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(17,32,25,0.05),0_12px_24px_rgba(212,190,66,0.25)] active:bg-gold-600 active:shadow-[inset_0_3px_8px_rgba(17,32,25,0.2),0_2px_4px_rgba(212,190,66,0.1)] active:border-gold-500",
        primary:
          "bg-forest-900 text-white shadow-[0_8px_20px_rgba(17,32,25,0.15)] hover:bg-forest-800 hover:shadow-[0_12px_24px_rgba(17,32,25,0.2)] active:bg-forest-950 active:shadow-[inset_0_4px_8px_rgba(4,12,8,0.3),0_2px_4px_rgba(17,32,25,0.1)]",
        secondary:
          "glass-surface text-forest-900 border border-forest-900/10 shadow-sm hover:bg-white/80 hover:border-forest-900/20 hover:shadow-md active:bg-forest-900/5 active:shadow-[inset_0_2px_6px_rgba(17,32,25,0.1)]",
        outline:
          "border border-forest-900/15 bg-transparent text-forest-900 hover:bg-forest-900/5 hover:border-forest-900/25",
        ghost:
          "bg-transparent text-forest-900 hover:bg-forest-900/5 hover:text-forest-900",
        inverse:
          "bg-surface text-forest-900 shadow-[0_14px_34px_rgba(4,12,8,0.18)] hover:bg-background-muted",
        gold:
          "bg-gold-300 !text-forest-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_18px_44px_rgba(4,12,8,0.22)] hover:bg-gold-100",
        darkOutline:
          "border border-text-inverse/20 bg-transparent text-text-inverse hover:bg-text-inverse/10 hover:border-gold-300/50 hover:text-gold-300",
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant, size, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{ className?: string }>;

      return cloneElement(child, {
        className: cn(classes, child.props.className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
