import { config } from '@vue/test-utils';

// Configure Vue Test Utils globally
config.global.stubs = {
  RouterLink: true,
  RouterView: true,
};
