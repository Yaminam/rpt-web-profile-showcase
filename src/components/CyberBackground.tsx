import React from "react";

/**
 * Fixed full-screen cyberpunk backdrop: animated grid, drifting aurora glow,
 * a CRT scanline sweep, film grain and a vignette. Purely decorative.
 */
const CyberBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-terminal-bg">
      {/* Animated grid */}
      <div className="absolute -inset-10 bg-grid-lines bg-[length:40px_40px] animate-grid-pan opacity-60" />

      {/* Radial fade so the grid melts into the dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05060a_75%)]" />

      {/* Aurora glow blobs (slow drift + hue shift). Radial gradients instead of
          blur() filters: same soft glow, a fraction of the paint cost on mobile GPUs. */}
      <div className="absolute -top-48 -left-40 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.2)_0%,transparent_65%)] animate-aurora" />
      <div
        className="absolute top-1/4 -right-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(255,43,214,0.2)_0%,transparent_65%)] animate-aurora"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute -bottom-24 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_65%)] animate-aurora"
        style={{ animationDelay: "4s" }}
      />

      {/* Scanline sweep */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neon-cyan/10 to-transparent animate-scanline" />

      {/* Film grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-screen" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
};

export default CyberBackground;
