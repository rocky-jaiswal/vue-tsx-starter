import { defineComponent, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useErrorStore } from '../stores/errors'

export default defineComponent({
  name: 'Login',
  setup() {
    const { t } = useI18n()
    const auth = useAuthStore()
    const route = useRoute()
    const router = useRouter()
    const errors = useErrorStore()

    const email = ref('')
    const password = ref('')

    const submit = async (e: Event) => {
      e.preventDefault()
      try {
        await auth.login(email.value, password.value)
        // Validate redirect to prevent open redirect vulnerability
        const redirect = route.query.redirect as string
        const safeRedirect = redirect && redirect.startsWith('/') ? redirect : '/dashboard'
        router.replace(safeRedirect)
      } catch (_e) {
        errors.push(t('auth.loginFailed'))
      }
    }

    return () => (
      <section class="max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">{t('auth.title')}</h1>
        <form class="space-y-3" onSubmit={submit}>
          <div class="space-y-1">
            <label class="block">{t('auth.email')}</label>
            <input
              class="w-full rounded-lg border px-3 py-2 bg-bg text-fg"
              type="email"
              required
              value={email.value}
              onInput={(e: Event) => (email.value = (e.target as HTMLInputElement).value)}
            />
          </div>
          <div class="space-y-1">
            <label class="block">{t('auth.password')}</label>
            <input
              class="w-full rounded-lg border px-3 py-2 bg-bg text-fg"
              type="password"
              required
              value={password.value}
              onInput={(e: Event) => (password.value = (e.target as HTMLInputElement).value)}
            />
          </div>
          <button class="px-4 py-2 rounded-lg border" type="submit">{t('actions.login')}</button>
        </form>
      </section>
    )
  }
})
