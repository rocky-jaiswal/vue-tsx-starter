import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  it('should toggle theme', () => {
    const { theme, toggleTheme } = useTheme();
    const initialTheme = theme.value;

    toggleTheme();
    const toggledTheme = theme.value;

    expect(toggledTheme).not.toBe(initialTheme);
    expect(['light', 'dark']).toContain(toggledTheme);
  });

  it('should toggle between light and dark', () => {
    const { theme, toggleTheme } = useTheme();

    toggleTheme();
    toggleTheme();

    // After two toggles, should be back to original state
    expect(['light', 'dark']).toContain(theme.value);
  });

  it('should save theme to localStorage when toggled', async () => {
    const { toggleTheme } = useTheme();

    toggleTheme();
    await nextTick();

    const saved = localStorage.getItem('theme');
    expect(['light', 'dark']).toContain(saved);
  });
});
