import { useEventListener } from '@vueuse/core'
import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { useComdKHandler, useComdKState } from "./composables"

export const InternalEvents = defineComponent({
  name: "ComdKInternalEvents",
  setup() {
    onMounted(() => {
      useToggleHandler();
      useFocusHandler();
      useDocumentLock();
      useShortcuts();
    });
  },
  render() {
    return null;
  },
});

function useToggleHandler() {
  const state = useComdKState();
  const handler = useComdKHandler();

  useEventListener("keydown", (e) => {
    if (state.value.options.disabled) {
      return;
    }

    const showing = state.value.visibility !== "hidden";
    if (
      (e.metaKey || e.ctrlKey) &&
      e.key === "k" &&
      e.defaultPrevented === false
    ) {
      e.preventDefault();
      handler.value.toggle();

      if (showing) {
        // options.callbacks?.onClose?.();
      } else {
        // options.callbacks?.onOpen?.();
      }
    }
    if (e.key === "Escape") {
      if (showing) {
        e.stopPropagation();
        // options.callbacks?.onClose?.();
      }
      handler.value.hide();
    }
  });

  watchEffect(() => {
    const { visibility } = state.value;
    if (visibility === "entering" || visibility === "hidden") {
      handler.value.setCurrentRootAction(null);
    }
  });
}

function useFocusHandler() {
  const state = useComdKState();

  const activeElement = ref<HTMLElement | null>(null);

  watchEffect(() => {
    if (
      state.value.visibility === "visible" ||
      state.value.visibility === "entering"
    ) {
      activeElement.value = document.activeElement as HTMLElement;
      return;
    }

    if (activeElement.value) {
      activeElement.value.focus();
    }
  });
}

/**
 * `useDocumentLock` is a simple implementation for preventing the
 * underlying page content from scrolling when ComdK is open.
 */
function useDocumentLock() {
  const state = useComdKState();

  watchEffect(() => {
    const { visibility } = state.value;
    if (visibility === "entering") {
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    } else if (visibility === "hidden") {
      document.body.style.removeProperty("pointer-events");
      document.body.style.removeProperty("overflow");
    }
  });
}

/**
 * `useShortcuts` registers and listens to keyboard strokes and
 * performs actions for patterns that match the user defined `shortcut`.
 */
function useShortcuts() {
  const state = useComdKState();
  const handler = useComdKHandler();

  const buffer: string[] = [];
  let lastKeyStrokeTime = 0;

  useEventListener("keydown", (event) => {
    if (state.value.options.disabled) {
      return;
    }

    const key = event.key?.toLowerCase();

    if (shouldRejectKeystrokes() || event.metaKey || key === "shift") {
      return;
    }

    const currentTime = Date.now();

    if (currentTime - lastKeyStrokeTime > 400) {
      buffer.length = 0;
    }

    buffer.push(key);
    lastKeyStrokeTime = currentTime;
    const bufferString = buffer.join("");

    const { actions } = state.value;
    const action = actions.find((action:any) => {
      if (!action.shortcut || action.shortcut.length === 0) {
        return false;
      }
      return action.shortcut.join("") === bufferString;
    });
    if (action) {
      event.preventDefault();
      handler.value.performAction(action);
      buffer.length = 0;
    }
  });

  watch(
    () => state.value.actions,
    () => {
      buffer.length = 0;
    }
  );
}

function shouldRejectKeystrokes(
  {
    ignoreWhenFocused,
  }: {
    ignoreWhenFocused: string[];
  } = { ignoreWhenFocused: [] }
) {
  const inputs = ["input", "textarea", ...ignoreWhenFocused].map((el) =>
    el.toLowerCase()
  );

  const activeElement = document.activeElement;
  const ignoreStrokes =
    activeElement &&
    (inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1 ||
      activeElement.attributes.getNamedItem("role")?.value === "textbox" ||
      activeElement.attributes.getNamedItem("contenteditable")?.value ===
        "true");

  return ignoreStrokes;
}
