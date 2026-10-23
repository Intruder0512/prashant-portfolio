import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { blueprints, profile, projects, yearsExp, type ProfileId } from '../data/portfolio';
import { useDesktop, useFinePointer, useMedia, useReducedMotionPref } from '../hooks/useMedia';
import { markGreeted, recruiter, useRecruiter } from '../hooks/recruiterBus';
import Robot from './Robot';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
};

export default function Hero({ onPlay, onResume, profileId }: { onPlay: () => void; onResume: () => void; profileId: ProfileId }) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blackout = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  // pointer parallax (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const imgRotY = useTransform(px, [-1, 1], [-4, 4]);
  const imgRotX = useTransform(py, [-1, 1], [3, -3]);
  const imgShiftX = useTransform(px, [-1, 1], [-10, 10]);
  const chipX = useTransform(px, [-1, 1], [18, -18]);
  const chipY = useTransform(py, [-1, 1], [12, -12]);
  const glowX = useTransform(px, [-1, 1], ['-6%', '6%']);

  const desktop = useDesktop();
  const reduced = useReducedMotionPref();
  const lowData = useMedia('(prefers-reduced-data: reduce)');
  const showVideo = desktop && !reduced && !lowData && Boolean(profile.heroVideo);

  const meta = ['2009 – Present', `${yearsExp}+ Years`, `${projects.length} Productions`, `${blueprints.length} Blueprints`];

  const floating = [
    { text: '1M+ Users', sub: 'Kubernetes LMS', pos: 'left-[2%] top-[30%]', depth: 1 },
    { text: 'Embedded World', sub: 'Speaker · Nuremberg', pos: 'right-[0%] top-[18%]', depth: -1 },
    { text: 'Bedrock · K8s · Edge', sub: 'Signature stack', pos: 'right-[4%] bottom-[24%]', depth: 0.6 },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* atmosphere */}
      <motion.div aria-hidden className="absolute inset-0" style={{ x: glowX }}>
        <div className="absolute right-[-10%] top-[-10%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(229,19,43,0.38),rgba(229,19,43,0.08)_55%,transparent)] blur-2xl lg:right-[-4%] lg:w-[60vw]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(90,20,120,0.25),transparent)] blur-2xl" />
      </motion.div>
      <Particles className="z-[1]" />
      <div aria-hidden className="absolute inset-0 z-[1] overflow-hidden">
        <span className="light-streak left-[40%] top-[22%] w-[50vw]" style={{ animationDelay: '1.2s' }} />
        <span className="light-streak left-[30%] top-[64%] w-[40vw]" style={{ animationDelay: '3.6s' }} />
        <span className="light-streak left-[55%] top-[44%] w-[30vw]" style={{ animationDelay: '5.2s' }} />
      </div>

      {showVideo ? (
        <HeroVideo y={imgY} opacity={fade} />
      ) : (
        <>
          {/* portrait */}
          <motion.div
            className="absolute inset-x-0 top-12 z-[2] flex h-[64svh] items-end justify-center sm:h-[70svh] lg:bottom-0 lg:left-auto lg:right-[3vw] lg:top-20 lg:h-auto lg:w-[54vw] xl:right-[6vw] xl:w-[48vw]"
            style={{ y: imgY, scale: imgScale, opacity: fade }}
          >
            <motion.div
              className="relative h-full w-full lg:h-[86vh]"
              style={{ rotateY: imgRotY, rotateX: imgRotX, x: imgShiftX, transformPerspective: 1200 }}
              initial={{ clipPath: 'inset(100% -30% -10% -30%)', opacity: 0 }}
              animate={{ clipPath: 'inset(-30% -30% -10% -30%)', opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
            >
              {/* rim light ring */}
              <div aria-hidden className="absolute bottom-[8%] left-1/2 h-[78%] w-[78%] -translate-x-1/2 rounded-full border border-crimson-2/20 shadow-[0_0_120px_rgba(229,19,43,0.35),inset_0_0_80px_rgba(229,19,43,0.18)]" />
              <img
                src={profile.portrait.src}
                srcSet={profile.portrait.srcSet}
                sizes="(max-width: 1024px) 100vw, 54vw"
                alt={profile.portrait.alt}

                className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_62%,transparent_97%)]"
              />
              {/* crimson rim light on the image edge */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_30%,rgba(255,61,90,0.16),transparent_70%)] mix-blend-screen" />

              {/* floating UI chips */}
              {floating.map((f, i) => (
                <FloatChip key={f.text} {...f} index={i} mx={chipX} my={chipY} />
              ))}
            </motion.div>
          </motion.div>

        </>
      )}

      {/* readability gradients */}
      <div aria-hidden className="absolute inset-x-0 top-[40svh] z-[3] h-[36svh] bg-gradient-to-b from-transparent via-ink/70 to-ink lg:hidden" />
      <div aria-hidden className="absolute inset-0 z-[3] hidden bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(7,7,10,0.7)_32%,transparent_58%)] lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[3] h-48 bg-gradient-to-t from-ink to-transparent" />

      {/* copy */}
      <motion.div
        className="gutter relative z-[4] flex min-h-[100svh] flex-col justify-end pb-16 pt-[54svh] sm:pb-20 lg:max-w-[52vw] lg:justify-center lg:pb-28 lg:pt-24"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-3 text-lg">
          <SeriesMark />
        </motion.div>
        <motion.h1 variants={item} className="font-display leading-[0.82] tracking-[0.02em] text-bone" style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}>
          <span className="shimmer-text">{profile.firstName}</span>
        </motion.h1>
        <motion.p variants={item} className="mt-2 max-w-[36rem] font-sans text-xs font-bold leading-relaxed tracking-[0.3em] text-crimson-2 sm:text-sm sm:tracking-[0.34em]">
          {profile.seriesTag}
        </motion.p>

        <motion.p variants={item} className="mt-4 font-sans text-lg font-semibold leading-snug text-bone sm:text-2xl">
          {profile.role}
          <span className="mt-0.5 block text-sm font-medium text-mist sm:text-base">BHP India Technical Centre</span>
        </motion.p>

        <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-mist">
          <span className="rounded border border-white/25 px-1.5 py-px text-[10px] font-bold tracking-wider text-bone">ARCH</span>
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-smoke" />}
              {m}
            </span>
          ))}
        </motion.div>

        <motion.p variants={item} className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/90 sm:text-xs sm:tracking-[0.34em]">
          {profile.tagline.join(' • ')}
        </motion.p>

        <motion.p variants={item} className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone/80 sm:text-base">
          {profile.intro}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onPlay}
              className="flex min-h-12 items-center gap-3 rounded-md bg-bone px-6 py-3 text-[15px] font-bold text-ink transition hover:bg-white sm:px-8"
            >
              <span className="text-lg">▶</span> Play Intro
            </button>
          </Magnetic>
          <Magnetic>
            {profileId === 'recruiter' ? (
              <button type="button" onClick={onResume} className="glass flex min-h-12 items-center gap-3 rounded-md px-6 py-3 text-[15px] font-semibold text-bone transition hover:bg-white/15 sm:px-8">
                <span className="text-lg">⤓</span> View Resume
              </button>
            ) : (
              <button
                type="button"
                onClick={() => scrollTo('#originals')}
                className="glass flex min-h-12 items-center gap-3 rounded-md px-6 py-3 text-[15px] font-semibold text-bone transition hover:bg-white/15 sm:px-8"
              >
                <span className="text-xl leading-none">＋</span> My Work
              </button>
            )}
          </Magnetic>
          <button
            type="button"
            onClick={() => scrollTo('#about')}
            aria-label="More info"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-lg text-bone transition hover:border-bone hover:bg-white/10"
          >
            ⓘ
          </button>
        </motion.div>
      </motion.div>

      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-ink" style={{ opacity: blackout }} />
    </section>
  );
}

