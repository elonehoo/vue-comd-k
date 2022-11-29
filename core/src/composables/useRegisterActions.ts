import { onUnmounted, ref, shallowRef, watchEffect } from 'vue'
import { Action, MaybeRef } from '../types'
import { useComdKHandler } from './useComdKHandler'

export function useRegisterActions(
  actions: MaybeRef<Action[]>,
  prepend = false
): () => void {
  const source = shallowRef(actions);
  const unregister = ref<() => void>();
  const handler = useComdKHandler();
  watchEffect(() => {
    unregister.value?.();

    unregister.value = handler.value.registerActions(source.value, prepend);
  });

  onUnmounted(() => {
    unregister.value?.();
  });

  return unregister.value || noop;
}

function noop() {
  // noop
}
