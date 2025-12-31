import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import { router } from './router'
import { i18n } from './plugins/i18n'
import './styles/index.css'

const pinia = createPinia()

// Pinia persistence plugin (localStorage)
pinia.use(({ store }) => {
  const key = `store:${store.$id}`
  const fromLS = localStorage.getItem(key)
  if (fromLS) {
    store.$patch(JSON.parse(fromLS))
  }
  store.$subscribe((_mutation, state) => {
    localStorage.setItem(key, JSON.stringify(state))
  })
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
