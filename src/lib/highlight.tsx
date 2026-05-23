import React from "react";

// matches: "Top 10", "200+", "40%", "30 %", "3x", plain numbers
const METRIC = /(\bTop\s\d+\b|\d[\d.,]*\s?%|\d[\d.,]*\+|\b\d+x\b|\b\d[\d.,]*\b)/g;

/**
 * Wraps impact metrics (percentages, counts, "Top N", multipliers) in neon
 * emphasis so recruiters' eyes land on the numbers. Returns React nodes.
 */
export function highlightMetrics(text: string): React.ReactNode {
  const parts = text.split(METRIC);
  return parts.map((p, i) => {
    if (p && METRIC.test(p) && /\d/.test(p)) {
      METRIC.lastIndex = 0; // reset stateful global regex
      return (
        <span key={i} className="font-semibold text-neon-cyan">
          {p}
        </span>
      );
    }
    METRIC.lastIndex = 0;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}
