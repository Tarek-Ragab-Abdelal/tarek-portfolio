import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg transition-smooth",
  {
    variants: {
      variant: {
        default: "gradient-card shadow-soft border border-border",
        elevated: "gradient-card shadow-soft hover:shadow-glow border border-border",
        flat: "bg-card border border-border",
        outline: "border-2 border-border bg-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface GenericCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const GenericCard = ({ className, variant, padding, ...props }: GenericCardProps) => {
  return (
    <div className={cn(cardVariants({ variant, padding, className }))} {...props} />
  );
};

export default GenericCard;
