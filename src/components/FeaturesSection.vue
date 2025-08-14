<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: section.value,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out'
    })
  }, section)
})

onBeforeUnmount(() => {
  ctx && ctx.revert()
})
</script>

<template>
  <section id="features" class="section">
    <div class="container" ref="section">
      <h2 style="margin-bottom:1rem;">Features</h2>
      <p style="color:var(--muted); margin-bottom:1.5rem;">
        Small, focused starter—easy to extend.
      </p>

      <div class="card-grid">
        <div class="card feature-card">
          <h3>Vite</h3>
          <p>Instant dev server, fast HMR, optimized builds.</p>
        </div>
        <div class="card feature-card">
          <h3>Vue 3</h3>
          <p>Composition API and component-driven structure.</p>
        </div>
        <div class="card feature-card">
          <h3>GSAP + ScrollTrigger</h3>
          <p>Robust animations and scroll-based effects.</p>
        </div>
      </div>
    </div>
  </section>
</template>