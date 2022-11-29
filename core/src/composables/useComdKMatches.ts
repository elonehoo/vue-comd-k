import { inject, Ref } from 'vue';
import { ComdKMatches } from '../types';

export function useComdKMatches() {
  const matches = inject<Ref<ComdKMatches>>("k-bar-matches")!;

  return matches;
}
