# Vue 3 + Vite + TypeScript + TSX Starter

A production-ready Vue 3 starter template with modern tooling and best practices.

## Features

- **Vue 3** with Composition API
- **TypeScript** with strict type checking
- **TSX** templates (via `@vitejs/plugin-vue-jsx`)
- **Routing** via `vue-router` with lazy loading and auth guards
- **State Management** via `Pinia` with localStorage persistence
- **Internationalization** with `vue-i18n` (English/German)
- **HTTP Client** via `ofetch` with automatic auth token injection and error handling
- **Form Validation** with `vee-validate` + `zod` schemas
- **Styling** with TailwindCSS 4.x + PostCSS
- **Theming** with dark/light mode using CSS custom properties
- **Testing** with Vitest + Vue Test Utils + Happy DOM
- **Type Safety**

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start dev server
npm run dev
```

Set `VITE_API_BASE_URL` in your `.env` for API calls (defaults to `/api` if not set).

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript type checking
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once (CI mode)
```

## Architecture & Design Choices

### Component Architecture

- **TSX over SFC**: Uses TypeScript JSX for better type inference and IDE support
- **Composition API**: All components use `setup()` with composables for reusability
- **Reactive Forms**: Form inputs use `ref()` for proper Vue reactivity (not plain variables)

### Routing

- **Lazy Loading**: All routes use dynamic imports `() => import()` for code splitting
- **Auth Guards**: `beforeEach` navigation guard handles authentication checks
- **Redirect Validation**: Prevents open redirect vulnerabilities by validating redirect URLs

### State Management

- **Pinia Stores**: Modular stores for auth, errors, etc.
- **Persistence Plugin**: Auto-saves store state to localStorage (see `main.ts`)
- **Type Safety**: All API responses use TypeScript interfaces (no `any` types)

### HTTP & Error Handling

- **Request Interceptor**: Automatically attaches `Authorization: Bearer {token}` headers
- **Response Interceptor**: Centralizes error handling and displays errors via ErrorBanner
- **Auto-logout**: 401 responses automatically clear auth state
- **Error Store**: Global error state with dismiss functionality

### Theming

- **CSS Custom Properties**: Theme colors use CSS variables (`--bg`, `--fg`, etc.)
- **Document-level Attribute**: Theme applied via `data-theme` on `<html>` element
- **Persistent**: Theme preference saved to localStorage
- **Smooth Transitions**: 0.2s transition between light/dark modes

### Type Safety

- **Strict TypeScript**: All event handlers properly typed (no `any`)
- **API Response Types**: API calls use generic types for responses
- **Route Meta Types**: Can be extended via Vue Router module augmentation

### Testing

- **Vitest**: Fast unit test framework with HMR
- **Happy DOM**: Lightweight DOM implementation for tests
- **Component Tests**: Tests for ErrorBanner with Pinia integration
- **Composable Tests**: Tests for useTheme with localStorage mocking
- **Store Tests**: Tests for error store CRUD operations

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ErrorBanner.tsx
│   └── __tests__/
├── composables/         # Vue composables
│   ├── useTheme.ts
│   └── __tests__/
├── plugins/             # Plugin configuration
│   ├── fetch.ts         # HTTP client setup
│   └── i18n.ts          # i18n configuration
├── router/              # Route definitions
│   └── index.ts
├── stores/              # Pinia stores
│   ├── auth.ts
│   ├── errors.ts
│   └── __tests__/
├── styles/              # Global styles
│   └── index.css
├── test/                # Test setup
│   └── setup.ts
├── views/               # Page components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── FormDemo.tsx
│   └── Login.tsx
├── App.tsx              # Root component
└── main.ts              # App entry point
```

## Important Notes

### Authentication

The auth flow is **mocked** for demonstration. Replace API endpoints in `src/stores/auth.ts` with your real backend:

```typescript
// Example: Replace this
const data = await api<LoginResponse>("/auth/login", {
  method: "POST",
  body: { email, password },
});
```

### Environment Variables

Create a `.env` file with:

```env
VITE_API_BASE_URL=https://your-api.com
```

If not set, defaults to `/api` for development.

### Security Features

- Open redirect protection in login flow
- Auth token auto-injection on all API requests
- Auto-logout on 401 responses
- Proper TypeScript typing throughout

### Performance Optimizations

- Route-based code splitting with lazy loading
- Tree-shakeable imports
- Minimal initial bundle size
- Optimized Vite build configuration

## Testing Strategy

Run tests with:

```bash
npm test              # Watch mode
npm run test:run      # Run once
npm run test:ui       # Visual UI
```

Tests cover:

- Component rendering and user interactions
- Store state management and mutations
- Composable logic and localStorage integration
- Error handling and edge cases

## Customization

### Adding New Routes

Edit `src/router/index.ts`:

```typescript
{
  path: '/new-page',
  name: 'new-page',
  component: () => import('../views/NewPage'),
  meta: { requiresAuth: true }  // Optional
}
```

### Adding Theme Colors

Edit `src/styles/index.css`:

```css
:root {
  --new-color: #ff0000;
}

:root[data-theme="dark"] {
  --new-color: #00ff00;
}
```

Use in components via Tailwind config or direct CSS:

```tsx
<div class="bg-new-color">Content</div>
```

### Adding i18n Translations

Edit `src/plugins/i18n.ts` and add new keys to the messages object.

## License

MIT
