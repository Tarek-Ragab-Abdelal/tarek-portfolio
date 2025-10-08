import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const pillButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-glow",
        gradient: "gradient-primary text-primary-foreground hover:opacity-90 shadow-glow",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "bg-muted text-foreground hover:bg-muted/80",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface PillButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillButtonVariants> {}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(pillButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

PillButton.displayName = "PillButton";

export default PillButton;
