<script setup lang="ts">
import { watchEffect } from 'vue';
import { useKBarState } from '../composables'

const state = useKBarState();

watchEffect(() => {
  const { visibility } = state.value;
  if (visibility === "entering") {
    requestAnimationFrame(() => {
      state.value.visibility = "visible";
    });
  }
  if (visibility === "leaving") {
    requestAnimationFrame(() => {
      state.value.visibility = "hidden";
    });
  }
});
</script>

<template>
  <slot />
</template>
