import { useKBarHandler, useKBarMatches, useKBarState } from './index'

export function useKBar() {
  const state = useKBarState();
  const handler = useKBarHandler();
  const matches = useKBarMatches();

  return { state, handler, matches };
}
