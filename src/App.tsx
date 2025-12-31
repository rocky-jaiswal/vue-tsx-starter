import { defineComponent, ref, onMounted } from "vue";
import { RouterView, RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTheme } from "./composables/useTheme";
import { useAuthStore } from "./stores/auth";
import { ErrorBanner } from "./components/ErrorBanner";

export default defineComponent({
  name: "App",
  setup() {
    const { t, locale } = useI18n();
    const { theme, toggleTheme } = useTheme();
    const auth = useAuthStore();
    const ready = ref(false);

    onMounted(async () => {
      // try to refresh session on load
      await auth.hydrateFromStorage();
      ready.value = true;
    });

    return () => (
      <div
        class={theme.value === "dark" ? "dark min-h-screen" : "min-h-screen"}
        data-theme={theme.value}
      >
        <div class="max-w-5xl mx-auto p-4">
          <header class="flex items-center justify-between gap-4 py-4">
            <nav class="flex gap-3">
              <RouterLink class="px-3 py-1 rounded-lg hover:underline" to="/">
                {t("nav.home")}
              </RouterLink>
              <RouterLink class="px-3 py-1 rounded-lg hover:underline" to="/dashboard">
                {t("nav.dashboard")}
              </RouterLink>
              <RouterLink class="px-3 py-1 rounded-lg hover:underline" to="/form">
                {t("nav.form")}
              </RouterLink>
            </nav>
            <div class="flex items-center gap-2">
              <select
                class="border rounded px-2 py-1 bg-bg text-fg"
                value={locale.value}
                onChange={(e: Event) => (locale.value = (e.target as HTMLSelectElement).value)}
              >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
              <button class="px-3 py-1 rounded-lg border" onClick={toggleTheme}>
                {t("actions.toggleTheme")}: {theme.value}
              </button>
              {auth.isAuthenticated ? (
                <button class="px-3 py-1 rounded-lg border" onClick={auth.logout}>
                  {t("actions.logout")}
                </button>
              ) : (
                <RouterLink class="px-3 py-1 rounded-lg border" to="/login">
                  {t("actions.login")}
                </RouterLink>
              )}
            </div>
          </header>

          <ErrorBanner />

          <main class="mt-6">{ready.value ? <RouterView /> : <div>Loading…</div>}</main>
          <footer class="mt-12 text-sm opacity-70">{t("common.footer")}</footer>
        </div>
      </div>
    );
  },
});
