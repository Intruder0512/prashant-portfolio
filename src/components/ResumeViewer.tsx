import { useState } from 'react';
import { motion } from 'framer-motion';
import { achievements, education, experience, leadership, profile, projects, skillCategories, yearsExp } from '../data/portfolio';
import { EASE, Magnetic, SectionHeading } from './fx';

/** Downloads the resume PDF if one is configured, otherwise prints the on-page resume (Save as PDF). */
export function downloadResume() {
  if (profile.resumePdf) {
    const a = document.createElement('a');
    a.href = profile.resumePdf;
    a.download = profile.resumeFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else {
    window.print();
  }
}

/** THE FULL STORY — a designed resume preview plus view / download actions. */
export default function ResumeSection({ onView }: { onView: () => void }) {
  return (
    <>
      <SectionHeading kicker="The screenplay" title="The Full Story" />
      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformPerspective: 1600 }}
        >
          <CollapsibleSheet />
        </motion.div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-serif text-3xl italic leading-tight text-bone">Every season, on one page.</p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            {yearsExp}+ years, {projects.length} projects and {achievements.length} awards & speaking credits — view it here or take a copy with you.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="view"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white"
              >
                ▶ View Resume
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="link"
                onClick={downloadResume}
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
              >
                ⤓ {profile.resumePdf ? 'Download Resume' : 'Save as PDF'}
              </button>
            </Magnetic>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
            {[
              { v: `${yearsExp}+`, k: 'Years' },
              { v: String(projects.length), k: 'Projects' },
              { v: String(achievements.length), k: 'Honours' },
            ].map((s) => (
              <div key={s.k} className="bg-ink-2 px-2 py-4">
                <dd className="font-display text-3xl leading-none text-bone">{s.v}</dd>
                <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

/** The sheet starts as a teaser so the page keeps its pace; expand to read it all. */
function CollapsibleSheet() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className={`overflow-hidden transition-[max-height] duration-700 ease-[var(--ease-cine)] ${open ? 'max-h-[9000px]' : 'max-h-[560px] md:max-h-[900px]'}`}>
        <ResumeSheet />
      </div>
      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-ink via-ink/85 to-transparent pb-4">
          <button type="button" onClick={() => setOpen(true)} className="glass min-h-11 rounded-full px-5 text-sm font-semibold text-bone">
            Read the full story ↓
          </button>
        </div>
      )}
    </div>
  );
}

function H({ children }: { children: string }) {
  return <h4 className="rs-h mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2 first:mt-0">{children}</h4>;
}

export function ResumeSheet() {
  return (
    <article className="resume-sheet relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#121218,#0c0c11)] p-6 ring-1 ring-white/10 sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-2/70 to-transparent" />
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-smoke">{profile.role.toUpperCase()}</p>
          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">{profile.fullName}</h3>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-mist">{profile.intro}</p>
        </div>
        <div className="text-xs leading-relaxed text-mist sm:text-right">
          <a href={`mailto:${profile.email}`} className="block hover:text-bone">
            {profile.email}
          </a>
          <span className="block">{profile.location}</span>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
            linkedin.com/in/prashant-yadav-a6120115
          </a>
          {profile.links.github && (
            <>
              {' · '}
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-bone">
                GitHub ↗
              </a>
            </>
          )}
        </div>
      </header>

      <div className="grid gap-x-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <H>Work Experience</H>
          {experience.map((x) => (
            <div key={x.company + x.role} className="rs-block mb-5">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {x.role} — <span className="text-bone/80">{x.company}</span>
                </p>
                <p className="text-xs text-smoke">{x.period}</p>
              </div>
              {x.growth && <p className="mt-1 text-[11px] italic leading-relaxed text-smoke">{x.growth}</p>}
              <ul className="mt-2 space-y-1.5">
                {x.points.map((p) => (
                  <li key={p} className="flex gap-2 text-xs leading-relaxed text-mist">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson-2" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <H>Education</H>
          {education.map((e) => (
            <div key={e.school} className="rs-block mb-4">
              <p className="text-sm font-semibold text-bone">{e.degree}</p>
              <p className="text-xs text-mist">
                {e.school}, {e.place} · <span className="text-smoke">{e.period}</span>
              </p>
            </div>
          ))}

          <H>Skills</H>
          <div className="space-y-2">
            {skillCategories.map((c) => (
              <p key={c.id} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">{c.title}: </span>
                {c.skills.map((s) => s.name).join(', ')}
              </p>
            ))}
          </div>

          <H>Selected Projects</H>
          {projects.filter((p) => p.featured).map((p) => (
            <div key={p.id} className="rs-block mb-3">
              <p className="text-sm font-semibold text-bone">
                {p.title} <span className="text-xs font-normal text-smoke">· {p.client}</span>
              </p>
              <p className="text-xs leading-relaxed text-mist">{p.logline}</p>
            </div>
          ))}

          <H>Awards & Speaking</H>
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a.id} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">
                  {a.title} — {a.org} ({a.year}).
                </span>{' '}
                {a.detail}
              </li>
            ))}
          </ul>

          <H>Speaking & Leadership</H>
          <ul className="space-y-1.5">
            {leadership.map((l) => (
              <li key={l} className="flex gap-2 text-xs leading-relaxed text-mist">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson-2" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
