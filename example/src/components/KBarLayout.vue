<script setup lang="ts">
import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'vue-comd-k'
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
  </KBarProvider>
</template>
