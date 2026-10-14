import { motion } from 'framer-motion';
import { techStack } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

/**
 * THE CAST — the signature tech stack, drawn as an architecture stack:
 * models at the top, down through agents, retrieval, data and platform to the edge.
 */
export default function TechStack() {
  const total = techStack.reduce((n, l) => n + l.tools.length, 0);
  return (
    <>
      <SectionHeading
        kicker={`Signature tech stack · ${total} technologies`}
        title="The Cast"
        aside={<p className="max-w-xs text-sm text-mist">The tools behind every production, layered the way the systems are built — from models down to the edge.</p>}
      />
      <div className="gutter">
        <ol className="relative space-y-2.5 [perspective:1600px]">
          {techStack.map((l, i) => (
            <motion.li
              key={l.id}
              className="group relative grid items-center gap-3 overflow-hidden rounded-xl bg-ink-2 p-4 ring-1 ring-white/10 transition duration-500 hover:ring-white/25 sm:p-5 md:grid-cols-[260px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)]"
              initial={{ opacity: 0, x: i % 2 ? 60 : -60, rotateX: 12 }}
              whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-6% 0px' }}
              transition={{ duration: 0.8, delay: Math.min(i, 4) * 0.05, ease: EASE }}
              whileHover={{ y: -3 }}
            >
              {/* layer glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-2/3 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(70% 120% at 0% 50%, ${l.palette.via}66, transparent 70%)` }}
              />
              <div aria-hidden className="absolute inset-y-0 left-0 w-[3px]" style={{ background: l.palette.accent }} />

              <div className="relative flex items-center gap-4">
                <span className="font-display text-3xl leading-none text-white/20 transition-colors duration-500 group-hover:text-white/40">
                  L{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[1.65rem] leading-none tracking-wide text-bone">{l.layer}</h3>
                  <p className="mt-1 text-xs text-mist">{l.role}</p>
                </div>
              </div>

              <ul className="relative flex flex-wrap gap-2">
                {l.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full px-3 py-1.5 text-[13px] font-medium text-bone/90 transition duration-300 group-hover:text-bone"
                    style={{ background: `${l.palette.accent}14`, boxShadow: `inset 0 0 0 1px ${l.palette.accent}40` }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
        <p className="mt-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-smoke">
          <span className="h-px w-8 bg-smoke/50" /> Request flows top to bottom · data flows bottom to top
        </p>
      </div>
    </>
  );
}
