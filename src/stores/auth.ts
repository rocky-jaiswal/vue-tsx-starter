import { defineStore } from 'pinia'
import { api } from '../plugins/fetch'

type User = {
  id: string
  email: string
}

type State = {
  token: string | null
  user: User | null
}

interface LoginResponse {
  token: string
  user: User
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    token: null,
    user: null
  }),
  getters: {
    isAuthenticated: (s) => !!s.token
  },
  actions: {
    async hydrateFromStorage() {
      // no-op; persistence handled by pinia plugin in main.ts
      return true
    },
    async login(email: string, password: string) {
      // Example call — replace with your real endpoint
      const data = await api<LoginResponse>('/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      this.token = data.token
      this.user = data.user
      return true
    },
    async logout() {
      try {
        await api('/auth/logout', { method: 'POST' })
      } catch (e) {
        // Log error but continue with logout
        console.error('Logout request failed:', e)
      }
      this.clear()
    },
    clear() {
      this.token = null
      this.user = null
    }
  }
})
