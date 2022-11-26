<script setup lang="ts">
import { ref } from 'vue'
import KBarLayout from './components/KBarLayout.vue'
const msg = ref('Example')
</script>

<template>
  <div>
    <KBarLayout />
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>

</style>
