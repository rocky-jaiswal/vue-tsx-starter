# Styling Guide

This project uses a hybrid approach to styling, combining **Tailwind CSS** for utility classes with **CSS Modules** for component-specific styles and animations.

## Styling Strategy

### 1. **Tailwind CSS** (Primary)
Use Tailwind utility classes for most styling needs.

**When to use:**
- Layout (flex, grid, spacing)
- Typography
- Colors (use theme variables)
- Responsive design
- Simple hover/focus states

**Example:**
```tsx
<button class="px-4 py-2 rounded-lg border hover:bg-primary">
  Click me
</button>
```

### 2. **CSS Modules** (Component-specific)
Use CSS Modules for complex animations, component-specific styles, and when you need scoped CSS.

**When to use:**
- Complex animations and keyframes
- Component-specific CSS that doesn't fit Tailwind
- Pseudo-elements and pseudo-classes that need complex logic
- When you need CSS cascade/specificity

**Example:**
```tsx
// Component.module.css
.spinner {
  border: 3px solid var(--secondary);
  border-top-color: var(--primary);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// Component.tsx
import styles from './Component.module.css'

<div class={styles.spinner} />
```

### 3. **Global Styles** (Minimal)
Use global CSS only for theme variables and app-wide defaults.

**When to use:**
- CSS custom properties (theme variables)
- Global resets
- Base element styles (html, body)

**File:** `src/styles/index.css`

```css
:root {
  --bg: #ffffff;
  --fg: #1a1a1a;
  --primary: #3b82f6;
}

body {
  background-color: var(--bg);
  color: var(--fg);
}
```

---

## File Structure

```
src/
├── components/
│   ├── LoadingSpinner.tsx           # Component logic
│   ├── LoadingSpinner.module.css    # Component-specific styles
│   └── __tests__/
│       └── LoadingSpinner.test.tsx  # Tests
├── styles/
│   └── index.css                     # Global styles & theme
└── views/
    └── Home.tsx                      # Page components (mostly Tailwind)
```

---

## Best Practices

### ✅ DO

1. **Use Tailwind first** - Reach for utility classes before writing custom CSS
2. **Co-locate styles** - Keep `.module.css` files next to their components
3. **Use theme variables** - Reference CSS custom properties (`var(--primary)`)
4. **Combine approaches** - Mix Tailwind with CSS Modules when needed
5. **Name CSS Module classes descriptively** - `.spinner`, `.overlay`, `.container`

**Example of combining:**
```tsx
import styles from './Button.module.css'

<button class={[styles.animated, 'px-4 py-2 bg-primary']}>
  Submit
</button>
```

### ❌ DON'T

1. **Don't use inline styles** - Use Tailwind or CSS Modules instead
2. **Don't duplicate Tailwind** - If Tailwind can do it, use it
3. **Don't pollute global styles** - Keep it minimal
4. **Don't use plain CSS files** - Use `.module.css` for component styles
5. **Don't hardcode colors** - Use theme variables

---

## Theme Variables

### Available CSS Custom Properties

```css
/* Light theme (default) */
--bg: #ffffff           /* Background */
--fg: #1a1a1a          /* Foreground/text */
--primary: #3b82f6     /* Primary accent */
--secondary: #6b7280   /* Secondary/muted */

/* Dark theme */
:root[data-theme="dark"] {
  --bg: #1a1a1a
  --fg: #ffffff
  --primary: #3b82f6
  --secondary: #9ca3af
}
```

### Using in CSS Modules

```css
.button {
  background: var(--primary);
  color: var(--bg);
}
```

### Using in Tailwind

Tailwind is configured to use these variables:

```tsx
<div class="bg-bg text-fg border-primary" />
```

---

## CSS Modules Naming Convention

Use **BEM-like naming** for CSS Module classes:

```css
/* Good */
.container { }
.header { }
.spinner { }
.fullscreenOverlay { }
.inlineContainer { }

/* Avoid */
.my-component-spinner { }  /* Too verbose */
.s1 { }                    /* Not descriptive */
```

---

## Animation Patterns

### Tailwind Animations

For simple animations, use Tailwind:

```tsx
<div class="animate-pulse">Loading...</div>
<div class="transition-all duration-200 hover:scale-110">Hover me</div>
```

### Custom Animations (CSS Modules)

For complex animations, use CSS Modules:

```css
.fadeIn {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<div class="flex flex-col md:flex-row lg:gap-8">
  <div class="w-full md:w-1/2">Column 1</div>
  <div class="w-full md:w-1/2">Column 2</div>
</div>
```

---

## Testing Styles

### Testing Tailwind Classes

```typescript
const wrapper = mount(Component)
expect(wrapper.classes()).toContain('px-4')
```

### Testing CSS Modules

CSS Modules generate unique class names, so test by structure or attributes:

```typescript
const wrapper = mount(Component)
const element = wrapper.findAll('div')[1]
expect(element.classes()).toContain('w-10')  // Tailwind still works
expect(element.exists()).toBe(true)
```

---

## Migration Guide

### Converting from global CSS to CSS Modules

**Before:**
```css
/* index.css */
.spinner {
  animation: spin 0.8s linear infinite;
}
```

```tsx
<div class="spinner" />
```

**After:**
```css
/* LoadingSpinner.module.css */
.spinner {
  animation: spin 0.8s linear infinite;
}
```

```tsx
import styles from './LoadingSpinner.module.css'
<div class={styles.spinner} />
```

---

## Common Patterns

### Pattern 1: Button with custom hover effect

```tsx
import styles from './Button.module.css'

<button class={[styles.customHover, 'px-4 py-2 bg-primary text-white rounded']}>
  Click me
</button>
```

```css
.customHover {
  transition: transform 0.2s;
}

.customHover:hover {
  transform: translateY(-2px);
}
```

### Pattern 2: Loading overlay

```tsx
import styles from './Overlay.module.css'

<div class={styles.overlay}>
  <LoadingSpinner />
</div>
```

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgb(from var(--bg) r g b / 0.8);
  backdrop-filter: blur(4px);
  z-index: 50;
}
```

### Pattern 3: Theme-aware component

```tsx
<div class="bg-bg text-fg border border-primary">
  Content adapts to light/dark theme automatically
</div>
```

---

## Performance Tips

1. **Purge unused Tailwind** - Vite does this automatically
2. **CSS Modules are scoped** - No naming conflicts, smaller bundles
3. **Lazy-load routes** - Already implemented
4. **Use theme variables** - Single source of truth for colors

---

## Examples in Codebase

- **LoadingSpinner** - CSS Modules for animations
- **Nav** - Pure Tailwind
- **ErrorBanner** - Tailwind with theme variables
- **App** - Mix of both approaches

---

## Questions?

- Need a new theme color? Add it to `src/styles/index.css`
- Need complex animation? Create a `.module.css` file
- Need layout/spacing? Use Tailwind
- Unsure? Start with Tailwind, move to CSS Modules if needed
