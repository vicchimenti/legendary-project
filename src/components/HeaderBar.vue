<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

import DesktopLogo from '../assets/images/Desktop_Logo.svg'

const header = ref(null)

onMounted(() => {
  gsap.from(header.value, {
    y: -40,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  })
})
</script>

<template>
  <header class="header">
    <div class="container" ref="header" style="display:flex;justify-content:space-between;align-items:center;">
      <DesktopLogo class="logo" alt="Seattle University Logo" />
    </div>
  </header>
</template>

<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  // position: sticky;
  top: 0;

}
  .logo {
    width: 230px;
    height: auto;
    fill:white;
  }
</style>