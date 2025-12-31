import { ref, watchEffect } from "vue";

const storedTheme = localStorage.getItem("theme");
const themeRef = ref<"light" | "dark">(
  storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light"
);

watchEffect(() => {
  localStorage.setItem("theme", themeRef.value);
  // Apply theme to document element
  document.documentElement.setAttribute("data-theme", themeRef.value);
});

export function useTheme() {
  const toggleTheme = () => {
    themeRef.value = themeRef.value === "light" ? "dark" : "light";
  };
  return { theme: themeRef, toggleTheme };
}
