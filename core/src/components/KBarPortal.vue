<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { computed } from 'vue'
import { useKBarState } from '../composables'

const state = useKBarState();
const mounted = useMounted();
const visible = computed(() => state.value.visibility !== "hidden");

</script>

<template>
  <teleport v-if="mounted" to="body">
    <template v-if="visible">
      <slot />
    </template>
  </teleport>
</template>
