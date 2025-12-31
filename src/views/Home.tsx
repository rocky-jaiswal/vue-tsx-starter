import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <section class="space-y-4">
        <h1 class="text-2xl font-bold">Vue TSX Starter</h1>
        <p>This starter demonstrates routing, Pinia + persistence, i18n, theming, ofetch, and validated forms.</p>
        <p>Use the navigation above to explore the features.</p>
      </section>
    )
  }
})
