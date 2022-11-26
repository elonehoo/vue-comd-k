import { inject, Ref } from 'vue';
import { KBarState } from '../types/types';

export function useKBarState() {
  const state = inject<Ref<KBarState>>("k-bar-state")!;

  return state;
}
