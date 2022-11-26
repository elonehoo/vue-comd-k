<script setup lang="ts">
import { computed } from 'vue'
import { useKBarState } from '../composables'

const state = useKBarState()

const visible = computed(() => state.value.visibility !== "hidden")
</script>

<template>
  <teleport to="body">
    <template v-if="visible">
      <slot />
    </template>
  </teleport>
</template>
