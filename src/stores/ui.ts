import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const headerVisible = ref(false)
  function showHeader() { headerVisible.value = true }
  function hideHeader() { headerVisible.value = false }
  return { headerVisible, showHeader, hideHeader }
})
