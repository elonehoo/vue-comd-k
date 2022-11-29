import ComdKProvider from "./components/ComdKProvider";
import ComdKPortal from "./components/ComdKPortal.vue";
import ComdKPositioner from "./components/ComdKPositioner.vue";
import ComdKAnimator from "./components/ComdKAnimator.vue";
import ComdKSearch from "./components/ComdKSearch.vue";
import ComdKResults from "./components/ComdKResults.vue";
import { useComdKState, useComdKHandler, useComdKMatches, useComdK, useRegisterActions, useComdKEvents, useComdKEvent, useComdKEventOnce } from "./composables";
import { defineAction } from "./action";

// for legacy compatibility
const createAction = defineAction;

export * from "./types";
export {
  ComdKProvider,
  ComdKPortal,
  ComdKPositioner,
  ComdKAnimator,
  ComdKSearch,
  ComdKResults,
  useComdKState,
  useComdKHandler,
  useComdKMatches,
  useComdK,
  useRegisterActions,
  useComdKEvents,
  useComdKEvent,
  useComdKEventOnce,
  defineAction,
  createAction,
};
