<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const title = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Intro animation
    gsap.from(title.value, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Scroll-based scale-up
    gsap.to(title.value, {
      scrollTrigger: {
        trigger: title.value,
        start: 'top 40%',       // start when top of text is at 40% viewport height
        end: 'bottom top',      // until it scrolls out
        scrub: true,            // link animation to scroll
      },
      scale: 2,                 // grow to 2x size
      transformOrigin: 'center center',
      ease: 'none'
    })
  })

})

onBeforeUnmount(() => {
  ctx && ctx.revert()
})
</script>

<template>
  <section class="hero container">
    <h1 ref="title" class="hero-title">BE LEGENDARY</h1>
  </section>
</template>

<style lang="scss" scoped>

.hero {
  padding: 8rem 0 6rem;
  text-align: center;

  .hero-title {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 900;
    letter-spacing: 0.05em;
    line-height: 1.1;
    color: #fff;
  }
}
</style>
