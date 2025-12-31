import { defineComponent } from 'vue'
import { useAuth } from '../composables/useAuth'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { user } = useAuth()
    return () => (
      <section class="space-y-4">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        {user.value
          ? <p>Signed in as <b>{user.value.email}</b></p>
          : <p>Welcome! (Mock user — sign in to personalize)</p>
        }
        <div class="rounded-xl border p-4">
          <h2 class="font-semibold mb-2">Secure content</h2>
          <p>Only visible when authenticated. Replace with your app content.</p>
        </div>
      </section>
    )
  }
})
