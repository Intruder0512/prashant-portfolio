import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { blueprints } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

// Diagrams are plain SVG files; each one is fetched only when its tab is opened.
const loaders = import.meta.glob('../data/blueprints/*.svg', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;
const loadSvg = (id: string) => loaders[`../data/blueprints/${id}.svg`]?.() ?? Promise.resolve('');

const GROUPS = Array.from(new Set(blueprints.map((b) => b.group)));

/**
 * THE BLUEPRINTS — interactive architecture diagrams. Clicking a component plays its
 * "director's commentary" as a subtitle under the screen.
 */
export default function Blueprints({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const bp = blueprints.find((b) => b.id === active) ?? blueprints[0];
  const [svg, setSvg] = useState('');
  const [tip, setTip] = useState<string | null>(null);
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    setTip(null);
    loadSvg(bp.id).then((s) => alive && setSvg(s));
    return () => {
      alive = false;
    };
  }, [bp.id]);

  // Make every annotated component keyboard-reachable once the SVG is in the DOM.
  useEffect(() => {
    const root = canvas.current;
    if (!root) return;
    root.querySelectorAll<SVGElement>('[data-tip]').forEach((el) => {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      const label = el.querySelector('text')?.textContent;
      if (label) el.setAttribute('aria-label', `${label} — show details`);
    });
  }, [svg]);

  const pick = (target: EventTarget | null) => {
    const el = (target as Element | null)?.closest?.('[data-tip]');
    if (!el || !canvas.current) return;
    canvas.current.querySelectorAll('.bp-active').forEach((n) => n.classList.remove('bp-active'));
    el.classList.add('bp-active');
    setTip(el.getAttribute('data-tip'));
  };

  return (
    <>
      <SectionHeading
        kicker={`${blueprints.length} Architectures · Interactive`}
        title="The Blueprints"
        aside={<p className="max-w-xs text-sm text-mist">Real-world systems as delivered, plus reference designs. Click any component for the commentary.</p>}
      />

      {/* tabs */}
      <div className="gutter mb-6 space-y-3">
        {GROUPS.map((g) => (
          <div key={g} className="rail -mx-[var(--gutter)] flex items-center gap-2 overflow-x-auto px-[var(--gutter)]" role="tablist" aria-label={`${g} architectures`}>
            <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">{g}</span>
            {blueprints
              .filter((b) => b.group === g)
              .map((b) => (
                <button
                  key={b.id}
                  type="button"
                  role="tab"
                  aria-selected={b.id === bp.id}
                  onClick={() => onSelect(b.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${b.id === bp.id ? 'text-ink' : 'text-mist hover:text-bone'}`}
                >
                  {b.id === bp.id && <motion.span layoutId="bp-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ duration: 0.45, ease: EASE }} />}
                  {b.id !== bp.id && <span className="absolute inset-0 rounded-full ring-1 ring-white/15" />}
                  <span className="relative whitespace-nowrap">{b.label}</span>
                </button>
              ))}
          </div>
        ))}
      </div>

      <div className="gutter">
        <AnimatePresence mode="wait">
          <motion.div
            key={bp.id}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {bp.badges.map((b) => (
                <span key={b} className="glass rounded-full px-3 py-1.5 text-xs font-medium text-bone">
                  {b}
                </span>
              ))}
            </div>

            {/* the screen */}
            <div className="relative rounded-2xl bg-[#0b0b10] p-2 shadow-[0_40px_120px_-30px_rgba(229,19,43,0.35)] ring-1 ring-white/10 sm:p-3">
              <div
                data-lenis-prevent-wheel
                className="rail overflow-x-auto rounded-xl bg-[#fbfaf7] [background-image:radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:18px_18px]"
              >
                <div
                  ref={canvas}
                  className="bp-canvas min-w-[920px] p-3 sm:p-5"
                  onClick={(e) => pick(e.target)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      pick(e.target);
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              </div>

              {/* subtitle */}
              <div className="pointer-events-none sticky bottom-3 z-10 flex min-h-[64px] items-center justify-center px-3 py-3 text-center" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={tip ?? 'hint'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={tip ? 'max-w-4xl rounded bg-black/85 px-3 py-1.5 text-sm leading-relaxed text-[#fff6c9] shadow-lg backdrop-blur sm:text-[15px]' : 'rounded bg-black/70 px-3 py-1.5 text-[11px] tracking-[0.2em] text-mist backdrop-blur'}
                  >
                    {tip ?? `▶ CLICK ANY COMPONENT · ${bp.tips} ANNOTATED`}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {bp.legend.map((l) => (
                <span key={l.label} className="flex items-center gap-2 text-xs text-mist">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
