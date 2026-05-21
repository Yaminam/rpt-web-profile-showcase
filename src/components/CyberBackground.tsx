import React from "react";

/**
 * Fixed full-screen cyberpunk backdrop: animated grid, drifting glow blobs,
 * a CRT scanline sweep and a subtle vignette. Purely decorative.
 */
const CyberBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-terminal-bg">
      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid-lines bg-[length:40px_40px] animate-grid-pan opacity-60" />

      {/* Radial fade so the grid melts into the dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05060a_75%)]" />

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-neon-cyan/20 blur-[120px] animate-float" />
      <div
        className="absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-neon-magenta/20 blur-[120px] animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-neon-purple/20 blur-[120px] animate-float"
        style={{ animationDelay: "3s" }}
      />

      {/* Scanline sweep */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neon-cyan/10 to-transparent animate-scanline" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
};

export default CyberBackground;
