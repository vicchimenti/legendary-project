<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
let ctx
let onWinLoad

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {


    // Optional: lift the video box in
    gsap.from('.video-box', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: section.value, start: 'top 85%' }
    })
  }, section)

  // Refresh after media loads so positions are accurate
  onWinLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onWinLoad)
  section.value.querySelectorAll('video').forEach(v => {
    v.addEventListener('loadeddata', () => ScrollTrigger.refresh(), { once: true })
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('load', onWinLoad)
  ctx && ctx.revert()
})
</script>



<template>
  <section class="video-section section" ref="section" aria-labelledby="video-heading">
    <div class="container">
      <h2 id="video-heading" class="sr-only">Feature Video</h2>

      <div class="video-wrap">
        <div class="video-box">
          <!-- Background video inside the box -->
          <!-- Replace src/poster with your asset(s) -->
          <video
            class="video-el"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.jpg"
            playsinline
            autoplay
            muted
            loop
          ></video>

          <!-- Overlay text -->
          <div class="video-overlay">
            <span class="video-tagline">your story is just getting started</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video-section {
  padding: 0rem 0 0rem;
  background:
    linear-gradient(to bottom, var(--page-bg) 0 50%, transparent 50% 100%),
    url('../assets/images/TEXTURE_BG_.jpg');
  background-repeat: repeat;
  background-position: right;
  background-size: 100% auto;
}

.video-wrap {
  display: grid;
  place-items: center;
}

.video-box {
  position: relative;
  width: min(100%, 1160px);
  aspect-ratio: 232/97;

  overflow: hidden;


  background: linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%);
  background-blend-mode: multiply;
}

.video-el {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  text-align: center;
}

.video-tagline {
  color: var(--White, #FFF);
  text-align: center;
  font-family: Oswald;
  font-size: 50px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 55px */
  text-transform: uppercase;
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
</style>
