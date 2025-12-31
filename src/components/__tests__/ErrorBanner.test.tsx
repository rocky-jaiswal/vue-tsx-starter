import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { nextTick } from 'vue';
import { ErrorBanner } from '../ErrorBanner';
import { useErrorStore } from '../../stores/errors';

describe('ErrorBanner', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render nothing when there are no errors', () => {
    const wrapper = mount(ErrorBanner);
    expect(wrapper.html()).toBe('');
  });

  it('should render error message when error is added', async () => {
    const wrapper = mount(ErrorBanner);
    const errors = useErrorStore();

    errors.push('Something went wrong');
    await nextTick();

    expect(wrapper.text()).toContain('Something went wrong');
    expect(wrapper.text()).toContain('Error');
  });

  it('should render error with status code', async () => {
    const wrapper = mount(ErrorBanner);
    const errors = useErrorStore();

    errors.push('Not found', 404);
    await nextTick();

    expect(wrapper.text()).toContain('Not found');
    expect(wrapper.text()).toContain('Error (404)');
  });

  it('should render multiple errors', async () => {
    const wrapper = mount(ErrorBanner);
    const errors = useErrorStore();

    errors.push('First error');
    errors.push('Second error', 500);
    await nextTick();

    expect(wrapper.text()).toContain('First error');
    expect(wrapper.text()).toContain('Second error');
    expect(wrapper.findAll('li')).toHaveLength(2);
  });

  it('should dismiss error when dismiss button is clicked', async () => {
    const wrapper = mount(ErrorBanner);
    const errors = useErrorStore();

    errors.push('Error to dismiss');
    await nextTick();

    expect(wrapper.text()).toContain('Error to dismiss');

    const dismissButton = wrapper.find('button');
    await dismissButton.trigger('click');
    await nextTick();

    expect(wrapper.html()).toBe('');
    expect(errors.list).toHaveLength(0);
  });

  it('should dismiss only the clicked error when multiple exist', async () => {
    const wrapper = mount(ErrorBanner);
    const errors = useErrorStore();

    errors.push('First error');
    errors.push('Second error');
    await nextTick();

    const dismissButtons = wrapper.findAll('button');
    expect(dismissButtons).toHaveLength(2);

    await dismissButtons[0].trigger('click');
    await nextTick();

    expect(wrapper.text()).not.toContain('First error');
    expect(wrapper.text()).toContain('Second error');
    expect(errors.list).toHaveLength(1);
  });
});
