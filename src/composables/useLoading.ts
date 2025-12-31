import { computed } from "vue";
import { useLoadingStore } from "../stores/loading";

/**
 * Composable for tracking and managing loading states
 *
 * @example
 * ```tsx
 * const { isLoading, startLoading, stopLoading } = useLoading()
 *
 * // Manual control
 * startLoading('user-fetch')
 * await fetchUser()
 * stopLoading('user-fetch')
 *
 * // Or use the helper
 * await withLoading('user-fetch', async () => {
 *   await fetchUser()
 * })
 * ```
 */
export function useLoading() {
  const store = useLoadingStore();

  /**
   * Check if any loading operation is in progress
   */
  const isLoading = computed(() => store.isLoading);

  /**
   * Check if a specific operation is loading
   */
  const isLoadingKey = (key: string) => store.hasKey(key);

  /**
   * Start a loading operation
   */
  const startLoading = (key: string = 'default') => {
    store.start(key);
  };

  /**
   * Stop a loading operation
   */
  const stopLoading = (key: string = 'default') => {
    store.stop(key);
  };

  /**
   * Execute an async function with automatic loading state
   */
  const withLoading = async <T>(
    keyOrFn: string | (() => Promise<T>),
    fn?: () => Promise<T>
  ): Promise<T> => {
    let key: string;
    let callback: () => Promise<T>;

    if (typeof keyOrFn === 'function') {
      key = 'default';
      callback = keyOrFn;
    } else {
      key = keyOrFn;
      callback = fn!;
    }

    startLoading(key);
    try {
      return await callback();
    } finally {
      stopLoading(key);
    }
  };

  return {
    isLoading,
    isLoadingKey,
    startLoading,
    stopLoading,
    withLoading,
  };
}
