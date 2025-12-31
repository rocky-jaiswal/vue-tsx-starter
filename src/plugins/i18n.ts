import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: { home: 'Home', dashboard: 'Dashboard', form: 'Form' },
    actions: { toggleTheme: 'Theme', login: 'Login', logout: 'Logout', submit: 'Submit' },
    auth: { title: 'Sign in', email: 'Email', password: 'Password', loginFailed: 'Invalid credentials' },
    form: { title: 'Validated Form', name: 'Name', age: 'Age' },
    common: { footer: 'Built with Vue 3 + TSX starter' },
    dashboard: { welcome: 'Welcome to your dashboard!' },
  },
  de: {
    nav: { home: 'Start', dashboard: 'Übersicht', form: 'Formular' },
    actions: { toggleTheme: 'Thema', login: 'Anmelden', logout: 'Abmelden', submit: 'Senden' },
    auth: { title: 'Anmeldung', email: 'E-Mail', password: 'Passwort', loginFailed: 'Ungültige Anmeldedaten' },
    form: { title: 'Valdidiertes Formular', name: 'Name', age: 'Alter' },
    common: { footer: 'Erstellt mit Vue 3 + TSX Starter' },
    dashboard: { welcome: 'Willkommen in deinem Dashboard!' },
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})
