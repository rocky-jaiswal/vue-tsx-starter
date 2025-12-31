import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import type { User } from '../stores/auth';

export function useAuth() {
  const store = useAuthStore();

  // Computed properties for reactive state
  const user = computed(() => store.user);
  const token = computed(() => store.token);
  const isAuthenticated = computed(() => store.isAuthenticated);

  // Actions
  const hydrateFromStorage = async (): Promise<boolean> => {
    return await store.hydrateFromStorage();
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    return await store.login(email, password);
  };

  const logout = async (): Promise<void> => {
    await store.logout();
  };

  const clear = (): void => {
    store.clear();
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    // Actions
    hydrateFromStorage,
    login,
    logout,
    clear,
  };
}

export type { User };
