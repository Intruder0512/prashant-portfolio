import { motion } from 'framer-motion';
import { useId } from 'react';

/**
 * Original mascot for the AI Recruiter: a pearl-white hover-bot with a dark visor,
 * glowing crimson eyes, a pulsing antenna and a waving arm. Pure SVG, no image assets.
 */
export default function Robot({ className = '', wave = true, float = true }: { className?: string; wave?: boolean; float?: boolean }) {
  const id = useId().replace(/:/g, '');
  const g = (n: string) => `${n}-${id}`;
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden overflow="visible">
      <defs>
        <radialGradient id={g('shell')} cx="38%" cy="28%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#ece6ea" />
          <stop offset="1" stopColor="#a99ca6" />
        </radialGradient>
        <linearGradient id={g('visor')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0d16" />
          <stop offset="1" stopColor="#07030a" />
        </linearGradient>
        <radialGradient id={g('red')} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ff6b80" />
          <stop offset="0.6" stopColor="#e5132b" />
          <stop offset="1" stopColor="#7a0716" />
        </radialGradient>
        <filter id={g('glow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={g('shadow')}>
          <stop offset="0" stopColor="#e5132b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#e5132b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* hover glow on the "floor" */}
      <motion.ellipse
        cx="100"
        cy="228"
        rx="52"
        ry="9"
        fill={`url(#${g('shadow')})`}
        animate={float ? { scaleX: [1, 0.82, 1], opacity: [0.9, 0.55, 0.9] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: 0.5, originY: 0.5 }}
      />

      <motion.g animate={float ? { y: [0, -9, 0] } : undefined} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
        {/* resting arm (viewer's left) */}
        <g transform="rotate(18 58 150)">
          <rect x="44" y="146" width="18" height="44" rx="9" fill={`url(#${g('shell')})`} />
          <circle cx="53" cy="192" r="9" fill={`url(#${g('red')})`} />
        </g>

        {/* body */}
        <ellipse cx="100" cy="172" rx="46" ry="42" fill={`url(#${g('shell')})`} />
        <path d="M66 160 Q100 146 134 160" stroke="#d8cfd6" strokeWidth="2" fill="none" opacity="0.8" />
        <rect x="80" y="160" width="40" height="28" rx="12" fill={`url(#${g('visor')})`} />
        <motion.circle
          cx="100"
          cy="174"
          r="6"
          fill="#ff3d5a"
          filter={`url(#${g('glow')})`}
          animate={{ opacity: [1, 0.45, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: 0.5, originY: 0.5 }}
        />

        {/* waving arm (viewer's right), pivots at the shoulder */}
        <motion.g
          animate={wave ? { rotate: [0, -22, 10, -22, 10, 0, 0] } : undefined}
          transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.12, 0.24, 0.36, 0.48, 0.6, 1], ease: 'easeInOut' }}
          style={{ originX: '142px', originY: '150px', transformBox: 'view-box' }}
        >
          <g transform="rotate(42 142 150)">
            <rect x="136" y="104" width="18" height="48" rx="9" fill={`url(#${g('shell')})`} />
            <circle cx="145" cy="102" r="10" fill={`url(#${g('red')})`} />
            <circle cx="141" cy="98" r="3" fill="#ffffff" opacity="0.55" />
          </g>
        </motion.g>

        {/* neck */}
        <rect x="86" y="118" width="28" height="14" rx="6" fill="#5a4a55" />

        {/* head group tilts gently */}
        <motion.g animate={float ? { rotate: [0, -3, 0, 3, 0] } : undefined} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ originX: '100px', originY: '120px', transformBox: 'view-box' }}>
          {/* antenna */}
          <line x1="100" y1="38" x2="100" y2="18" stroke="#b8acb5" strokeWidth="4" strokeLinecap="round" />
          <motion.circle
            cx="100"
            cy="14"
            r="7"
            fill="#ff3d5a"
            filter={`url(#${g('glow')})`}
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />

          {/* ears */}
          <circle cx="40" cy="82" r="14" fill={`url(#${g('red')})`} />
          <circle cx="160" cy="82" r="14" fill={`url(#${g('red')})`} />
          <circle cx="40" cy="82" r="6" fill="#ffffff" opacity="0.35" />
          <circle cx="160" cy="82" r="6" fill="#ffffff" opacity="0.35" />

          {/* head shell */}
          <rect x="42" y="34" width="116" height="92" rx="46" fill={`url(#${g('shell')})`} />
          {/* visor */}
          <rect x="54" y="52" width="92" height="60" rx="30" fill={`url(#${g('visor')})`} />
          <path d="M66 62 Q86 54 110 56" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.18" />

          {/* eyes — blink every few seconds */}
          <motion.g
            filter={`url(#${g('glow')})`}
            animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.9, 0.94, 0.98, 1] }}
            style={{ originX: '100px', originY: '82px', transformBox: 'view-box' }}
          >
            <rect x="74" y="70" width="16" height="24" rx="8" fill="#ff3d5a" />
            <rect x="110" y="70" width="16" height="24" rx="8" fill="#ff3d5a" />
          </motion.g>
          <path d="M90 100 Q100 106 110 100" stroke="#ff3d5a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
          {/* cheek glints */}
          <circle cx="64" cy="98" r="3" fill="#ff3d5a" opacity="0.45" />
          <circle cx="136" cy="98" r="3" fill="#ff3d5a" opacity="0.45" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
