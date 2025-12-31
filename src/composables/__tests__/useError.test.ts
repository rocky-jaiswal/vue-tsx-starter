import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useError } from '../useError';

describe('useError', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should return initial state with empty errors', () => {
    const { errors, hasErrors } = useError();

    expect(errors.value).toEqual([]);
    expect(hasErrors.value).toBe(false);
  });

  it('should push a new error', () => {
    const { errors, push } = useError();

    push('Test error');

    expect(errors.value).toHaveLength(1);
    expect(errors.value[0].message).toBe('Test error');
    expect(errors.value[0].id).toBeDefined();
  });

  it('should push error with status code', () => {
    const { errors, push } = useError();

    push('Not found', 404);

    expect(errors.value).toHaveLength(1);
    expect(errors.value[0].message).toBe('Not found');
    expect(errors.value[0].status).toBe(404);
  });

  it('should update hasErrors when errors exist', () => {
    const { hasErrors, push } = useError();

    expect(hasErrors.value).toBe(false);

    push('Error');

    expect(hasErrors.value).toBe(true);
  });

  it('should remove error by id', () => {
    const { errors, push, remove } = useError();

    push('Error 1');
    push('Error 2');

    expect(errors.value).toHaveLength(2);

    const firstErrorId = errors.value[0].id;
    remove(firstErrorId);

    expect(errors.value).toHaveLength(1);
    expect(errors.value[0].message).toBe('Error 2');
  });

  it('should clear all errors', () => {
    const { errors, hasErrors, push, clear } = useError();

    push('Error 1');
    push('Error 2');
    push('Error 3');

    expect(errors.value).toHaveLength(3);
    expect(hasErrors.value).toBe(true);

    clear();

    expect(errors.value).toHaveLength(0);
    expect(hasErrors.value).toBe(false);
  });

  it('should have reactive computed properties', () => {
    const { errors, push } = useError();

    // Initially empty
    expect(errors.value).toEqual([]);

    // Add error
    push('New error');

    // Should reactively update
    expect(errors.value).toHaveLength(1);
  });

  it('should handle multiple composable instances sharing state', () => {
    const instance1 = useError();
    const instance2 = useError();

    instance1.push('Error from instance 1');

    expect(instance1.errors.value).toHaveLength(1);
    expect(instance2.errors.value).toHaveLength(1);
    expect(instance1.errors.value[0].message).toBe(instance2.errors.value[0].message);
  });
});
