import KBarProvider from "./components/KBarProvider";
import KBarPortal from "./components/KBarPortal.vue";
import KBarPositioner from "./components/KBarPositioner.vue";
import KBarAnimator from "./components/KBarAnimator.vue";
import KBarSearch from "./components/KBarSearch.vue";
import KBarResults from "./components/KBarResults.vue";
import { useKBarState, useKBarHandler, useKBarMatches, useKBar, useRegisterActions, useKBarEvents, useKBarEvent, useKBarEventOnce } from "./composables";
import { defineAction } from "./action";

// for legacy compatibility
const createAction = defineAction;

export * from "./types";
export {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useKBarState,
  useKBarHandler,
  useKBarMatches,
  useKBar,
  useRegisterActions,
  useKBarEvents,
  useKBarEvent,
  useKBarEventOnce,
  defineAction,
  createAction,
};
