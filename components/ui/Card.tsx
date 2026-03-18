import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-industrial-200 bg-white p-6 shadow-sm",
          hover && "transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;


