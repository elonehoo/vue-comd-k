<script setup lang="ts">
</script>

<template>
    <div class="positioner">
    <slot />
  </div>
</template>

<style scoped>
.positioner{
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  inset: 0;
  padding: 14vh 16px 16px;
}
</style>
