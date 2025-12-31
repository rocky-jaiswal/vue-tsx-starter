import { defineComponent, ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTheme } from "./composables/useTheme";
import { useAuth } from "./composables/useAuth";
import { useLoading } from "./composables/useLoading";
import { ErrorBanner } from "./components/ErrorBanner";
import { Nav } from "./components/Nav";

export default defineComponent({
  name: "App",
  setup() {
    const { t } = useI18n();
    const { theme } = useTheme();
    const { isLoading } = useLoading();
    const { hydrateFromStorage } = useAuth();
    const ready = ref(false);

    onMounted(async () => {
      // try to refresh session on load
      await hydrateFromStorage();
      ready.value = true;
    });

    return () => (
      <div
        class={theme.value === "dark" ? "dark min-h-screen" : "min-h-screen"}
        data-theme={theme.value}
      >
        {/* Global loading indicator */}
        {isLoading.value && (
          <div class="fixed top-0 left-0 right-0 h-1 bg-primary z-50 animate-pulse" />
        )}

        <div class="max-w-5xl mx-auto p-4">
          <Nav />

          <ErrorBanner />

          <main class="mt-6">{ready.value ? <RouterView /> : <div>Loading…</div>}</main>
          <footer class="mt-12 text-sm opacity-70">{t("common.footer")}</footer>
        </div>
      </div>
    );
  },
});
