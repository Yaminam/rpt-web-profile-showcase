import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TerminalSquare, X, CornerDownLeft, Volume2, VolumeX } from "lucide-react";
import {
  profile,
  projects,
  skillGroups,
  experience,
  education,
  navItems,
} from "@/data/portfolio";
import { useAchievements } from "@/hooks/use-achievements";
import { useSound } from "@/hooks/use-sound";
import { playSound, isSoundOn } from "@/lib/sound";
import SnakeGame from "@/components/games/SnakeGame";
import TypeTest from "@/components/games/TypeTest";
import SimonGame from "@/components/games/SimonGame";
import { downloadScoreCard } from "@/lib/scorecard";

type Line = { id: number; node: React.ReactNode };
type Mode = "shell" | "snake" | "typing" | "simon";

const COMMANDS = [
  "help", "whoami", "about", "skills", "projects", "experience", "education",
  "contact", "socials", "resume", "goto", "ls", "cat", "neofetch", "hack",
  "snake", "quiz", "type", "simon", "matrix", "coffee", "fortune", "cowsay", "joke",
  "echo", "date", "theme", "crt", "share", "keys", "sudo", "sound", "history", "achievements", "clear", "exit",
];

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "There are 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "It works on my machine. ¯\\_(ツ)_/¯",
  "I'd tell you a UDP joke, but you might not get it.",
  "99 little bugs in the code... patch one down, 127 little bugs in the code.",
];

const FORTUNES = [
  "The code you write today is the legacy you debug tomorrow.",
  "Ship it. You can refactor in the sprint that never comes.",
  "A wild segfault appears. It's super effective.",
  "Real programmers count from 0.",
  "Talk is cheap. Show me the commit.",
  "The best error message is the one that never shows up.",
];

const QUIZ = [
  { q: "Which framework does Shreyash build most of his UI in?", opts: ["Angular", "Next.js", "Rails", "Spring"], a: 1 },
  { q: "Which is NOT in his toolkit?", opts: ["TypeScript", "Python", "Rust", "Java"], a: 2 },
  { q: "What powers his real-time features?", opts: ["Socket.IO", "jQuery", "FTP", "SOAP"], a: 0 },
  { q: "Where is he based?", opts: ["Mumbai", "Noida", "Delhi", "Pune"], a: 1 },
  { q: "Which ORM does he use?", opts: ["Sequelize", "Prisma", "TypeORM", "Hibernate"], a: 1 },
  { q: "Which UI primitive library pairs with Tailwind in his stack?", opts: ["Bootstrap", "Radix UI", "Bulma", "Foundation"], a: 1 },
];

const COFFEE = `      ( (
       ) )
    ........
    |      |]
    \\      /
     \`----'
  caffeine.exe — loaded ☕`;

const cowsay = (msg: string) => {
  const text = (msg || "moo").slice(0, 60);
  const top = " " + "_".repeat(text.length + 2);
  const bot = " " + "-".repeat(text.length + 2);
  return (
    `${top}\n< ${text} >\n${bot}\n` +
    "        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||"
  );
};

const genKey = () =>
  Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[(Math.random() * 32) | 0]).join("");

const Green = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neon-green">{children}</span>
);
const Cyan = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neon-cyan">{children}</span>
);
const Magenta = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neon-magenta">{children}</span>
);

