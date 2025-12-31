import { defineComponent } from 'vue'
import { useError } from '../composables/useError'

export const ErrorBanner = defineComponent({
  name: 'ErrorBanner',
  setup() {
    const { errors, remove } = useError()
    return () => (
      errors.value.length ? (
        <div class="mb-4 rounded-xl border p-3 bg-red-50 dark:bg-red-900/20">
          <ul class="space-y-2">
            {errors.value.map(err => (
              <li class="flex items-start justify-between gap-4" key={err.id}>
                <div>
                  <div class="font-medium">Error {err.status ? `(${err.status})` : ''}</div>
                  <div>{err.message}</div>
                </div>
                <button class="text-sm underline" onClick={() => remove(err.id)}>dismiss</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null
    )
  }
})
