<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useKBarState } from '../composables'

const state = useKBarState()

const input = ref<HTMLInputElement | null>(null)

watchEffect(() => {
  if (state.value.visibility === "visible") {
    input.value && input.value.focus()
  }
})

const search = ref(state.value.search)
</script>

<template>
  <input
    ref="input"
    auto-focus
    auto-complete="off"
    role="combobox"
    spell-check="false"
    :value="search"
  />
</template>
