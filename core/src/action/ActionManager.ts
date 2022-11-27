import invariant from 'tiny-invariant'
import { Action, ActionId, ActionImpl } from '../types'

export class ActionManager {
  actions: ActionImpl[];
  map: Map<ActionId, ActionImpl>;

  constructor() {
    this.actions = [];
    this.map = new Map();
  }

  add(actions: Action[], prepend = false) {
    const impls: ActionImpl[] = [];
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.parent) {
        invariant(
          this.map.has(action.parent),
          `Attempted to create action "${action.name}" without registering its parent "${action.parent}" first.`
        );
      }
      if (this.map.has(action.id)) {
        this._updateAction(action);
        continue;
      }

      impls.push(this._createActionImpl(action));
    }
    if (prepend) this.actions.unshift(...impls);
    else this.actions.push(...impls);
    return [...this.actions];
  }

  remove(actionIds: ActionId[]) {
    for (let i = 0; i < actionIds.length; i++) {
      const id = actionIds[i];
      const action = this.map.get(id);
      if (!action) continue;
      this._removeActionImpl(action.id);
      this.remove(action.children.map((child) => child.id));
      if (action.parent) {
        const parent = this.map.get(action.parent)!;
        if (!parent) {
          console.warn(`Missing parent "${action.parent}".`);
          continue;
        }
        this._removeChild(parent, action.id);
      }
    }
    return [...this.actions];
  }

  _updateAction(action: Action) {
    const impl = this.map.get(action.id);
    if (!impl) return;
    Object.assign(impl, action);
  }

  _createActionImpl(action: Action): ActionImpl {
    const impl: ActionImpl = {
      ...EMPTY_ACTION,
      ...action,
      children: [],
    };
    if (action.parent) {
      const parent = this.map.get(action.parent)!;
      parent.children.push(impl);
    }
    this.map.set(impl.id, impl);
    return impl;
  }

  _removeActionImpl(id: ActionId): void {
    const index = this.actions.findIndex((act) => act.id === id);
    if (index >= 0) {
      this.actions.splice(index, 1);
    }
    this.map.delete(id);
  }

  _removeChild(parent: ActionImpl, childId: ActionId): void {
    const index = parent.children.findIndex((child) => child.id === childId);
    if (index >= 0) {
      this.actions.splice(index, 1);
    }
  }
}

const EMPTY_ACTION: Partial<Action> = {
  shortcut: [],
};
