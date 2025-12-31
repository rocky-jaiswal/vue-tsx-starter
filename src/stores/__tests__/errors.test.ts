import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useErrorStore } from '../errors';

describe('useErrorStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with empty error list', () => {
    const store = useErrorStore();
    expect(store.list).toEqual([]);
  });

  it('should add error to list', () => {
    const store = useErrorStore();
    store.push('Test error');

    expect(store.list).toHaveLength(1);
    expect(store.list[0].message).toBe('Test error');
    expect(store.list[0].id).toBeDefined();
  });

  it('should add error with status code', () => {
    const store = useErrorStore();
    store.push('Server error', 500);

    expect(store.list).toHaveLength(1);
    expect(store.list[0].message).toBe('Server error');
    expect(store.list[0].status).toBe(500);
  });

  it('should add multiple errors with unique IDs', () => {
    const store = useErrorStore();
    store.push('First error');
    store.push('Second error');

    expect(store.list).toHaveLength(2);
    expect(store.list[0].id).not.toBe(store.list[1].id);
  });

  it('should remove error by ID', () => {
    const store = useErrorStore();
    store.push('Error 1');
    store.push('Error 2');
    store.push('Error 3');

    const idToRemove = store.list[1].id;
    store.remove(idToRemove);

    expect(store.list).toHaveLength(2);
    expect(store.list.find(e => e.id === idToRemove)).toBeUndefined();
  });

  it('should clear all errors', () => {
    const store = useErrorStore();
    store.push('Error 1');
    store.push('Error 2');
    store.push('Error 3');

    expect(store.list).toHaveLength(3);

    store.clear();

    expect(store.list).toEqual([]);
  });
});
