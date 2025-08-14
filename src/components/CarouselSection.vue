<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const section = ref(null)
const track = ref(null)
const prevDisabled = ref(true)
const nextDisabled = ref(false)

let resizeObserver
let slideWidth = 0

const measureSlideWidth = () => {
  const firstSlide = track.value?.querySelector('.slide')
  if (!firstSlide) return
  const styles = getComputedStyle(track.value)
  const gap = parseFloat(styles.columnGap || styles.gap || '0')
  slideWidth = firstSlide.getBoundingClientRect().width + gap
}

const syncButtons = () => {
  const el = track.value
  if (!el) return
  const maxScrollLeft = el.scrollWidth - el.clientWidth - 1
  prevDisabled.value = el.scrollLeft <= 0
  nextDisabled.value = el.scrollLeft >= maxScrollLeft
}

const scrollBySlides = (n) => {
  const el = track.value
  if (!el || !slideWidth) return
  el.scrollBy({ left: slideWidth * n, behavior: 'smooth' })
}

const onKey = (e) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); scrollBySlides(1) }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollBySlides(-1) }
}

// Example data — replace with props/CMS later
const items = ref([
  {
    img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop',
    alt: 'Student presenting a project',
    title: 'Lead with purpose',
    desc: 'Take on real challenges. Build momentum with mentors and community.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    alt: 'Campus walkway at dusk',
    title: 'Find your people',
    desc: 'Join a network that elevates your goals and keeps you accountable.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    alt: 'City skyline near campus',
    title: 'Be in the mix',
    desc: 'Internships, industry partners, and projects that open doors.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=1600&auto=format&fit=crop',
    alt: 'Hands collaborating over a desk',
    title: 'Create outcomes',
    desc: 'Turn ambition into a plan—and a plan into results.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    alt: 'Library atrium',
    title: 'Own your craft',
    desc: 'Sharpen skills with guidance that meets you where you are.',
    href: '#'
  }
])

onMounted(async () => {
  await nextTick()
  measureSlideWidth()
  syncButtons()

  track.value?.addEventListener('scroll', syncButtons, { passive: true })
  window.addEventListener('resize', measureSlideWidth)

  // ResizeObserver handles container/layout changes
  resizeObserver = new ResizeObserver(() => {
    measureSlideWidth()
    syncButtons()
  })
  if (track.value) resizeObserver.observe(track.value)
})

onBeforeUnmount(() => {
  track.value?.removeEventListener('scroll', syncButtons)
  window.removeEventListener('resize', measureSlideWidth)
  resizeObserver?.disconnect()
})
</script>

<template>
  <section class="carousel-section" ref="section" aria-labelledby="carousel-heading">
    <div class="container">
      <h2 id="carousel-heading" class="section-title">Explore more</h2>

      <div class="controls">
        <button class="nav-btn" :disabled="prevDisabled" @click="scrollBySlides(-1)" aria-label="Previous">
          ‹
        </button>
        <button class="nav-btn" :disabled="nextDisabled" @click="scrollBySlides(1)" aria-label="Next">
          ›
        </button>
      </div>

      <div
        class="track"
        ref="track"
        tabindex="0"
        aria-label="Carousel"
        role="region"
        @keydown="onKey"
      >
        <article
          v-for="(item, i) in items"
          :key="i"
          class="slide"
        >
          <img class="slide-img" :src="item.img" :alt="item.alt" loading="lazy" decoding="async" />
          <div class="slide-card">
            <h3 class="slide-title">{{ item.title }}</h3>
            <p class="slide-desc">{{ item.desc }}</p>
            <a class="slide-link" :href="item.href">Learn more →</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* Section with white background */
.carousel-section {
  background: #ffffff;
  padding: 6rem 0;

  .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
  .section-title {
    margin: 0 0 1rem;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 900;
    letter-spacing: .02em;
    line-height: 1.1;
    color: #0f172a;
  }
}

/* Controls */
.controls {
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
  margin-bottom: .75rem;
}

.nav-btn {
  width: 40px; height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.15);
  background: #fff;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: background .15s ease, box-shadow .15s ease, transform .1s ease;
  &:hover:not(:disabled) { background: #f3f4f6; box-shadow: 0 4px 12px rgba(0,0,0,.08); }
  &:active:not(:disabled) { transform: translateY(1px); }
  &:disabled { opacity: .4; cursor: not-allowed; }
}

/* Track */
.track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 2rem; /* align first slide nicely */
  padding-bottom: .5rem;
  -webkit-overflow-scrolling: touch; /* smooth on iOS */
}

/* Slides (1 on mobile, 2 on tablet, 3 on desktop) */
.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  border-radius: 16px;
  overflow: hidden; /* clip child corners */

  @media (min-width: 640px) { flex-basis: 50%; }
  @media (min-width: 1024px) { flex-basis: calc(33.3333% - .6667rem); } /* compensate gap a bit */
}

.slide-img {
  width: 100%;
  height: clamp(180px, 24vw, 240px);
  object-fit: cover;
  display: block;
  background: #e5e7eb;
}

/* Red box below image */
.slide-card {
  background: #c81e1e; /* rich red */
  color: #fff;
  padding: 1rem 1rem 1.1rem;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.slide-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: .01em;
  line-height: 1.2;
}

.slide-desc {
  margin: 0;
  opacity: .95;
  line-height: 1.45;
}

.slide-link {
  margin-top: auto;
  align-self: flex-start;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  border-bottom: 2px solid rgba(255,255,255,.6);
  padding-bottom: 2px;
  transition: border-color .15s ease, opacity .15s ease;
  &:hover { border-color: #fff; opacity: 0.95; }
}
</style>
