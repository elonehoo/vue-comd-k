import { Ref } from "vue";
import { EventEmitter } from "../EventEmitter";

export type MaybeRef<T> = T | Ref<T>;

export type ActionId = string;

export interface Action<T = any> {
  id: ActionId;
  // optional global shortcut. e.g.['g', 'h'] go to '/home'
  shortcut?: string[];
  // keywords separated by whitespace
  keywords?: string;
  name: string;
  subtitle?: string;
  section?: string;
  // can be used for custom rendering and performing.
  data?: T;
  perform?: (currentAction: Action) => any | Promise<any>;
  parent?: ActionId;
}

// internal type of Action
// to organize actions as a tree
export type ActionImpl = Action & {
  children: ActionImpl[];
};

export type ActionTree = ActionImpl[];

export type VisualState = "entering" | "visible" | "leaving" | "hidden";

export interface KBarState {
  options: KBarOptions;
  search: string;
  actions: ActionTree;
  // used when dived into action groups
  currentRootActionId: ActionId | null | undefined;
  activeIndex: number;
  visibility: VisualState;
}

export type UpdateCallback<T> = (curr: T) => T;

export interface KBarHandler {
  setOptions: (options: KBarOptions) => void;
  setSearch: (search: string) => void;
  // returns a function to unregister
  registerActions: (actions: Action[], prepend?: boolean) => () => void;
  setCurrentRootAction: (actionId: ActionId | null | undefined) => void;
  setActiveIndex: (cb: UpdateCallback<number> | number) => void;
  // set visibility programmatically
  setVisibility: (cb: UpdateCallback<VisualState> | VisualState) => void;
  toggle: () => void;
  show: () => void;
  hide: () => void;
  performAction: (action: ActionImpl) => void;
}

export interface KBarMatches {
  // string for section title
  results: (string | ActionImpl)[];
  rootActionId: string | null | undefined;
}

export type IndexedItem<T> = {
  index: number;
  item: T;
};

export type CompareFn = (
  a: IndexedItem<ActionImpl>,
  b: IndexedItem<ActionImpl>
) => number;

export interface KBarOptions {
  placeholder?: string;
  disabled?: boolean;
  compare?: CompareFn;
}

export type KBarEventsMap = {
  open: undefined;
  close: undefined;
  queryChange: string;
  selectAction: ActionImpl;
  performAction: ActionImpl;
};

export type KBarEvents = EventEmitter<KBarEventsMap>;
