import { inject, Ref } from 'vue';
import { KBarMatches } from '../types/types';

export function useKBarMatches() {
  const matches = inject<Ref<KBarMatches>>("k-bar-matches")!;

  return matches;
}
