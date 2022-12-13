<script setup lang="ts">
import { ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
import slug from 'slug'
import { storeToRefs } from 'pinia'
import { ComdKProvider, ComdKPortal, ComdKPositioner, ComdKAnimator, ComdKSearch, defineAction } from 'vue-comd-k'
import { useStore } from '../store'
import RenderResults from './RenderResults.vue'
import DarkModeButton from './DarkModeButton.vue'
import { useDark, useToggle } from '@vueuse/core'

const { Layout } = DefaultTheme;

const store = useStore();
const isDark = useDark()
const toggleDark = useToggle(isDark)

const initialActions = ref([
  defineAction({
    id: "ComdK.navigation.github",
    name: "GitHub",
    shortcut: ["g", "h"],
    keywords: "sourcecode",
    section: "Navigation",
    perform: () => {
      window.open("https://github.com/elonehoo/vue-comd-k", "_blank")
    }
  }),
  defineAction({
    id:'ComdK.theme.dark',
    name:'Dark / Light',
    shortcut: ["d", "l"],
    keywords: "sourcecode",
    section:'theme',
    perform:()=>{
      toggleDark()
    }
  }),
]);

const { disabled } = storeToRefs(store);
const compareAction = (a, b) => {
  const ar = getActionRankingById(a.item);
  const br = getActionRankingById(b.item);
  // Sort by original index if they have same ranks.
  if (ar === br) return a.index - b.index;
  // Otherwise sort by ranking.
  return ar - br;
};

const ACTION_RANKINGS = [
  "ComdK.debug.",
  "ComdK.example.",
  "ComdK.navigation.",
  "ComdK.documentation.",
  "ComdK.preferences.",
];

function getActionRankingById(action) {
  const rank = ACTION_RANKINGS.findIndex((prefix) =>
    action.id.startsWith(prefix)
  );
  // non-specified namespaces should always rank behind specified ones.
  if (rank < 0) return Infinity;
  return rank;
}
</script>

<template>
  <ComdKProvider
    :actions="initialActions"
    :options="{ disabled, compare: compareAction }"
  >
    <ComdKPortal>
      <ComdKPositioner  style="z-index: 1000;">
        <ComdKAnimator
          style="
            max-width: calc(75 * var(--unit));
            width: 100%;
            background: var(--background);
            color: var(--foreground);
            border-radius: var(--unit);
            overflow: hidden;
            box-shadow: var(--shadow);
          "
        >
          <ComdKSearch
            style="
              padding: calc(2 * var(--unit)) calc(2 * var(--unit));
              font-size: calc(2 * var(--unit));
              width: 100%;
              box-sizing: border-box;
              outline: none;
              border: none;
              background: var(--background);
              color: var(--foreground);
            "
          />
          <RenderResults />
        </ComdKAnimator>
      </ComdKPositioner>
    </ComdKPortal>

    <Layout>
    </Layout>
  </ComdKProvider>
</template>
