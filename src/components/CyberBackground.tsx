import React from "react";

/**
 * Fixed full-screen cyberpunk backdrop: animated grid, drifting aurora glow,
 * a CRT scanline sweep, film grain and a vignette. Purely decorative.
 */
const CyberBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-terminal-bg">
      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid-lines bg-[length:40px_40px] animate-grid-pan opacity-60" />

      {/* Radial fade so the grid melts into the dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05060a_75%)]" />

      {/* Aurora glow blobs (slow drift + hue shift) */}
      <div className="absolute -top-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-neon-cyan/20 blur-[130px] animate-aurora" />
      <div
        className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-neon-magenta/20 blur-[130px] animate-aurora"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-neon-purple/20 blur-[130px] animate-aurora"
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
