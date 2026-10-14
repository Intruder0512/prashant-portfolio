import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { flows, interviewGuide, libraries } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

const FLOW_HUES = ['#4cc9ff', '#b98bff'];

/**
 * FIELD GUIDE — the bonus features: how modern data and agentic-AI platforms work,
 * plus categorised architecture interview Q&A and the full downloadable libraries.
 */
export default function FieldGuide() {
  return (
    <>
      <SectionHeading
        kicker="Bonus features"
        title="The Field Guide"
        aside={<p className="max-w-xs text-sm text-mist">Behind the scenes of modern data and agentic AI platforms — and the questions architects get asked about them.</p>}
      />
      <HowItWorks />
      <Interview />
    </>
  );
}

function HowItWorks() {
  const [i, setI] = useState(0);
  const flow = flows[i];
  const hue = FLOW_HUES[i % FLOW_HUES.length];
  return (
    <div className="mb-16">
      <div className="rail gutter mb-6 flex gap-2 overflow-x-auto" role="tablist" aria-label="How it works">
        {flows.map((f, k) => (
          <button
            key={f.title}
            type="button"
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-left text-sm font-semibold transition ${k === i ? 'text-ink' : 'text-mist hover:text-bone'}`}
          >
            {k === i && <motion.span layoutId="flow-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ duration: 0.45, ease: EASE }} />}
            <span className="relative whitespace-nowrap">{f.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={flow.title}
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="gutter max-w-3xl text-[15px] leading-relaxed text-bone/75">{flow.sub.replace(' Click the architecture diagram below for the full component view.', '')}</p>
          <ol className="rail gutter mt-6 flex snap-x gap-3 overflow-x-auto pb-2 xl:grid xl:grid-cols-5 xl:overflow-visible">
            {flow.steps.map((s, k) => (
              <li key={s.title} className="relative flex w-[78vw] shrink-0 snap-start flex-col rounded-xl bg-ink-2 p-5 ring-1 ring-white/10 sm:w-[46vw] md:w-[34vw] xl:w-auto">
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-xl" style={{ background: `linear-gradient(90deg, ${hue}, transparent)` }} />
                <span className="font-display text-5xl leading-none" style={{ color: hue }}>
                  {String(k + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-3 text-base font-semibold text-bone">{s.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-mist">{s.desc}</p>
                <p className="mt-auto pt-4 text-[11px] font-medium leading-snug text-bone/70">{s.tech}</p>
              </li>
            ))}
          </ol>
          {flow.takeaway && (
            <div className="gutter mt-5">
              <div className="flex flex-col gap-2 rounded-xl p-5 ring-1 sm:flex-row sm:gap-5" style={{ background: `${hue}12`, boxShadow: `inset 0 0 0 1px ${hue}40` }}>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: hue }}>
                  Why it matters
                </span>
                <p className="text-sm leading-relaxed text-bone/85">{flow.takeaway}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Interview() {
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const c = interviewGuide[cat];
  const total = interviewGuide.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <div className="gutter mb-4 flex flex-wrap items-end justify-between gap-2">
        <h3 className="font-sans text-lg font-semibold text-bone sm:text-2xl">
          Interview Field Guide <span className="text-mist">· {interviewGuide.length} sets · {total} questions</span>
        </h3>
      </div>

      <div className="gutter grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <div className="rail -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0" role="tablist" aria-label="Question categories">
          {interviewGuide.map((g, k) => (
            <button
              key={g.category}
              type="button"
              role="tab"
              aria-selected={k === cat}
              onClick={() => {
                setCat(k);
                setOpen(0);
              }}
              className={`relative shrink-0 rounded-lg px-4 py-2.5 text-left text-sm transition ${k === cat ? 'font-semibold text-bone' : 'text-smoke hover:text-bone'}`}
            >
              {k === cat && <motion.span layoutId="guide-tab" className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/10" transition={{ duration: 0.4, ease: EASE }} />}
              <span className="relative whitespace-nowrap lg:whitespace-normal">{g.category}</span>
            </button>
          ))}
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div key={c.category} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
              <p className="mb-4 text-sm text-mist">
                <span className="font-semibold text-bone">{c.category}</span> — {c.title}
              </p>
              <ul className="divide-y divide-white/10 overflow-hidden rounded-xl bg-ink-2 ring-1 ring-white/10">
                {c.items.map((it, k) => {
                  const isOpen = open === k;
                  return (
                    <li key={it.q}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : k)}
                        className="flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03]"
                      >
                        <span className="mt-0.5 font-display text-lg leading-none text-crimson-2">Q{k + 1}</span>
                        <span className="flex-1 text-[15px] font-semibold leading-snug text-bone">{it.q}</span>
                        <span className={`mt-0.5 text-mist transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>＋</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                            <p className="px-5 pb-5 pl-[3.6rem] text-sm leading-relaxed text-bone/75">{it.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Full libraries — complete Q&amp;A with detailed answers</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {libraries.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  download
                  data-cursor="link"
                  className="group flex items-start gap-4 rounded-xl bg-ink-2 p-4 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:ring-white/30"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-crimson/15 text-lg text-crimson-2 ring-1 ring-crimson-2/30">⤓</span>
                  <span>
                    <span className="block text-sm font-semibold text-bone">{l.title}</span>
                    <span className="mt-1 block text-xs leading-snug text-mist">{l.meta}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
