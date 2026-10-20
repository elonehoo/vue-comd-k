<script setup lang="ts">
import { ComdKAnimator, ComdKPortal, ComdKPositioner, ComdKProvider, ComdKSearch } from 'vue-comd-k'
</script>

<template>
  <ComdKProvider>
    <ComdKPortal>
      <ComdKPositioner>
        <ComdKAnimator>
          <ComdKSearch />
        </ComdKAnimator>
      </ComdKPositioner>
    </ComdKPortal>
  </ComdKProvider>
</template>
