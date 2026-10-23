import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE } from './fx';

/**
 * AI RECRUITER — a chat assistant that answers questions about Prashant from the portfolio's own data.
 * The model call happens in the Cloudflare Worker (worker/), which holds the API key.
 * The launcher only appears once the Worker reports it is configured.
 */
const API = '/api/ai-recruiter';
const WELCOME = 'Hi! I’m Prashant’s AI Recruiter. Ask me about his experience, projects, skills or achievements.';
const SUGGESTED = [
  'What has he delivered on Azure?',
  'Tell me about his agentic AI work',
  'What is his leadership experience?',
  'Which projects have public code?',
];

type Msg = { role: 'user' | 'assistant'; content: string; error?: boolean };

export default function AIRecruiter() {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${API}/health`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setAvailable(Boolean(d?.configured)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!available) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => setOpen(true)}
            data-cursor="link"
            aria-label="Open the AI Recruiter chat"
            className="group fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#8a0f22] to-[#3a0710] py-3 pl-3.5 pr-5 text-sm font-semibold text-bone shadow-[0_10px_40px_rgba(229,19,43,0.45)] ring-1 ring-crimson-2/50 transition hover:ring-crimson-2 sm:bottom-7 sm:right-7"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
          >
            <Spark className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
            <span>
              Ask my <span className="text-crimson-2">AI Recruiter</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>{open && <ChatPanel key="panel" onClose={() => setOpen(false)} />}</AnimatePresence>
    </>,
    document.body,
  );
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      abortRef.current?.abort();
    };
  }, [onClose]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const ask = useCallback(
    async (question: string, prior: Msg[]) => {
      const q = question.trim();
      if (!q || busy) return;
      const history = prior.filter((m) => !m.error).slice(-10).map(({ role, content }) => ({ role, content }));
      setMessages([...prior, { role: 'user', content: q }, { role: 'assistant', content: '' }]);
      setInput('');
      setBusy(true);
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const fail = (text: string) =>
        setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content: text, error: true }]);
      try {
        const res = await fetch(`${API}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: q, history }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          fail(data?.message || 'Something went wrong. Please try again.');
          return;
        }
        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let text = '';
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          text += value;
          setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content: text }]);
        }
        if (!text.trim()) fail('No answer came back. Please try again.');
      } catch (e) {
        if ((e as Error).name !== 'AbortError') fail('Couldn’t reach the assistant. Check your connection and try again.');
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy],
  );

  const retry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    const idx = messages.lastIndexOf(lastUser);
    ask(lastUser.content, messages.slice(0, idx));
  };

  const last = messages[messages.length - 1];

  return (
    <motion.div
      role="dialog"
      aria-label="AI Recruiter chat"
      className="fixed inset-0 z-[95] flex flex-col overflow-hidden bg-[#0b0608] sm:inset-auto sm:bottom-7 sm:right-7 sm:h-[min(640px,calc(100vh-7rem))] sm:w-[400px] sm:rounded-2xl sm:shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_60px_rgba(229,19,43,0.25)] sm:ring-1 sm:ring-crimson-2/30"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.97 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* header */}
      <div className="relative flex shrink-0 items-center gap-3 border-b border-white/10 bg-gradient-to-r from-[#3a0710] via-[#1a070b] to-[#0b0608] px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-crimson to-[#4a0812] text-bone shadow-[0_0_24px_rgba(229,19,43,0.5)]">
          <Spark className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl leading-none tracking-wide text-bone">AI RECRUITER</p>
          <p className="mt-1 truncate text-[11px] text-mist">Answers from {profile.firstName.charAt(0) + profile.firstName.slice(1).toLowerCase()}’s portfolio</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close chat" data-cursor="close" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-bone transition hover:bg-white/20">
          ✕
        </button>
      </div>

      {/* messages */}
      <div ref={listRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
        <Bubble role="assistant">{WELCOME}</Bubble>
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s, messages)}
                className="rounded-full border border-crimson-2/40 bg-crimson/10 px-3 py-1.5 text-left text-xs text-bone/90 transition hover:border-crimson-2 hover:bg-crimson/25"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) =>
          m.role === 'assistant' && !m.content && busy && i === messages.length - 1 ? (
            <Typing key={i} />
          ) : (
            <Bubble key={i} role={m.role} error={m.error}>
              {m.role === 'assistant' ? <Rich text={m.content} /> : m.content}
            </Bubble>
          ),
        )}
        {last?.error && !busy && (
          <button type="button" onClick={retry} className="ml-1 text-xs font-semibold text-crimson-2 underline underline-offset-4 hover:text-bone">
            ↻ Try again
          </button>
        )}
      </div>

      {/* composer */}
      <form
        className="shrink-0 border-t border-white/10 bg-black/30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input, messages);
        }}
      >
        <div className="flex items-end gap-2 rounded-xl bg-white/[0.06] p-1.5 ring-1 ring-white/10 focus-within:ring-crimson-2/60">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 600))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                ask(input, messages);
              }
            }}
            rows={1}
            placeholder="Ask about his work…"
            aria-label="Your question"
            className="max-h-28 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[16px] text-bone placeholder:text-smoke focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-crimson text-white transition hover:bg-crimson-2 disabled:opacity-35"
          >
            ➤
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-smoke">
          AI-generated from portfolio facts and may make mistakes. To confirm details, email{' '}
          <a href={`mailto:${profile.email}`} className="underline hover:text-bone">
            {profile.email}
          </a>
        </p>
      </form>
    </motion.div>
  );
}

