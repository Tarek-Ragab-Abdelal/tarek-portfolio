import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const chipVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-smooth",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary/10 text-primary border border-primary/20",
        accent: "bg-accent/10 text-accent border border-accent/20",
        outline: "border-2 border-border text-foreground",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

const Chip = ({ className, variant, size, ...props }: ChipProps) => {
  return (
    <div className={cn(chipVariants({ variant, size, className }))} {...props} />
  );
};

export default Chip;
