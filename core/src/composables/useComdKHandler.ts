import { inject, Ref } from "vue";
import { ComdKHandler } from "../types";

export function useComdKHandler() {
  const handler = inject<Ref<ComdKHandler>>("k-bar-handler")!;

  return handler;
}
