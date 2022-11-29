import { useComdKHandler, useComdKMatches, useComdKState } from './index'

export function useComdK() {
  const state = useComdKState();
  const handler = useComdKHandler();
  const matches = useComdKMatches();

  return { state, handler, matches };
}
