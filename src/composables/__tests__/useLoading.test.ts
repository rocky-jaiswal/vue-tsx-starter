import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useLoading } from '../useLoading';

describe('useLoading', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should not be loading initially', () => {
    const { isLoading } = useLoading();
    expect(isLoading.value).toBe(false);
  });

  it('should start loading', () => {
    const { isLoading, startLoading } = useLoading();

    startLoading('test');
    expect(isLoading.value).toBe(true);
  });

  it('should stop loading', () => {
    const { isLoading, startLoading, stopLoading } = useLoading();

    startLoading('test');
    expect(isLoading.value).toBe(true);

    stopLoading('test');
    expect(isLoading.value).toBe(false);
  });

  it('should track multiple loading keys', () => {
    const { isLoading, startLoading, stopLoading } = useLoading();

    startLoading('key1');
    startLoading('key2');
    expect(isLoading.value).toBe(true);

    stopLoading('key1');
    expect(isLoading.value).toBe(true); // Still loading key2

    stopLoading('key2');
    expect(isLoading.value).toBe(false);
  });

  it('should check if specific key is loading', () => {
    const { isLoadingKey, startLoading } = useLoading();

    expect(isLoadingKey('test')).toBe(false);

    startLoading('test');
    expect(isLoadingKey('test')).toBe(true);
  });

  it('should work with withLoading helper', async () => {
    const { isLoading, withLoading } = useLoading();

    expect(isLoading.value).toBe(false);

    const promise = withLoading('test', async () => {
      expect(isLoading.value).toBe(true);
      return 'result';
    });

    const result = await promise;
    expect(result).toBe('result');
    expect(isLoading.value).toBe(false);
  });

  it('should stop loading even if async function throws', async () => {
    const { isLoading, withLoading } = useLoading();

    try {
      await withLoading('test', async () => {
        throw new Error('Test error');
      });
    } catch (e) {
      // Expected error
    }

    expect(isLoading.value).toBe(false);
  });

  it('should use default key when not provided', () => {
    const { isLoadingKey, startLoading, stopLoading } = useLoading();

    startLoading();
    expect(isLoadingKey('default')).toBe(true);

    stopLoading();
    expect(isLoadingKey('default')).toBe(false);
  });

  it('should work with withLoading without key', async () => {
    const { isLoading, withLoading } = useLoading();

    await withLoading(async () => {
      expect(isLoading.value).toBe(true);
      return 'result';
    });

    expect(isLoading.value).toBe(false);
  });
});
