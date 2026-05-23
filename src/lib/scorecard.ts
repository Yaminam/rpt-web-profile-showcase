import { ACHIEVEMENTS } from "@/hooks/use-achievements";

/**
 * Render a neon "clearance report" of the visitor's achievement progress
 * to a canvas and trigger a PNG download.
 */
export function downloadScoreCard(unlocked: Set<string>) {
  const W = 1000;
  const H = 560;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const mono = "'JetBrains Mono', ui-monospace, monospace";

  // background
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#05060a");
  grad.addColorStop(1, "#0a0e16");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // grid
  ctx.strokeStyle = "rgba(0,240,255,0.07)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // border
  ctx.strokeStyle = "rgba(0,240,255,0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, W - 32, H - 32);

  const count = ACHIEVEMENTS.filter((a) => unlocked.has(a.id)).length;
  const total = ACHIEVEMENTS.length;

  // title
  ctx.fillStyle = "#00f0ff";
  ctx.font = `bold 46px ${mono}`;
  ctx.fillText("SHREYASH TRIPATHI", 48, 92);
  ctx.fillStyle = "#8aa0ad";
  ctx.font = `20px ${mono}`;
  ctx.fillText("// interactive portfolio — clearance report", 50, 126);

  // big stat
  ctx.fillStyle = "#39ff14";
  ctx.font = `bold 130px ${mono}`;
  ctx.fillText(`${count}/${total}`, 44, 290);
  ctx.fillStyle = "#ff2bd6";
  ctx.font = `26px ${mono}`;
  ctx.fillText(`LVL ${count}  ·  achievements unlocked`, 50, 332);

  // achievement icons row(s)
  ctx.font = "40px sans-serif";
  ACHIEVEMENTS.forEach((a, i) => {
    const x = 50 + (i % 6) * 152;
    const y = 430 + Math.floor(i / 6) * 64;
    ctx.globalAlpha = unlocked.has(a.id) ? 1 : 0.22;
    ctx.fillText(a.icon, x, y);
  });
  ctx.globalAlpha = 1;

  // footer
  ctx.fillStyle = "#6b7280";
  ctx.font = `18px ${mono}`;
  ctx.fillText("can you reach 100%?   ↑ ↑ ↓ ↓ ← → ← → B A", 50, H - 40);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "shreyash-portfolio-score.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
