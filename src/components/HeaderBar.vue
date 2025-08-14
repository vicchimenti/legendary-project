<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

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
      <div class="brand">Vue+GSAP</div>
      <nav class="nav">
        <a href="#features">Features</a>
        <a href="#get-started">Get Started</a>
      </nav>
    </div>
  </header>
</template>