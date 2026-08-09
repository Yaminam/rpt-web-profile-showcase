import React, { useEffect, useState } from "react";
import { Mail, Send, X } from "lucide-react";
import { profile, contactReasons, mailtoFor } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** "Compose mail" popup. Opens on the `mail:open` event — asks what you're reaching out about, then opens your mail app pre-filled. */
const MailModal = () => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(contactReasons[0]);

  useEffect(() => {
    const onOpen = () => {
      setReason(contactReasons[0]);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mail:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mail:open", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;

  const send = () => {
    window.location.href = mailtoFor(profile.email, reason);
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="terminal-window animated-border w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-bar">
          <span className="terminal-dot bg-red-500/80" />
          <span className="terminal-dot bg-yellow-400/80" />
          <span className="terminal-dot bg-green-500/80" />
          <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" /> compose_mail.sh
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="ml-auto text-muted-foreground transition-colors hover:text-neon-magenta"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5 font-mono text-sm">
          <p className="text-muted-foreground">
            <span className="text-neon-green">$</span> what are you reaching out about?
          </p>

          <div className="flex flex-wrap gap-2">
            {contactReasons.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setReason(r)}
                className={cn(reason.id === r.id ? "chip-magenta" : "chip")}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="mb-1 text-xs text-muted-foreground">
              to: <span className="text-foreground">{profile.email}</span>
            </p>
            <p className="mb-2 text-xs text-muted-foreground">
              subject: <span className="text-foreground">{reason.subject}</span>
            </p>
            <pre className="whitespace-pre-wrap font-sans text-[11px] leading-relaxed text-muted-foreground">
              {reason.body}
            </pre>
          </div>

          <button type="button" onClick={send} className="btn-neon w-full justify-center">
            <Send className="h-4 w-4" /> open in mail app
          </button>
          <p className="text-center text-[10px] text-muted-foreground">
            opens your default mail app with this pre-filled — edit anything before you send.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MailModal;
