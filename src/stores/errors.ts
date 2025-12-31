import { defineStore } from 'pinia'

export type AppError = {
  id: number
  message: string
  status?: number
}

let idCounter = 1

export const useErrorStore = defineStore('errors', {
  state: () => ({
    list: [] as AppError[]
  }),
  actions: {
    push(message: string, status?: number) {
      this.list.push({ id: idCounter++, message, status })
    },
    remove(id: number) {
      this.list = this.list.filter(e => e.id !== id)
    },
    clear() {
      this.list = []
    }
  }
})
