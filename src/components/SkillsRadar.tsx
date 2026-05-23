import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { skillRadar } from "@/data/portfolio";

/** Terminal-framed proficiency radar (recharts) for the Skills section. */
const SkillsRadar = () => {
  return (
    <div className="terminal-window h-full">
      <div className="terminal-bar">
        <span className="terminal-dot bg-red-500/70" />
        <span className="terminal-dot bg-yellow-400/70" />
        <span className="terminal-dot bg-green-500/70" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">
          proficiency.chart
        </span>
      </div>
      <div className="p-3">
        <p className="mb-1 px-1 font-mono text-xs text-muted-foreground">
          <span className="text-neon-green">$</span> render --radar
        </p>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillRadar} outerRadius="70%">
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#ff2bd6" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="rgba(0,240,255,0.18)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "#7dd3fc", fontSize: 11, fontFamily: "JetBrains Mono" }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="level"
                stroke="#00f0ff"
                strokeWidth={2}
                fill="url(#radarFill)"
                fillOpacity={1}
                isAnimationActive
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SkillsRadar;
