import { useSyncExternalStore } from 'react';

/** Tiny shared state between the AI Recruiter chat and the hero robot. */
type State = { available: boolean; open: boolean; heroBotVisible: boolean };
let state: State = { available: false, open: false, heroBotVisible: false };
const subs = new Set<() => void>();

export const recruiter = {
  get: () => state,
  set(patch: Partial<State>) {
    state = { ...state, ...patch };
    subs.forEach((f) => f());
  },
  subscribe(f: () => void) {
    subs.add(f);
    return () => subs.delete(f);
  },
};

export function useRecruiter<T>(pick: (s: State) => T): T {
  return useSyncExternalStore(recruiter.subscribe, () => pick(state), () => pick(state));
}

/** True once a robot has already said hello in this visit, so the greeting isn't repeated. */
export function sessionGreeted() {
  try {
    return sessionStorage.getItem('ai-recruiter-greeted') === '1';
  } catch {
    return false;
  }
}
export function markGreeted() {
  try {
    sessionStorage.setItem('ai-recruiter-greeted', '1');
  } catch {
    /* storage unavailable */
  }
}
