import React from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
};

/** Wraps content and fades/slides it in when scrolled into view. */
const Reveal = ({ children, className, delay = 0, as = "div" }: RevealProps) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={cn("reveal", isVisible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
