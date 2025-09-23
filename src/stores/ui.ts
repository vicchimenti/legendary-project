import { defineStore } from 'pinia'
import { ref } from 'vue'

// Enumerate all the possible background slide keys.
// Update this union type as you add more slides.
export type BgSlideKey = 'hero-1' | 'hero-2' | 'rally-cry-1' | 'rally-cry-2' | null

export const useUiStore = defineStore('ui', () => {
  // Header state
  const headerVisible = ref(false)
  function showHeader() { headerVisible.value = true }
  function hideHeader() { headerVisible.value = false }

  // Background state
  const activeBgSlide = ref<BgSlideKey>(null)

  function setBgSlide(key: BgSlideKey) {
    if (activeBgSlide.value === key) return // guard against repeat updates
    activeBgSlide.value = key
  }

  return {
    headerVisible,
    showHeader,
    hideHeader,
    activeBgSlide,
    setBgSlide,
  }
})
