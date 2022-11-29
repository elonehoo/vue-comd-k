import { defineComponent, provide, h, PropType, watch, computed } from 'vue'
import { Action, ComdKOptions } from '../types'
import { InternalEvents } from '../InternalEvents'
import { useInternalState } from '../composables'

export const DEFAULT_OPTIONS: ComdKOptions = {
  placeholder: "Type a command or search…",
  disabled: false,
};

export default defineComponent({
  name: "ComdKProvider",
  props: {
    options: {
      type: Object as PropType<Partial<ComdKOptions>>,
      default: () => DEFAULT_OPTIONS,
    },
    actions: {
      type: Array as PropType<Action[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { state, handler, matches, events } = useInternalState(
      {
        ...DEFAULT_OPTIONS,
        ...props.options,
      },
      computed(() => props.actions)
    );

    watch(
      () => props.options,
      () => {
        handler.value.setOptions({
          ...DEFAULT_OPTIONS,
          ...props.options,
        });
      },
      { deep: true }
    );

    provide("k-bar-state", state);
    provide("k-bar-handler", handler);
    provide("k-bar-matches", matches);
    provide("k-bar-events", events);
  },
  render() {
    return [this.$slots.default?.(), h(InternalEvents)];
  },
});
