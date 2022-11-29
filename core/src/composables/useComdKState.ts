import { inject, Ref } from 'vue';
import { ComdKState } from '../types';

export function useComdKState() {
  const state = inject<Ref<ComdKState>>("k-bar-state")!;

  return state;
}
