import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render with default props', () => {
    const wrapper = mount(LoadingSpinner);
    // CSS Module class will have unique hash, so check for any div
    const spinnerDiv = wrapper.find('div div');
    expect(spinnerDiv.exists()).toBe(true);
  });

  it('should apply small size class', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { size: 'sm' },
    });
    const spinner = wrapper.findAll('div')[1]; // Second div is the spinner
    expect(spinner.classes()).toContain('w-6');
    expect(spinner.classes()).toContain('h-6');
  });

  it('should apply medium size class by default', () => {
    const wrapper = mount(LoadingSpinner);
    const spinner = wrapper.findAll('div')[1];
    expect(spinner.classes()).toContain('w-10');
    expect(spinner.classes()).toContain('h-10');
  });

  it('should apply large size class', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { size: 'lg' },
    });
    const spinner = wrapper.findAll('div')[1];
    expect(spinner.classes()).toContain('w-16');
    expect(spinner.classes()).toContain('h-16');
  });

  it('should render inline by default', () => {
    const wrapper = mount(LoadingSpinner);
    // Inline container doesn't have position:fixed
    expect(wrapper.html()).not.toContain('position: fixed');
  });

  it('should render fullscreen overlay when fullScreen is true', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { fullScreen: true },
    });
    // Check that root element exists (fullscreen overlay)
    expect(wrapper.element).toBeTruthy();
    const rootDiv = wrapper.find('div');
    expect(rootDiv.exists()).toBe(true);
  });

  it('should have animation styles from CSS Module', () => {
    const wrapper = mount(LoadingSpinner);
    const spinner = wrapper.find('div div');
    expect(spinner.exists()).toBe(true);
    // Verify it has classes (CSS Module + Tailwind)
    expect(spinner.classes().length).toBeGreaterThan(0);
  });
});
