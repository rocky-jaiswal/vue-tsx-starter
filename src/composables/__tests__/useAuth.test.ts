import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuth } from '../useAuth';

// Mock the API
vi.mock('../../plugins/fetch', () => ({
  api: vi.fn(),
}));

describe('useAuth', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('should return initial state', () => {
    const { user, token, isAuthenticated } = useAuth();

    expect(user.value).toBeNull();
    expect(token.value).toBeNull();
    expect(isAuthenticated.value).toBe(false);
  });

  it('should expose login function', () => {
    const { login } = useAuth();
    expect(typeof login).toBe('function');
  });

  it('should expose logout function', () => {
    const { logout } = useAuth();
    expect(typeof logout).toBe('function');
  });

  it('should expose clear function', () => {
    const { clear } = useAuth();
    expect(typeof clear).toBe('function');
  });

  it('should update state after clear', () => {
    const { clear, user, token, isAuthenticated } = useAuth();

    clear();

    expect(user.value).toBeNull();
    expect(token.value).toBeNull();
    expect(isAuthenticated.value).toBe(false);
  });

  it('should have reactive computed properties', () => {
    const { user, token, isAuthenticated } = useAuth();

    // All should be computed refs
    expect(user.value).toBeDefined();
    expect(token.value).toBeDefined();
    expect(isAuthenticated.value).toBeDefined();
  });
});