const CommandTerminal = () => {
  const { unlock, count, total, unlocked } = useAchievements();
  const { enabled: soundOn, toggle: toggleSound } = useSound();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("shell");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragRef = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const hack = useRef({ active: false, key: "", at: 0 });
  const quiz = useRef<{ active: boolean; qs: typeof QUIZ; i: number; score: number }>({
    active: false,
    qs: [],
    i: 0,
    score: 0,
  });
  const idc = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const print = useCallback((node: React.ReactNode) => {
    setLines((prev) => [...prev, { id: idc.current++, node }]);
  }, []);

  const banner = useCallback(() => {
    setLines([
      {
        id: idc.current++,
        node: (
          <div className="text-neon-cyan">
            <pre className="font-mono text-[10px] leading-tight text-neon-cyan/90 sm:text-xs">{`
   ___ _____   ___ _  _ ___ _    _
  / __|_   _| / __| || | __| |  | |
  \\__ \\ | |   \\__ \\ __ | _|| |__| |__
  |___/ |_|   |___/_||_|___|____|____|`}</pre>
            <p className="mt-2 text-muted-foreground">
              Shreyash Tripathi — interactive shell <Green>v3.0</Green>
            </p>
            <p className="text-muted-foreground">
              Type <Cyan>help</Cyan>. Play <Magenta>snake</Magenta> · <Magenta>quiz</Magenta> ·{" "}
              <Magenta>hack</Magenta>. Toggle 🔊 sound (top-right) for the full experience.
            </p>
          </div>
        ),
      },
    ]);
  }, []);

  const navigate = useCallback(
    (id: string) => {
      if (!navItems.some((n) => n.id === id)) {
        print(
          <span>
            goto: unknown section <span className="text-destructive">{id}</span>. try:{" "}
            {navItems.map((n) => n.id).join(", ")}
          </span>
        );
        return;
      }
      print(<span><Cyan>→</Cyan> navigating to /{id} ...</span>);
      setOpen(false);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 260);
    },
    [print]
  );

  const renderHelp = () => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3">
      {[
        ["help", "this list"],
        ["snake", "▶ play snake"],
        ["quiz", "▶ tech quiz"],
        ["type", "▶ speed test"],
        ["simon", "▶ memory game"],
        ["hack", "▶ breach game"],
        ["share", "📸 score card"],
        ["whoami", "who you are"],
        ["about", "the bio"],
        ["skills", "tech stack"],
        ["projects", "what I built"],
        ["experience", "work history"],
        ["education", "academics"],
        ["contact", "reach me"],
        ["socials", "my links"],
        ["resume", "download CV"],
        ["goto <x>", "jump to section"],
        ["ls", "list files"],
        ["cat <x>", "read a section"],
        ["neofetch", "system info"],
        ["matrix", "enter the matrix"],
        ["fortune", "dev wisdom"],
        ["cowsay <m>", "the cow speaks"],
        ["coffee", "brew up"],
        ["joke", "dev humor"],
        ["crt", "📺 retro mode"],
        ["keys", "⌨️ shortcuts"],
        ["sound", "toggle SFX"],
        ["achievements", "your progress"],
        ["clear", "wipe screen"],
      ].map(([c, d]) => (
        <div key={c} className="flex gap-2">
          <span className="text-neon-cyan">{c}</span>
          <span className="text-muted-foreground">— {d}</span>
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-1">
      {projects.map((p, i) => (
        <div key={p.name}>
          <span className="text-neon-magenta">{String(i + 1).padStart(2, "0")}</span>{" "}
          <span className="text-foreground">{p.name}</span>{" "}
          <span className="text-muted-foreground">— {p.tagline}</span>
        </div>
      ))}
      <p className="pt-1 text-muted-foreground">
        run <Cyan>goto projects</Cyan> to see them.
      </p>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-1">
      {skillGroups.map((g) => (
        <div key={g.label}>
          <span className="text-neon-cyan">{g.label.toLowerCase()}:</span>{" "}
          <span className="text-muted-foreground">{g.items.join(", ")}</span>
        </div>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-1">
      {experience.map((e) => (
        <div key={e.company}>
          <span className="text-neon-cyan">{e.period}</span>{" "}
          <span className="text-foreground">{e.role}</span>{" "}
          <span className="text-muted-foreground">@ {e.company}</span>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-1">
      {education.map((e) => (
        <div key={e.degree}>
          <span className="text-neon-cyan">{e.period}</span>{" "}
          <span className="text-foreground">{e.degree}</span>{" "}
          <span className="text-muted-foreground">— {e.school}</span>
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="space-y-0.5">
      <div>
        <span className="text-neon-cyan">email </span>
        <button
          type="button"
          className="underline hover:text-neon-cyan"
          onClick={() => window.dispatchEvent(new Event("mail:open"))}
        >
          {profile.email}
        </button>
      </div>
      <div>
        <span className="text-neon-cyan">phone </span>
        <span className="text-foreground">{profile.phone}</span>
      </div>
      <div>
        <span className="text-neon-cyan">where </span>
        <span className="text-foreground">{profile.location}</span>
      </div>
    </div>
  );

  const renderNeofetch = () => (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <pre className="font-mono text-[10px] leading-tight text-neon-cyan sm:text-xs">{`
   .--.
  |o_o |
  |:_/ |
 //   \\ \\
(|     | )
/'\\_   _/\`\\
\\___)=(___/`}</pre>
      <div className="space-y-0.5 font-mono text-xs">
        <p><Green>visitor</Green>@<Green>portfolio</Green></p>
        <p className="text-muted-foreground">-----------------</p>
        <p><Cyan>host</Cyan> shreyash-tripathi</p>
        <p><Cyan>role</Cyan> {profile.role}</p>
        <p><Cyan>stack</Cyan> React · Next.js · TypeScript · Node</p>
        <p><Cyan>loc</Cyan> {profile.location}</p>
        <p><Cyan>achv</Cyan> {count}/{total} unlocked</p>
        <p><Cyan>status</Cyan> <Green>building @ Garage Collective</Green></p>
      </div>
    </div>
  );

  const echoIn = (raw: string) =>
    print(
      <div>
        <span className="text-neon-green">visitor@portfolio</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-neon-cyan">~</span>
        <span className="text-muted-foreground">$ </span>
        <span className="text-foreground">{raw}</span>
      </div>
    );

  const askQuiz = useCallback(() => {
    const q = quiz.current.qs[quiz.current.i];
    print(
      <div>
        <p className="text-neon-cyan">
          Q{quiz.current.i + 1}/{quiz.current.qs.length}:{" "}
          <span className="text-foreground">{q.q}</span>
        </p>
        {q.opts.map((o, idx) => (
          <p key={idx} className="text-muted-foreground">
            <span className="text-neon-magenta">{String.fromCharCode(97 + idx)})</span> {o}
          </p>
        ))}
        <p className="text-muted-foreground">answer with a / b / c / d</p>
      </div>
    );
  }, [print]);

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      echoIn(raw);
      if (trimmed) {
        setHistory((h) => [...h, trimmed]);
        unlock("command");
        playSound("run");
      }
      setHistIdx(-1);

      // ── quiz capture ─────────────────────────────
      if (quiz.current.active) {
        if (!trimmed) return;
        const ans = trimmed.toLowerCase();
        const q = quiz.current.qs[quiz.current.i];
        let idx = -1;
        if (/^[a-d]$/.test(ans)) idx = ans.charCodeAt(0) - 97;
        else if (/^[1-4]$/.test(ans)) idx = parseInt(ans, 10) - 1;
        if (idx === q.a) {
          print(<span className="text-neon-green">✓ correct!</span>);
          quiz.current.score += 1;
          playSound("eat");
        } else {
          print(
            <span className="text-destructive">
              ✗ nope — it was {String.fromCharCode(97 + q.a)}) {q.opts[q.a]}
            </span>
          );
          playSound("error");
        }
        quiz.current.i += 1;
        if (quiz.current.i >= quiz.current.qs.length) {
          const sc = quiz.current.score;
          const tot = quiz.current.qs.length;
          quiz.current.active = false;
          print(
            <span>
              quiz complete: <Cyan>{sc}/{tot}</Cyan>.{" "}
              {sc === tot ? "🧠 flawless — big brain!" : "run `quiz` to try again."}
            </span>
          );
          if (sc === tot) {
            unlock("quiz");
            playSound("win");
          }
        } else {
          askQuiz();
        }
        return;
      }

      // ── hack capture ─────────────────────────────
      if (hack.current.active) {
        const elapsed = (Date.now() - hack.current.at) / 1000;
        hack.current.active = false;
        if (trimmed.toUpperCase() === hack.current.key && elapsed <= 12) {
          print(
            <div className="text-neon-green">
              <pre className="font-mono text-[10px] leading-tight sm:text-xs">{`
 ▄▀█ █▀▀ █▀▀ █▀▀ █▀ █▀
 █▀█ █▄▄ █▄▄ ██▄ ▄█ ▄█   GRANTED`}</pre>
              <p className="mt-1">Breached in {elapsed.toFixed(1)}s. Welcome, operator. 💀</p>
            </div>
          );
          unlock("hacker");
          playSound("win");
        } else if (elapsed > 12) {
          print(<span className="text-destructive">⏱ connection timed out. try `hack` again.</span>);
          playSound("error");
        } else {
          print(
            <span className="text-destructive">
              ✗ ACCESS DENIED — wrong key. run <Cyan>hack</Cyan> to retry.
            </span>
          );
          playSound("error");
        }
        return;
      }

      if (!trimmed) return;
      const [cmd, ...rest] = trimmed.split(/\s+/);
      const arg = rest.join(" ");
      const c = cmd.toLowerCase();

      switch (c) {
        case "help":
          print(renderHelp());
          break;
        case "whoami":
          print(
            <span>
              You're a <Cyan>visitor</Cyan>. The legend running this shell is{" "}
              <span className="text-foreground">{profile.name}</span> — {profile.role}.
            </span>
          );
          break;
        case "about":
        case "about.md":
          print(<span className="text-muted-foreground">{profile.summary}</span>);
          break;
        case "skills":
        case "skills.json":
          print(renderSkills());
          break;
        case "projects":
        case "projects/":
          print(renderProjects());
          break;
        case "experience":
        case "experience.log":
          print(renderExperience());
          break;
        case "education":
        case "education.json":
          print(renderEducation());
          break;
        case "contact":
        case "contact.sh":
          print(renderContact());
          break;
        case "socials":
          print(
            <div className="space-y-0.5">
              <div>
                <Cyan>github </Cyan>
                <a className="underline hover:text-neon-cyan" href={profile.github} target="_blank" rel="noreferrer">
                  {profile.github}
                </a>
              </div>
              <div>
                <Cyan>linkedin </Cyan>
                <a className="underline hover:text-neon-cyan" href={profile.linkedin} target="_blank" rel="noreferrer">
                  shreyashtripathi9
                </a>
              </div>
            </div>
          );
          break;
        case "resume":
        case "cv": {
          print(<span><Cyan>↓</Cyan> fetching resume.pdf ...</span>);
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = "";
          document.body.appendChild(a);
          a.click();
          a.remove();
          unlock("recruiter");
          break;
        }
        case "ls":
          print(
            <span className="text-foreground">
              about.md{"  "}experience.log{"  "}skills.json{"  "}
              <Cyan>projects/</Cyan>
              {"  "}education.json{"  "}contact.sh{"  "}resume.pdf
            </span>
          );
          break;
        case "goto":
        case "cd":
          if (!arg) print(<span>usage: goto &lt;section&gt;</span>);
          else navigate(arg.replace(/^\/+/, "").toLowerCase());
          break;
        case "cat":
          if (!arg) {
            print(<span>usage: cat &lt;file&gt; — try `cat about.md`</span>);
            break;
          }
          run(arg.replace(/\.(md|json|log|sh)$/, "").replace(/\/$/, ""));
          break;
        case "neofetch":
          print(renderNeofetch());
          break;
        case "snake":
          print(<span className="text-neon-cyan">launching SNAKE.exe — arrows/wasd to move, esc to quit.</span>);
          setMode("snake");
          break;
        case "type":
        case "typetest":
          print(<span className="text-neon-cyan">launching TYPE.test — type the line, esc to quit.</span>);
          setMode("typing");
          break;
        case "simon":
        case "memory":
          print(<span className="text-neon-cyan">launching SIMON.exe — watch, then repeat the sequence. esc to quit.</span>);
          setMode("simon");
          break;
        case "share":
        case "scorecard":
          downloadScoreCard(unlocked);
          print(
            <span>
              <Cyan>↓</Cyan> generating clearance report — <Green>{count}/{total}</Green> unlocked. saved as PNG 📸
            </span>
          );
          break;
        case "quiz":
          quiz.current = { active: true, qs: [...QUIZ].sort(() => Math.random() - 0.5).slice(0, 3), i: 0, score: 0 };
          print(<span className="text-neon-magenta">▓▓ TECH QUIZ — 3 questions ▓▓</span>);
          askQuiz();
          break;
        case "hack": {
          const key = genKey();
          hack.current = { active: true, key, at: Date.now() };
          print(
            <div>
              <p className="text-neon-magenta">▓▓ INITIATING BREACH SEQUENCE ▓▓</p>
              <p className="text-muted-foreground">
                Decrypt and transmit this access key within <Cyan>12s</Cyan>:
              </p>
              <p className="my-1 font-bold tracking-[0.4em] text-neon-green">{key}</p>
              <p className="text-muted-foreground">type it exactly, then hit enter ↵</p>
            </div>
          );
          break;
        }
        case "matrix":
          print(<span className="text-neon-green">wake up, Neo...</span>);
          window.dispatchEvent(
            new CustomEvent("cyber:overlay", {
              detail: { title: "THE MATRIX HAS YOU", subtitle: "// follow the white rabbit 🐇" },
            })
          );
          break;
        case "fortune":
          print(<span className="text-muted-foreground">🔮 {FORTUNES[(Math.random() * FORTUNES.length) | 0]}</span>);
          break;
        case "cowsay":
          print(<pre className="font-mono text-xs leading-tight text-neon-green">{cowsay(arg)}</pre>);
          break;
        case "coffee":
          print(<pre className="font-mono text-xs leading-tight text-neon-yellow">{COFFEE}</pre>);
          break;
        case "joke":
          print(<span className="text-muted-foreground">{JOKES[(Math.random() * JOKES.length) | 0]}</span>);
          break;
        case "echo":
          print(<span className="text-foreground">{arg || ""}</span>);
          break;
        case "date":
          print(<span className="text-foreground">{new Date().toString()}</span>);
          break;
        case "theme":
          print(<span>There is only one theme here. Embrace the <Magenta>neon</Magenta>. 🌃</span>);
          break;
        case "sound":
          toggleSound();
          print(<span>sound {isSoundOn() ? <Green>enabled 🔊</Green> : "disabled 🔇"}</span>);
          break;
        case "crt":
          window.dispatchEvent(new Event("crt:toggle"));
          print(<span>toggling <Cyan>CRT retro mode</Cyan> 📺</span>);
          break;
        case "keys":
        case "manual":
        case "?":
          window.dispatchEvent(new Event("help:open"));
          print(<span>opening <Cyan>operator manual</Cyan> — all shortcuts, games & secrets ⌨️</span>);
          break;
        case "sudo":
          print(
            <span className="text-destructive">
              🔒 nice try — you don't have root on my portfolio. (this incident will be reported)
            </span>
          );
          break;
        case "rm":
          print(<span className="text-destructive">✋ I admire the chaos, but no.</span>);
          break;
        case "history":
          print(
            <div className="space-y-0.5 text-muted-foreground">
              {history.length === 0
                ? "no history yet."
                : history.map((h, i) => (
                    <div key={i}>
                      <span className="text-neon-cyan">{i + 1}</span> {h}
                    </div>
                  ))}
            </div>
          );
          break;
        case "achievements":
        case "achv":
          print(
            <span>
              progress: <Cyan>{count}/{total}</Cyan> unlocked. open the{" "}
              <Magenta>🏆 trophy</Magenta> panel (bottom-left) for details.
            </span>
          );
          break;
        case "clear":
        case "cls":
          banner();
          break;
        case "exit":
        case "quit":
          print(<span className="text-muted-foreground">closing shell... (reopen with ⌘K / `)</span>);
          setTimeout(() => setOpen(false), 250);
          break;
        default:
          print(
            <span className="text-destructive">
              command not found: {c}. type <Cyan>help</Cyan>.
            </span>
          );
          playSound("error");
      }
    },
    [askQuiz, banner, count, history, navigate, print, toggleSound, total, unlock, unlocked]
  );

  const openTerminal = useCallback(() => {
    setOpen(true);
    setPos({ x: 0, y: 0 });
    unlock("boot");
  }, [unlock]);

  const startDrag = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    dragging.current = true;
    dragRef.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
  };

  // window-level drag tracking while the terminal is open
  useEffect(() => {
    if (!open) return;
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setPos({
        x: dragRef.current.px + (e.clientX - dragRef.current.x),
        y: dragRef.current.py + (e.clientY - dragRef.current.y),
      });
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) unlock("boot");
          return !v;
        });
      } else if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((v) => {
          if (!v) unlock("boot");
          return !v;
        });
      }
    };
    const onOpen = () => openTerminal();
    window.addEventListener("keydown", onKey);
    window.addEventListener("terminal:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("terminal:open", onOpen);
    };
  }, [openTerminal, unlock]);

  // deep-link: /#terminal opens the shell on load
  useEffect(() => {
    if (window.location.hash === "#terminal") openTerminal();
  }, [openTerminal]);

  // init banner once
  useEffect(() => {
    if (open && lines.length === 0) banner();
  }, [open, lines.length, banner]);

  // autoscroll + focus
  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      if (mode === "shell") inputRef.current?.focus();
    }
  }, [lines, open, mode]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1) playSound("key");
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(ni);
      setInput(history[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const ni = histIdx + 1;
      if (ni >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const token = input.trim().toLowerCase();
      if (!token) return;
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(token));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) print(<span className="text-muted-foreground">{matches.join("  ")}</span>);
    }
  };

  const launcherLabel = useMemo(() => (open ? "close" : "terminal"), [open]);

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => (open ? setOpen(false) : openTerminal())}
        aria-label="Open command terminal"
        className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-terminal-panel/90 px-4 py-2.5 font-mono text-xs text-neon-cyan shadow-neon-cyan backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-neon-cyan/10"
      >
        <TerminalSquare className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">{launcherLabel}</span>
        <kbd className="hidden rounded border border-neon-cyan/30 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="terminal-window animated-border flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden sm:h-[70vh]"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-bar cursor-move select-none" onPointerDown={startDrag}>
              <span className="terminal-dot bg-red-500/80" />
              <span className="terminal-dot bg-yellow-400/80" />
              <span className="terminal-dot bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                visitor@portfolio: ~/shell
              </span>
              <button
                onClick={toggleSound}
                aria-label="Toggle sound"
                className="ml-auto text-muted-foreground transition-colors hover:text-neon-cyan"
              >
                {soundOn ? <Volume2 className="h-4 w-4 text-neon-cyan" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="text-muted-foreground transition-colors hover:text-neon-magenta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              onClick={() => mode === "shell" && inputRef.current?.focus()}
              className="flex-1 space-y-2 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
            >
              {lines.map((l) => (
                <div key={l.id}>{l.node}</div>
              ))}

              {mode === "snake" ? (
                <div className="pt-2">
                  <SnakeGame
                    onExit={(score) => {
                      setMode("shell");
                      print(<span>snake: exited — final score <Cyan>{score}</Cyan></span>);
                      setTimeout(() => inputRef.current?.focus(), 60);
                    }}
                    onWin={() => unlock("snake")}
                  />
                </div>
              ) : mode === "typing" ? (
                <div className="pt-2">
                  <TypeTest
                    onExit={(wpm) => {
                      setMode("shell");
                      print(<span>type: exited — <Cyan>{wpm}</Cyan> wpm</span>);
                      setTimeout(() => inputRef.current?.focus(), 60);
                    }}
                    onWin={() => unlock("typing")}
                  />
                </div>
              ) : mode === "simon" ? (
                <div className="pt-2">
                  <SimonGame
                    onExit={(round) => {
                      setMode("shell");
                      print(<span>simon: exited — reached round <Cyan>{round}</Cyan></span>);
                      setTimeout(() => inputRef.current?.focus(), 60);
                    }}
                    onWin={() => unlock("memory")}
                  />
                </div>
              ) : (
                <form onSubmit={submit} className="flex items-center gap-2 pt-1">
                  <span className="text-neon-green">visitor@portfolio</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-neon-cyan">~</span>
                  <span className="text-muted-foreground">$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onInputKey}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    className="flex-1 border-none bg-transparent text-foreground caret-neon-cyan outline-none"
                    aria-label="terminal input"
                  />
                </form>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-neon-cyan/15 px-4 py-2 font-mono text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> run · <span className="text-neon-cyan">tab</span>{" "}
                complete · <span className="text-neon-cyan">↑↓</span> history · <span className="text-neon-cyan">esc</span> close
              </span>
              <span className="hidden sm:inline">type `help`</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandTerminal;
