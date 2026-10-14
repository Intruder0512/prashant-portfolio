import type { ReactNode } from 'react';
import type { Motif as MotifKind, Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        <Motif kind={project.motif} a={a} />
      </svg>
    </PosterBackdrop>
  );
}

/** Small fictional platform mark used in the nav and on cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M6 29V4h7.5a7.5 7.5 0 0 1 0 15H6" fill="none" stroke="#e5132b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">SERIES</span>
    </span>
  );
}

/** Line-art motifs drawn from each project's architecture. */
function Motif({ kind, a }: { kind: MotifKind; a: string }) {
  switch (kind) {
    case 'shield':
      return (
        <g transform="translate(232 40)" fill="none" stroke={a} strokeOpacity="0.85">
          <path d="M58 0 L116 22 V78 C116 120 90 146 58 160 C26 146 0 120 0 78 V22 Z" strokeWidth="2" />
          <path d="M58 16 L102 33 V78 C102 111 82 132 58 144 C34 132 14 111 14 78 V33 Z" strokeWidth="1" strokeOpacity="0.4" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="30" x2={i % 2 ? 72 : 86} y1={56 + i * 14} y2={56 + i * 14} strokeWidth="3" strokeLinecap="round" strokeOpacity={0.35 + i * 0.1} />
          ))}
          <path d="M40 124 l12 12 l26 -28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case 'flow':
      return (
        <g fill="none" stroke={a}>
          <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
          <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
          <line x1="214" x2="330" y1="124" y2="124" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="18 8" />
          <g transform="translate(176 196)">
            <circle cx="16" cy="16" r="16" strokeWidth="2" />
            <path d="M34 16 h46" strokeWidth="2" />
            <circle cx="96" cy="16" r="16" strokeWidth="2" strokeOpacity="0.8" />
            <path d="M112 8 l38 -22 M112 24 l38 22" strokeWidth="2" strokeOpacity="0.6" />
            <circle cx="166" cy="-18" r="10" fill={a} fillOpacity="0.8" stroke="none" />
            <circle cx="166" cy="50" r="10" strokeWidth="2" strokeOpacity="0.5" />
          </g>
        </g>
      );
    case 'tenants':
      return (
        <g fill="none" stroke={a}>
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={196 + c * 44}
                y={50 + r * 44}
                width="34"
                height="34"
                rx="7"
                strokeWidth="1.6"
                strokeOpacity={0.25 + ((r + c) % 3) * 0.25}
                fill={(r + c) % 4 === 0 ? a : 'none'}
                fillOpacity="0.25"
              />
            )),
          )}
          <path d="M188 200 h190" strokeWidth="2" strokeOpacity="0.7" />
          <path d="M188 214 h190" strokeWidth="1" strokeOpacity="0.35" />
          <path d="M188 228 h190" strokeWidth="1" strokeOpacity="0.2" />
        </g>
      );
    case 'layers':
      // Bronze / Silver / Gold medallion stack with an ingest arrow
      return (
        <g fill="none" stroke={a}>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${i * 46})`}>
              <path d="M222 70 L292 44 L362 70 L292 96 Z" strokeWidth="2" strokeOpacity={0.9 - i * 0.22} fill={a} fillOpacity={0.22 - i * 0.06} />
            </g>
          ))}
          <path d="M292 96 V210 M222 70 V162 M362 70 V162" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 6" />
          <path d="M170 116 h40 m-10 -8 l10 8 l-10 8" strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" />
          <path d="M150 90 h40 M150 142 h40" strokeWidth="1.4" strokeOpacity="0.35" strokeLinecap="round" />
        </g>
      );
    case 'nodes': {
      // Retrieval graph: a query node fanning to document chunks
      const pts = [
        [300, 60], [360, 110], [350, 190], [270, 220], [220, 150], [250, 90],
      ];
      return (
        <g stroke={a} fill="none">
          {pts.map(([x, y], i) => (
            <line key={`l${i}`} x1="290" y1="140" x2={x} y2={y} strokeWidth="1.4" strokeOpacity={0.3 + (i % 3) * 0.2} />
          ))}
          {pts.map(([x, y], i) => (
            <rect key={`n${i}`} x={x - 13} y={y - 9} width="26" height="18" rx="4" strokeWidth="1.6" strokeOpacity="0.8" fill={i % 2 ? 'none' : a} fillOpacity="0.2" />
          ))}
          <circle cx="290" cy="140" r="20" strokeWidth="2.4" fill={a} fillOpacity="0.3" />
          <circle cx="290" cy="140" r="34" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 5" />
        </g>
      );
    }
    case 'road':
      // Perspective road with lane markings and a sensor sweep
      return (
        <g fill="none" stroke={a}>
          <path d="M250 300 L285 70 M370 300 L305 70" strokeWidth="2" strokeOpacity="0.8" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="295" x2="295" y1={86 + i * 44} y2={104 + i * 46} strokeWidth={2 + i * 0.8} strokeOpacity="0.6" />
          ))}
          <path d="M295 200 L220 120 A110 110 0 0 1 370 120 Z" fill={a} fillOpacity="0.12" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="280" y="198" width="30" height="44" rx="8" strokeWidth="2" fill={a} fillOpacity="0.3" />
        </g>
      );
    case 'chip':
      return (
        <g fill="none" stroke={a}>
          <rect x="236" y="76" width="112" height="112" rx="14" strokeWidth="2.2" strokeOpacity="0.9" />
          <rect x="262" y="102" width="60" height="60" rx="6" fill={a} fillOpacity="0.22" strokeWidth="1.4" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round">
              <line x1={252 + i * 20} x2={252 + i * 20} y1="60" y2="74" />
              <line x1={252 + i * 20} x2={252 + i * 20} y1="190" y2="204" />
              <line y1={92 + i * 20} y2={92 + i * 20} x1="220" x2="234" />
              <line y1={92 + i * 20} y2={92 + i * 20} x1="350" x2="364" />
            </g>
          ))}
        </g>
      );
    case 'edge':
      // Field devices → gateway → cloud
      return (
        <g fill="none" stroke={a}>
          <path d="M318 70 a26 26 0 0 1 50 -6 a20 20 0 0 1 4 40 h-62 a18 18 0 0 1 8 -34 z" strokeWidth="2" strokeOpacity="0.85" />
          <rect x="268" y="150" width="46" height="34" rx="6" strokeWidth="2" fill={a} fillOpacity="0.2" />
          <path d="M300 150 L330 104" strokeWidth="1.6" strokeDasharray="4 5" strokeOpacity="0.7" />
          {[200, 250, 300, 350].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="240" r="8" strokeWidth="1.8" strokeOpacity="0.7" fill={i % 2 ? a : 'none'} fillOpacity="0.4" />
              <path d={`M${x} 232 L291 184`} strokeWidth="1" strokeOpacity="0.35" />
            </g>
          ))}
        </g>
      );
    case 'mesh': {
      const ring = Array.from({ length: 7 }, (_, i) => {
        const t = (i / 7) * Math.PI * 2;
        return [292 + Math.cos(t) * 80, 140 + Math.sin(t) * 80];
      });
      return (
        <g stroke={a} fill="none">
          {ring.map(([x, y], i) =>
            ring.slice(i + 1).map(([x2, y2], j) => <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} strokeWidth="0.8" strokeOpacity="0.25" />),
          )}
          {ring.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" strokeWidth="2" fill={i === 2 ? a : 'none'} fillOpacity="0.6" />
          ))}
        </g>
      );
    }
    case 'cloud':
      return (
        <g fill="none" stroke={a}>
          <path d="M228 150 a40 40 0 0 1 36 -56 a52 52 0 0 1 98 14 a34 34 0 0 1 -6 68 h-118 a30 30 0 0 1 -10 -26 z" strokeWidth="2.2" strokeOpacity="0.85" fill={a} fillOpacity="0.08" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={246 + i * 40} y="206" width="30" height="22" rx="4" strokeWidth="1.6" strokeOpacity={0.4 + i * 0.2} />
          ))}
          <path d="M261 206 V176 M301 206 V176 M341 206 V176" strokeWidth="1.2" strokeDasharray="3 4" strokeOpacity="0.5" />
        </g>
      );
  }
}
