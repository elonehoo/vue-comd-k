import { computed, Ref, ref, watchEffect } from 'vue'
import { ActionImpl, KBarState, KBarMatches, CompareFn } from '../types'
import { useThrottle } from '@vueuse/core'
import { matchSorter } from 'match-sorter'

export function useInternalMatches(state: Ref<KBarState>) {
  const matches = ref<KBarMatches>({
    results: [],
    rootActionId: null,
  });

  // rootActions are actions to be displayed
  const rootActions = computed(() => {
    const { actions, currentRootActionId } = state.value;
    const acts = [] as ActionImpl[];
    actions.forEach((act) => {
      if (!act.parent && !currentRootActionId) {
        acts.push(act);
      }
      if (act.id === currentRootActionId) {
        acts.push(...act.children);
      }
    });
    return acts;
  });

  // deepActions are actions to be searched
  const deepActions = computed(() => {
    if (!state.value.search) {
      return rootActions.value;
    }
    function collect(actions: ActionImpl[], all: ActionImpl[]): ActionImpl[] {
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        if (action.children.length > 0) {
          all.push(...action.children);
          collect(action.children, all);
        }
      }
      return all;
    }
    return collect(rootActions.value, [...rootActions.value]);
  });

  // searchOptions is the latest combination to be searched
  const searchOptions = computed(() => ({
    actions: deepActions.value,
    search: state.value.search,
    rootActionId: state.value.currentRootActionId,
    compare: state.value.options.compare,
  }));
  const throttledSearchOptions = useThrottle(searchOptions, 100);

  watchEffect(() => {
    const { actions, search, rootActionId, compare } =
      throttledSearchOptions.value;
    const results = performMatch(actions, search, compare);
    const grouped = groupMatches(results);
    matches.value.results = grouped;
    matches.value.rootActionId = rootActionId;
  });

  return matches;
}

function groupMatches(results: ActionImpl[]): KBarMatches["results"] {
  const map: Record<string, ActionImpl[]> = {};
  for (let i = 0; i < results.length; i++) {
    const action = results[i];
    const section = action.section || "";
    if (!map[section]) map[section] = [];
    map[section].push(action);
  }

  const grouped: KBarMatches["results"] = [];
  Object.keys(map).forEach((section) => {
    if (section) grouped.push(section);
    const actions = map[section];
    grouped.push(...actions);
  });
  return grouped;
}

function performMatch(
  actions: ActionImpl[],
  search: string,
  compare?: CompareFn
): ActionImpl[] {
  if (!search.trim()) {
    const results = actions.map((item, index) => ({ item, index }));
    if (compare) {
      results.sort(compare);
    }
    return results.map(({ item }) => item);
  }
  const words = search.split(/\s+/g);

  const results = words.reduce((items, word) => {
    return matchSorter(items, word, {
      keys: ["name", "keywords", "subtitle"],
      baseSort: compare,
    });
  }, actions);

  return results;
}
