import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    // Set of active loading keys
    activeKeys: new Set<string>(),
  }),
  getters: {
    /**
     * Check if any loading operation is active
     */
    isLoading: (state) => state.activeKeys.size > 0,

    /**
     * Get count of active loading operations
     */
    count: (state) => state.activeKeys.size,
  },
  actions: {
    /**
     * Start a loading operation with a unique key
     */
    start(key: string) {
      this.activeKeys.add(key);
    },

    /**
     * Stop a loading operation
     */
    stop(key: string) {
      this.activeKeys.delete(key);
    },

    /**
     * Check if a specific key is loading
     */
    hasKey(key: string): boolean {
      return this.activeKeys.has(key);
    },

    /**
     * Clear all loading states
     */
    clear() {
      this.activeKeys.clear();
    },
  },
});
