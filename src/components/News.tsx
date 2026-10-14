import { motion } from 'framer-motion';
import { news } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';
import { PosterBackdrop } from './Poster';

/** IN THE NEWS — premieres and press from international stages. */
export default function News() {
  return (
    <>
      <SectionHeading
        kicker="Premieres & press"
        title="In the News"
        aside={<p className="max-w-xs text-sm text-mist">International exhibitions, a demo to the Union Minister, and the posts that covered them.</p>}
      />
      <div className="gutter grid gap-5 md:grid-cols-2">
        {news.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: EASE }}
          >
            <Tilt max={4} className="group h-full rounded-2xl">
              <a
                href={n.link}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-ink-2 ring-1 ring-white/10 transition duration-500 hover:ring-white/30"
              >
                <div className="relative aspect-[16/8] overflow-hidden">
                  {n.image ? (
                    <>
                      <img src={n.image} alt={`${n.event} — ${n.title}`} loading="lazy" style={{ objectPosition: n.imagePosition }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-105">
                      <PosterBackdrop palette={n.palette}>
                        <span className="absolute -right-3 top-1/2 -translate-y-1/2 font-display text-[clamp(4rem,10vw,7rem)] leading-[0.85] text-white/[0.09]">{n.event}</span>
                      </PosterBackdrop>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded bg-crimson px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">{n.event}</span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-[2rem] leading-[0.95] tracking-wide text-bone">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/75">{n.detail}</p>
                  <p className="mt-3 text-xs text-smoke">{n.tags}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs">
                    <span className="text-mist">Posted by {n.by}</span>
                    <span className="font-semibold text-bone underline decoration-crimson-2/60 underline-offset-4 group-hover:decoration-crimson-2">View on LinkedIn ↗</span>
                  </div>
                </div>
              </a>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </>
  );
}
