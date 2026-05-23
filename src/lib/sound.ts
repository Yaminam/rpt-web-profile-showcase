/**
 * Tiny synthesized SFX engine (Web Audio, no assets).
 * Sound is opt-in and persisted; the AudioContext is created lazily
 * inside a user gesture so it satisfies browser autoplay rules.
 */

let _ctx: AudioContext | null = null;

const ctx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!_ctx) {
    const AC: typeof AudioContext | undefined =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AC) _ctx = new AC();
  }
  if (_ctx && _ctx.state === "suspended") void _ctx.resume();
  return _ctx;
};

const KEY = "st_sound_on";

let enabled = (() => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
})();

export const isSoundOn = () => enabled;

export const setSoundOn = (v: boolean) => {
  enabled = v;
  try {
    localStorage.setItem(KEY, v ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (v) ctx(); // warm up within the click gesture
  window.dispatchEvent(new Event("sound:change"));
};

const beep = (
  freq: number,
  dur: number,
  type: OscillatorType = "square",
  gain = 0.04,
  when = 0
) => {
  const c = ctx();
  if (!c) return;
  const t = c.currentTime + when;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur);
};

export type Sfx =
  | "key"
  | "run"
  | "achv"
  | "win"
  | "error"
  | "eat"
  | "over"
  | "toggle"
  | "start";

export const playSound = (name: Sfx) => {
  if (!enabled) return;
  switch (name) {
    case "key":
      beep(380 + Math.random() * 160, 0.03, "square", 0.018);
      break;
    case "run":
      beep(660, 0.06, "square", 0.03);
      break;
    case "achv":
      [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.13, "triangle", 0.05, i * 0.07));
      break;
    case "win":
      [523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, 0.14, "sawtooth", 0.045, i * 0.08));
      break;
    case "error":
      beep(150, 0.18, "sawtooth", 0.05);
      break;
    case "eat":
      beep(880, 0.05, "square", 0.04);
      break;
    case "over":
      [440, 330, 220, 130].forEach((f, i) => beep(f, 0.16, "sawtooth", 0.05, i * 0.1));
      break;
    case "start":
      [330, 494, 659].forEach((f, i) => beep(f, 0.1, "triangle", 0.04, i * 0.06));
      break;
    case "toggle":
      beep(700, 0.06, "sine", 0.05);
      break;
  }
};

/** A single pure tone — used by the Simon game's pads. */
export const tone = (freq: number, dur = 0.18) => {
  if (!enabled) return;
  beep(freq, dur, "sine", 0.06);
};
