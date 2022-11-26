<script setup lang="ts">
import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'vue-comd-k/src'
</script>

<template>
  <KBarProvider>
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator>
          <KBarSearch />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>

    <h2>Example</h2>
  </KBarProvider>
</template>
