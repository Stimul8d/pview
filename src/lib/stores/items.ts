import { writable, derived } from 'svelte/store';

export interface PViewItem {
  id: string;
  title: string;
  image?: string;
  metadata: Record<string, unknown>;
}

interface PViewState {
  items: PViewItem[];
  view: 'grid' | 'chart';
  filters: Record<string, unknown>;
  selected?: string;
}

const createPViewStore = () => {
  const { subscribe, set, update } = writable<PViewState>({
    items: [],
    view: 'grid',
    filters: {},
  });

  // Filter items based on metadata matches
  const filtered = derived({ subscribe }, $state => {
    return $state.items.filter(item => {
      return Object.entries($state.filters).every(([key, value]) => {
        return item.metadata[key] === value;
      });
    });
  });

  return {
    subscribe,
    filtered,
    setItems: (items: PViewItem[]) => update(state => ({ ...state, items })),
    setView: (view: PViewState['view']) => update(state => ({ ...state, view })),
    setFilters: (filters: Record<string, unknown>) => 
      update(state => ({ ...state, filters })),
    getFilters: () => {
      let state: PViewState;
      subscribe(s => state = s)();
      return state.filters;
    },
    select: (id: string) => update(state => ({ ...state, selected: id })),
  };
};

export const pview = createPViewStore();