function Bubble({ role, error, children }: { role: Msg['role']; error?: boolean; children: ReactNode }) {
  const mine = role === 'user';
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          mine ? 'rounded-br-md bg-crimson text-white' : error ? 'rounded-bl-md bg-[#2a0d12] text-bone/85 ring-1 ring-crimson-2/40' : 'rounded-bl-md bg-white/[0.07] text-bone/90 ring-1 ring-white/10'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex" aria-label="The assistant is typing">
      <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/10">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-crimson-2" animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>
    </div>
  );
}

/** Plain text with "- " bullets; URLs and emails become links. */
function Rich({ text }: { text: string }) {
  const lines = text.replace(/\*\*/g, '').split('\n');
  const out: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = (k: number) => {
    if (!bullets.length) return;
    out.push(
      <ul key={`ul${k}`} className="my-1 list-disc space-y-1 pl-4 marker:text-crimson-2">
        {bullets.map((b, i) => (
          <li key={i}>{linkify(b)}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };
  lines.forEach((l, i) => {
    const m = l.match(/^\s*[-•*]\s+(.*)$/);
    if (m) return void bullets.push(m[1]);
    flush(i);
    if (l.trim()) out.push(<p key={i} className="[&+p]:mt-2">{linkify(l)}</p>);
  });
  flush(lines.length);
  return <div className="whitespace-normal">{out}</div>;
}

function linkify(s: string): ReactNode[] {
  const parts = s.split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return parts.map((p, i) => {
    if (/^https?:\/\//.test(p)) {
      const href = p.replace(/[.,;:]+$/, '');
      return (
        <a key={i} href={href} target="_blank" rel="noreferrer" className="text-crimson-2 underline underline-offset-2 hover:text-bone">
          {href.replace(/^https?:\/\/(www\.)?/, '')}
        </a>
      );
    }
    if (/@/.test(p) && /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(p)) {
      const addr = p.replace(/[.]+$/, '');
      return (
        <a key={i} href={`mailto:${addr}`} className="text-crimson-2 underline underline-offset-2 hover:text-bone">
          {addr}
        </a>
      );
    }
    return p;
  });
}

function Spark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
      <path d="M19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" opacity=".7" />
    </svg>
  );
}
