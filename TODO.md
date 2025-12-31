# TODO: Must-Have Features

This file tracks essential features that should be added to make this starter truly production-ready.

## Must-Have Features

### 1. Loading Spinner Component
**Priority:** HIGH
**Status:** Not Started

**Description:**
Global loading indicator to provide visual feedback during async operations.

**Implementation:**
- [ ] Create `LoadingSpinner.tsx` component
- [ ] Create `useLoading` composable to track loading state
- [ ] Add loading store to track pending requests
- [ ] Integrate with API interceptors to auto-show/hide
- [ ] Add route transition loading indicator
- [ ] Style with theme-aware colors

**Files to create:**
- `src/components/LoadingSpinner.tsx`
- `src/composables/useLoading.ts`
- `src/stores/loading.ts`

**Usage example:**
```tsx
const { isLoading } = useLoading()
// or
<LoadingSpinner show={isLoading.value} />
```

---

### 2. Toast Notification System
**Priority:** HIGH
**Status:** Not Started

**Description:**
User-friendly notifications for success, info, warning, and error messages.

**Implementation:**
- [ ] Create `Toast.tsx` component with variants (success, error, info, warning)
- [ ] Create `ToastContainer.tsx` to manage multiple toasts
- [ ] Create `useToast` composable for imperative API
- [ ] Add toast store to manage notification queue
- [ ] Implement auto-dismiss with configurable timeout
- [ ] Add position options (top-right, top-center, bottom-right, etc.)
- [ ] Add animations (slide-in, fade)
- [ ] Add accessibility (ARIA live regions)

**Files to create:**
- `src/components/Toast.tsx`
- `src/components/ToastContainer.tsx`
- `src/composables/useToast.ts`
- `src/stores/toast.ts`

**Usage example:**
```tsx
const toast = useToast()
toast.success('Changes saved!')
toast.error('Failed to save')
toast.info('New feature available')
```

---

### 3. Modal/Dialog Component
**Priority:** HIGH
**Status:** Not Started

**Description:**
Reusable modal component for confirmations, forms, and detail views.

**Implementation:**
- [ ] Create `Modal.tsx` base component
- [ ] Create `ConfirmDialog.tsx` for confirmations
- [ ] Create `useModal` composable for programmatic control
- [ ] Add modal store to manage modal stack
- [ ] Implement focus trap (trap focus inside modal)
- [ ] Add keyboard support (ESC to close)
- [ ] Add backdrop click to close
- [ ] Prevent body scroll when modal is open
- [ ] Add transitions/animations
- [ ] Add accessibility (ARIA dialog role, focus management)
- [ ] Support nested modals

**Files to create:**
- `src/components/Modal.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/composables/useModal.ts`
- `src/stores/modal.ts`
- `src/utils/focusTrap.ts`

**Usage example:**
```tsx
// Declarative
<Modal show={showModal.value} onClose={() => showModal.value = false}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</Modal>

// Imperative
const modal = useModal()
const confirmed = await modal.confirm('Delete this item?')
if (confirmed) {
  // delete logic
}
```

---

## Implementation Notes

### Design Principles
- All components must be fully typed (no `any`)
- All components should support theming (light/dark)
- All components must be accessible (WCAG 2.1 AA)
- All components should have unit tests
- Use Teleport for Portal-based components (Toast, Modal)

### Testing Requirements
Each feature should include:
- Component unit tests
- Store tests
- Composable tests
- Accessibility tests
- Integration tests where applicable

### Documentation Requirements
Update README.md with:
- Usage examples for each new feature
- API documentation
- Customization guide

---

## Future Considerations (Nice-to-Have)

These features are not critical but would be valuable additions:

- Reusable form field components
- Pagination component
- Data table component
- Permission/RBAC system
- API request cancellation
- Debounce/throttle utilities
- Image upload component
- Breadcrumbs component
- Empty states component

See project issues or discussions for more details on these features.
