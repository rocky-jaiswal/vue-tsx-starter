import { defineComponent } from 'vue'
import { LoadingSpinner } from '../components/LoadingSpinner'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <section class="space-y-6">
        <h1 class="text-2xl font-bold">Vue TSX Starter</h1>
        <p>This starter demonstrates routing, Pinia + persistence, i18n, theming, ofetch, and validated forms.</p>
        <p>Use the navigation above to explore the features.</p>

        <div class="space-y-4 pt-4 border-t">
          <h2 class="text-xl font-semibold">Loading Spinner Examples</h2>

          <div class="space-y-2">
            <h3 class="font-medium">Small</h3>
            <LoadingSpinner size="sm" />
          </div>

          <div class="space-y-2">
            <h3 class="font-medium">Medium (default)</h3>
            <LoadingSpinner />
          </div>

          <div class="space-y-2">
            <h3 class="font-medium">Large</h3>
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    )
  }
})
