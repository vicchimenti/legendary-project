<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useUiStore } from '../stores/ui' 
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

const ui = useUiStore()

const titleWrap = ref(null)   // outer: auto-fit scale
const titleInner = ref(null)  // inner: scroll scale
const videoEl = ref(null)
const videoDone = ref(false)

const section = ref(null)
const downBtn = ref(null)
const showArrow = ref(false)

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
      showArrow.value = true
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

const scrollToNextSection = () => {
  const current = section.value
  if (!current) return
  const next = current.nextElementSibling
  if (!next) return

  // next.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const top = next.getBoundingClientRect().top + window.scrollY

  gsap.to(window, {
    scrollTo: top,
    duration: 0,       // 👈 control the speed (seconds)
    ease: 'power2.inOut' // easing curve
  })

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


  const prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    // Respect reduced motion: show it, no animation
    if (downBtn.value) {
      downBtn.value.style.opacity = 1
      downBtn.value.style.transform = 'translateY(0)'
    }
    return
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
  <section 
    class="hero" 
    :class="{ 'video-done': videoDone }" 
    aria-label="Be Legendary hero"
    ref="section">
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
      <button
        class="down-btn"
        :class="{ 'is-visible': showArrow }"
        ref="downBtn"
        type="button"
        aria-label="Scroll to next section"
        @click="scrollToNextSection"
        >
        <div class="inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="30" viewBox="0 0 54 30" fill="none">
          <path d="M53.7402 2.87006L26.8701 29.7401L5.99623e-05 2.87006L2.82849 0.0416301L26.8701 24.0833L50.9117 0.0416301L53.7402 2.87006Z" fill="white"/>
          </svg>
        </div>
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

/* Centered at bottom */
.button-strip {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  // pointer-events: none; /* prevents stray clicks outside the button */
}

.down-btn {
  background:none;
  border:none;
  opacity: 0;
  transform: translateY(-50px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  height: 100px;
}

/* initial fade+slide in */
.down-btn.is-visible {
  opacity: 1;
  transform: translateY(0);
  

  .inner{
    animation: arrowFall 1.2s ease-in-out infinite;
  }
}

@keyframes arrowFall {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}
</style>
