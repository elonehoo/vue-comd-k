<script setup lang="ts">
import { useComdKMatches, ComdKResults } from 'vue-comd-k'

const matches = useComdKMatches();
const itemHeight = (params: { item: any; index: number }) => {
  if (typeof params.item === "string") return 32;
  return 60;
};

</script>

<template>
  <ComdKResults
    :items="matches.results"
    :item-height="itemHeight"
    :style="{ 'max-height': '300px', overflow: 'auto' }"
  >
    <template #item="{ item, index, active }">
      <div v-if="typeof item === 'string'" class="section" :data-index="index">
        {{ item }}
      </div>
      <div v-else class="item" :class="{ active }" :data-index="index">
        <div class="item-inner">
          <div style="display: flex; flex-direction: column">
            <div>
              <span>{{ item.name }}</span>
            </div>
            <span v-if="item.subtitle" style="font-size: 12px">{{
              item.subtitle
            }}</span>
          </div>
        </div>
        <div v-if="item.shortcut.length > 0" aria-hidden class="shortcut">
          <kbd v-for="(sc, j) in item.shortcut" :key="j">{{ sc }}</kbd>
        </div>
      </div>
    </template>
  </ComdKResults>
</template>

<style scoped>
.section {
  height: 32px;
  padding: 8px 16px;
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.8;
  background-color: var(--a2);
}
.item {
  height: 60px;
  box-sizing: border-box;
  padding: 12px 16px;
  background: transparent;
  border-left: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.item.active {
  background: var(--a1);
  border-left-color: var(--foreground);
}
.item-inner {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}
.shortcut {
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
}
</style>
