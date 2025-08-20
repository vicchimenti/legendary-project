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

    </div>
  </header>
</template>