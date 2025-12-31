import { computed } from 'vue';
import { useErrorStore, type AppError } from '../stores/errors';

export type { AppError };

export function useError() {
  const store = useErrorStore();

  // Computed properties for reactive state
  const errors = computed(() => store.list);
  const hasErrors = computed(() => store.list.length > 0);

  // Actions
  const push = (message: string, status?: number): void => {
    store.push(message, status);
  };

  const remove = (id: number): void => {
    store.remove(id);
  };

  const clear = (): void => {
    store.clear();
  };

  return {
    // State
    errors,
    hasErrors,
    // Actions
    push,
    remove,
    clear,
  };
}
