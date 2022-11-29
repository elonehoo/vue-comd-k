import { inject, onUnmounted, Ref } from 'vue'
import { ComdKEvents } from '../types'

export function useComdKEvents() {
  const events = inject<Ref<ComdKEvents>>("k-bar-events")!;

  return events;
}

type Register = ComdKEvents["on"];

export const useComdKEvent: Register = (event, callback) => {
  const events = useComdKEvents().value;
  const unregister = events.on(event, callback);
  onUnmounted(() => {
    unregister();
  });
  return unregister;
};

export const useComdKEventOnce: Register = (event, callback) => {
  const events = useComdKEvents().value;

  const unregister = events.once(event, callback);

  onUnmounted(() => {
    unregister;
  });
  return events.once(event, callback);
};
