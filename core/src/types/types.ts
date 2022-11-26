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

type ActionImpl = Action & {
  children: ActionImpl[];
};

export type ActionTree = ActionImpl[];

export type VisualState = "entering" | "visible" | "leaving" | "hidden";

export interface KBarState {
  search: string;
  actions: ActionTree;
  // used when dived into action groups
  currentRootActionId: ActionId | null;
  activeIndex: number;
  visibility: VisualState;
}

export type VisualStateUpdateCallback = (vs: VisualState) => VisualState;

export interface KBarHandler {
  setSearch: (search: string) => void;
  // returns a function to unregister
  registerActions: (actions: Action[]) => () => void;
  setCurrentRootAction: (actionId: ActionId | null) => void;
  // set visibility programmatically
  setVisibility: (cb: VisualStateUpdateCallback | VisualState) => void;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}


export interface KBarMatches {
  // string for section title
  results: (string | Action)[];
  rootActionId: string | null;
}

export interface KBarOptions {}
