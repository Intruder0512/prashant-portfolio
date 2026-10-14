import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { news, type NewsItem } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, SectionHeading, Tilt } from './fx';
import { PosterBackdrop } from './Poster';

/** IN THE NEWS — premieres and press from international stages. */
export default function News() {
  const [playing, setPlaying] = useState<NewsItem | null>(null);

  return (
    <>
      <SectionHeading
        kicker="Premieres & press"
        title="In the News"
        aside={<p className="max-w-xs text-sm text-mist">International stages, a demo to the Union Minister, and the posts that covered them.</p>}
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
                data-cursor={n.embed ? 'play' : 'link'}
                onClick={(e) => {
                  if (!n.embed) return;
                  e.preventDefault();
                  setPlaying(n);
                }}
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
                  {n.embed && (
                    <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/50 text-sm text-bone backdrop-blur transition duration-500 group-hover:scale-110 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
                      ▶
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-[2rem] leading-[0.95] tracking-wide text-bone">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/75">{n.detail}</p>
                  <p className="mt-3 text-xs text-smoke">{n.tags}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs">
                    <span className="text-mist">Posted by {n.by}</span>
                    <span className="font-semibold text-bone underline decoration-crimson-2/60 underline-offset-4 group-hover:decoration-crimson-2">
                      {n.embed ? 'Watch the post ▶' : 'View on LinkedIn ↗'}
                    </span>
                  </div>
                </div>
              </a>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Portal: the section animates with a transform, which would trap a fixed overlay inside it */}
      {createPortal(
        <AnimatePresence>{playing?.embed && <PostOverlay key={playing.id} item={playing} onClose={() => setPlaying(null)} />}</AnimatePresence>,
        document.body,
      )}
    </>
  );
}

/** Shows the LinkedIn post (video, reactions, comments) via LinkedIn's official embed. */
function PostOverlay({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  useScrollLock(true);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col items-center bg-black/85 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="flex w-full max-w-[560px] shrink-0 items-center justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]" onClick={(e) => e.stopPropagation()}>
        <p className="truncate font-display text-2xl tracking-wide text-bone">{item.title}</p>
        <div className="flex shrink-0 items-center gap-2">
          <a href={item.link} target="_blank" rel="noreferrer" className="rounded-md bg-bone px-3 py-2 text-xs font-bold text-ink">
            LinkedIn ↗
          </a>
          <button type="button" onClick={onClose} aria-label="Close post" data-cursor="close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20">
            ✕
          </button>
        </div>
      </div>
      <motion.div
        data-lenis-prevent
        className="w-full max-w-[560px] flex-1 overflow-y-auto overscroll-contain px-4 pb-6"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={item.embed!.src}
          height={item.embed!.height}
          title={`LinkedIn post — ${item.title}`}
          allowFullScreen
          loading="lazy"
          className="w-full rounded-xl bg-white"
          style={{ border: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}
