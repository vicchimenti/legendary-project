<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUiStore } from '../stores/ui' 
gsap.registerPlugin(ScrollTrigger)

const ui = useUiStore()

const titleWrap = ref(null)   // outer: auto-fit scale
const titleInner = ref(null)  // inner: scroll scale
const videoEl = ref(null)
const videoDone = ref(false)

let ctx
let ro // ResizeObserver

import HeroVideoPlaceholder from '../assets/images/HeroVideoPlaceholder.jpg'
import HeroVideo from '../assets/videos/BeLegendaryIntroVideo.mp4'

// NOTE: Bird.svg must be handled by vite-svg-loader (import-as-component).
import Bird from '../assets/images/Bird.svg'

const scaleStart = 0.7

function fitToWidth() {
  const wrap = titleWrap.value
  const inner = titleInner.value
  if (!wrap || !inner) return

  const parentWidth = wrap.parentElement?.clientWidth || wrap.clientWidth
  const contentWidth = inner.scrollWidth
  const fitScale = Math.min(1, (parentWidth / contentWidth))

  gsap.set(wrap, { scale: fitScale, transformOrigin: 'center top' })
}

function fadeInHero() {
  if (!titleWrap.value) return
  if (gsap.getProperty(titleWrap.value, 'autoAlpha') === 1) return
  gsap.to(titleWrap.value, { autoAlpha: 1, duration: 1, ease: 'power2.out' })
}

function showHeaderEarly() {
  if (!ui.headerVisible) ui.showHeader()
}

function endVideo() {
  videoDone.value = true
  fadeInHero()
  showHeaderEarly()
  
  // extra cleanup to free memory on some browsers
  const el = videoEl.value
  if (el) {
    try {
      el.pause()
      el.removeAttribute('src')
      el.load()
    } catch {}
  }
}

async function tryAutoplayOnce() {
  const el = videoEl.value
  if (!el) return endVideo()

  // Respect reduced motion
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return endVideo()

  // Start from the beginning and attempt to play
  el.currentTime = 0
  try {
    const p = el.play()
    if (p && typeof p.then === 'function') await p
  } catch {
    // Autoplay blocked -> fall back to solid color
    return endVideo()
  }

  //  trigger fade 2s before video ends
  const handler = () => {
    if (videoDone.value || !el.duration) return
    if (el.currentTime >= el.duration - 1.6) {
      showHeaderEarly()
      fadeInHero()
      el.removeEventListener("timeupdate", handler)
    }
  }
  el.addEventListener("timeupdate", handler)

  // Guard in case 'ended' never fires
  const guard = setInterval(() => {
    if (!videoEl.value || videoDone.value) return clearInterval(guard)
    if (el.duration && el.currentTime >= el.duration - 0.05) {
      clearInterval(guard)
      endVideo()
    }
  }, 400)
}

onMounted(async () => {
  await nextTick()
  if (document?.fonts?.ready) {
    try { await document.fonts.ready } catch {}
  }

  // hide hero title initially
  gsap.set(titleWrap.value, { autoAlpha: 0 })

  // GSAP enter + scroll grow
  ctx = gsap.context(() => {
    gsap.from(titleInner.value, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.fromTo(
      titleInner.value,
      { scale: scaleStart },
      {
        scale: 1,
        scrollTrigger: {
          trigger: titleInner.value,
          start: 'top 40%',
          end: 'bottom top',
          scrub: true,
        },
        transformOrigin: 'center top',
        ease: 'none',
      }
    )
  })

  // initial fit + resize handling
  fitToWidth()
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => fitToWidth())
    if (titleWrap.value?.parentElement) ro.observe(titleWrap.value.parentElement)
  } else {
    window.addEventListener('resize', fitToWidth)
  }

  // video wiring
  if (videoEl.value) {
    videoEl.value.addEventListener('ended', endVideo, { passive: true })
    videoEl.value.addEventListener('error', endVideo, { passive: true })
    tryAutoplayOnce()
  } else {
    endVideo()
  }
})

onBeforeUnmount(() => {
  ctx?.revert?.()
  ro?.disconnect()
  window.removeEventListener('resize', fitToWidth)
  if (videoEl.value) {
    videoEl.value.removeEventListener('ended', endVideo)
    videoEl.value.removeEventListener('error', endVideo)
  }
})
</script>

<template>
  <!-- Add a toggling class when the video is finished -->
  <section class="hero" :class="{ 'video-done': videoDone }" aria-label="Be Legendary hero">
    <!-- Full-screen background video; disappears after first play -->
    <video
      v-if="!videoDone"
      ref="videoEl"
      class="bg-video"
      :poster="HeroVideoPlaceholder"
      preload="auto"
      playsinline
      muted
      autoplay
      controlslist="nodownload nofullscreen noremoteplayback"
      disablepictureinpicture
    >
      <source :src="HeroVideo" type="video/mp4" />
    </video>

    <!-- OUTER: gets “fit” scaling -->
    <div class="hero-title" ref="titleWrap" style="opacity:0;">
      <!-- INNER: gets scroll trigger GSAP scale -->
      <div class="hero-title-inner" ref="titleInner">
        <Bird aria-hidden="true" focusable="false" class="bird-icon" />
        <h1>BE LEGENDARY</h1>
      </div>
    </div>

    <div class="button-strip">
      <button>
        <svg width="100px" height="100px" viewBox="0 0 65 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>HERO-SCROLL-DOWN</title>
        <g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
            <g id="00-HOME" transform="translate(-688.000000, -920.000000)" stroke="#FFFFFF" stroke-width="5">
                <polyline id="HERO-SCROLL-DOWN" points="691 923.022278 720.488665 952 750 923"></polyline>
            </g>
        </g>
        </svg>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 0;
  text-align: center;

  /* Full screen height (mobile-safe) */
  min-height: 100vh;
  height: 100svh;

  display: flex;
  align-items: center;
  justify-content: center;

  /* Solid color will show when video is removed */
  background: #000; /* while video is playing, this is a safe fallback under it */
}

/* When the video is done, remove any moving background and show brand color */
.video-done {
  background: #AC0002;
}

/* Full-bleed background video */
.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
  z-index: 0; /* Keep behind foreground content */
}

/* Foreground title wrapper sits above video */
.hero-title {
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: flex-start; /* top align */

  overflow: visible;

  .hero-title-inner {
    display: flex;
    justify-content: center;
    transform-origin: center top;
    --scale-start: 0.8;
    transform: scale(var(--scale-start));

    svg {
      position: absolute;
      top: -170px;
      right: 20px;
      width: 86px;
      height: 118px;
      pointer-events: none;
    }
    h1 {
      color: #FFF;
      text-align: center;
      font-feature-settings: 'liga' off, 'clig' off;
      font-family: 'Oswald', sans-serif;

      font-size: 175px;
      font-weight: 700;
      line-height: 0.5;
      text-transform: uppercase;

      letter-spacing: 0.05em;

      margin: 0 auto;
      white-space: nowrap;
    }
  }
}

.button-strip{
  width:100%;
  position:absolute;
  bottom:200px;
  left:0px;

  button{
    border: 0px;
    background: 0px;
    opacity: .5;
  }
}
</style>
