import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTheme } from "../composables/useTheme";
import { useAuthStore } from "../stores/auth";

export const Nav = defineComponent({
  name: "Nav",
  setup() {
    const { t, locale } = useI18n();
    const { theme, toggleTheme } = useTheme();
    const auth = useAuthStore();

    return () => (
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
    );
  },
});