/**
 * Desktop hero: Prashant walks in and gestures with an open palm; the AI Recruiter robot
 * pops up where the palm points and opens the chat when clicked. Plays once, then holds.
 */
function HeroVideo({ y, opacity }: { y: MV | ReturnType<typeof useTransform<number, string>>; opacity: MV }) {
  const v = profile.heroVideo;
  const [bot, setBot] = useState(false);
  const available = useRecruiter((s) => s.available);
  const chatOpen = useRecruiter((s) => s.open);
  const boxRef = useRef<HTMLDivElement>(null);
  const [greet, setGreet] = useState(false);
  const [hover, setHover] = useState(false);
  const showBot = available && bot;

  // While the hero video is on screen, its robot is the only one — the corner launcher steps aside.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => recruiter.set({ heroBotVisible: e.intersectionRatio > 0.45 }), { threshold: [0, 0.45, 1] });
    io.observe(el);
    return () => {
      io.disconnect();
      recruiter.set({ heroBotVisible: false });
    };
  }, []);

  useEffect(() => {
    if (!showBot) return;
    const on = window.setTimeout(() => {
      setGreet(true);
      markGreeted();
    }, 500);
    const off = window.setTimeout(() => setGreet(false), 7500);
    return () => {
      clearTimeout(on);
      clearTimeout(off);
    };
  }, [showBot]);

  const fadeMask =
    'linear-gradient(to right, transparent 0%, black 24%, black 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 14%, black 70%, transparent 97%)';

  return (
    <>
    <motion.div
      ref={boxRef}
      className="absolute bottom-0 z-[2] aspect-video h-[86vh]"
      style={{ left: 'calc(80vw - 79.5vh)', y, opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <video
        className="h-full w-full object-cover"
        style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={v.poster}
        aria-label="Prashant Yadav walks forward and gestures toward his AI Recruiter assistant"
        onTimeUpdate={(e) => e.currentTarget.currentTime >= v.gestureAt && !bot && setBot(true)}
        onEnded={() => setBot(true)}
        onError={() => setBot(true)}
      >
        <source src={v.webm} type="video/webm" />
        <source src={v.mp4} type="video/mp4" />
      </video>
      {/* soft crimson rim to tie the clip into the page */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_55%_at_52%_45%,rgba(229,19,43,0.10),transparent_70%)] mix-blend-screen" />
    </motion.div>

    {/* Robot layer: same geometry as the video, but above the copy so it can be clicked */}
    <motion.div className="pointer-events-none absolute bottom-0 z-[6] aspect-video h-[86vh]" style={{ left: 'calc(80vw - 79.5vh)', y, opacity }}>
      <AnimatePresence>
        {showBot && !chatOpen && (
          <motion.div
            key="hero-bot"
            className="pointer-events-auto absolute left-[17%] top-[44%] w-[7.5%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.3, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <button
              type="button"
              onClick={() => recruiter.set({ open: true })}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              data-cursor="link"
              aria-label="Open the AI Recruiter chat"
              className="block w-full drop-shadow-[0_14px_30px_rgba(229,19,43,0.5)] transition-transform hover:scale-105"
            >
              <Robot className="h-auto w-full" />
            </button>
            <AnimatePresence>
              {(greet || hover) && (
                <motion.button
                  type="button"
                  tabIndex={-1}
                  onClick={() => recruiter.set({ open: true })}
                  className="absolute bottom-[62%] left-[88%] w-[220px] rounded-2xl rounded-bl-sm bg-bone px-3.5 py-2.5 text-left text-sm font-semibold leading-snug text-ink shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  Hi! 👋 I’m Prashant’s <span className="text-crimson">AI Recruiter</span>. Ask me anything about his work.
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
}

type MV = ReturnType<typeof useTransform<number, number>>;

function FloatChip({ text, sub, pos, depth, index, mx, my }: { text: string; sub: string; pos: string; depth: number; index: number; mx: MV; my: MV }) {
  const x = useTransform(mx, (n: number) => n * depth);
  const y = useTransform(my, (n: number) => n * depth);
  return (
    <motion.div
      className={`glass absolute hidden rounded-xl px-4 py-2.5 md:block ${pos}`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 1.2 + index * 0.18, ease: EASE }}
    >
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}>
        <p className="text-sm font-semibold text-bone">{text}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-mist">{sub}</p>
      </motion.div>
    </motion.div>
  );
}
