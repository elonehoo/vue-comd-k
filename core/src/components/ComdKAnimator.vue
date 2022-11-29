<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { Ref, ref, watchEffect } from 'vue'
import { useComdKHandler,useComdKState } from '../composables'

const state = useComdKState()
const handler = useComdKHandler()

watchEffect(() => {
  const { visibility } = state.value;
  if (visibility === "entering") {
    requestAnimationFrame(() => {
      handler.value.setVisibility("visible");
    });
  }
  if (visibility === "leaving") {
    requestAnimationFrame(() => {
      handler.value.setVisibility("hidden");
    });
  }
});
const outerRef = ref<HTMLDivElement | null>(null);
useClickOutside(outerRef, () => {
  handler.value.hide();
})

function useClickOutside(
  domRef: Ref<HTMLElement | null>,
  cb: (e: Event) => void
) {
  const handler = (e: Event) => {
    if (domRef.value?.contains(e.target as any)) {
      return;
    }
    cb(e);
  };
  useEventListener("mousedown", handler, true);
  useEventListener("touchstart", handler, true);
}
</script>

<template>
  <div ref="outerRef" class="comd-k--animator comd-k-pointer-auto">
    <slot />
  </div>
</template>

<style scoped>
.comd-k-pointer-auto{
  pointer-events: auto;
}
</style>
