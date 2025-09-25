<script setup>
import { watch, ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const slideRefs = ref({})
const setRef = (key) => (el) => { if (el) slideRefs.value[key] = el }

let currentKey = null

const switchSlide = (key) => {
  if (key === currentKey) return

  const hideEl = currentKey ? slideRefs.value[currentKey] : null
  const showEl = key ? slideRefs.value[key] : null

  gsap.killTweensOf(Object.values(slideRefs.value))

  // hide all others instantly
  Object.entries(slideRefs.value).forEach(([k, el]) => {
    if (k !== key) gsap.set(el, { autoAlpha: 0 })
  })


  gsap.killTweensOf([hideEl, showEl])

  if (showEl) gsap.set(showEl, { zIndex: 2, visibility: 'visible' })
  if (hideEl) gsap.set(hideEl, { zIndex: 1, visibility: 'visible' })

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  // OUT — fade/slide down (opacity only)
  if (hideEl) {
    tl.set(hideEl, { opacity: 1, y: 0 }, 0)
      .to(hideEl, {
        opacity: 0,
        y: -100,
        duration: 0.6,
        overwrite: 'auto',
        onComplete: () => gsap.set(hideEl, { visibility: 'hidden', y: 0 }) // hide AFTER fade
      }, 0)
  }

  // IN — fade/slide up with overlap
  if (showEl) {
    tl.set(showEl, { opacity: 0, y: 100 }, 0)
      .to(showEl, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        overwrite: 'auto'
      }, 0.12) // overlap start; tweak (0.10–0.25) to taste
  }

  // normalize (optional)
  tl.add(() => {
    if (hideEl) gsap.set(hideEl, { zIndex: 1 })
    if (showEl) gsap.set(showEl, { zIndex: 2 })
  })

  currentKey = key
}

watch(() => ui.activeBgSlide, (key) => switchSlide(key))

onMounted(() => {
  // hide all initially
  Object.values(slideRefs.value).forEach(el => gsap.set(el, { autoAlpha: 0, y: -40 }))
})
</script>

<template>
  <div class="bg-container" aria-hidden="true">
    <div class="bg-slide hero-1"      :ref="setRef('hero-1')"><div class="bg-slide-image" /></div>
    <div class="bg-slide hero-2"      :ref="setRef('hero-2')"><div class="bg-slide-image" /></div>
    <div class="bg-slide rally-cry-1" :ref="setRef('rally-cry-1')"><div class="bg-slide-image" /></div>
    <div class="bg-slide rally-cry-2" :ref="setRef('rally-cry-2')"><div class="bg-slide-image" /></div>
  </div>
</template>


<style scoped lang="scss">
:global(.bg-container) {
  position: fixed; inset: 0; z-index: -1; pointer-events: none; mix-blend-mode: darken;
}
.bg-slide {
  position: absolute; inset: 0;
    width: 110vw;
    height: 110vh;
  will-change: opacity, transform; opacity: 0; transform: translateY(-40px);

  /* gradient (per-slide can override) */
  // &::before {
  //   content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  //   background: linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, #A2A2A2 47.36%, rgba(115, 115, 115, 0.00) 88.24%);  
  // }

  .bg-slide-image {
    position: absolute; inset: 0; z-index: 0;
    background-color: lightgray; background-position: 50% 50%; background-size: cover; background-repeat: no-repeat;
  }

  /* HERO color slides (no gradient) */
  &.hero-1 { 
    display:none;
    &::before { display:none; } 
    .bg-slide-image { background-image:none; background-color:var(--Digital-SU-Red); } 
  }
  &.hero-2 { 
    display:none;
    &::before { display:none; } 
    .bg-slide-image { background-image:none; background-color:var(--Digital-SU-Red); } 
  }

  /* RALLY image slides + their own gradients */
  &.rally-cry-1 {
    // &::before { 
    //   background: linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, #A2A2A2 47.36%, rgba(115, 115, 115, 0.00) 88.24%);
    // }
    .bg-slide-image { background-image: url("@/assets/images/RALLY_CRY_01-2300.jpg"); }
  }
  &.rally-cry-2 {
    // &::before { 
    //   background: linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, #A2A2A2 47.36%, rgba(115, 115, 115, 0.00) 88.24%);
    // }
    .bg-slide-image { background-image: url("@/assets/images/RALLY_CRY_02-2300.jpg"); }
  }
}
</style>
