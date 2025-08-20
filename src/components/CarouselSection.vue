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
    alt: 'SU Baseball Start Headed to All-Star Game',
    title: 'SU Baseball Start Headed to All-Star Game',
    desc: 'Albers graduate and Cy Young winner Tarik Skubal, ’18 selected to the MLB Midsummer Classic.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    alt: 'A Rising Star',
    title: 'A Rising Star',
    desc: 'Alum Shasti Conrad, ’07, named new Vice Chair of the Democratic National Committee.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    alt: 'Bridging Education and Industry Innovation',
    title: 'Bridging Education and Industry Innovation',
    desc: 'Projects Day showcases real-world projects from science and engineering students.',
    href: '#'
  },
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
      <div class="section-heading">
        <div class="section-subtitle">LEGENDARY LEADERS</div>
        <h2 id="carousel-heading" class="section-title">Legends are made at Seattle University</h2>
      </div>


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
            <div class="slide-link-holder">
              <a class="slide-link" :href="item.href">Learn more →</a>
            </div>
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
  padding: 100px 0;

}

.section-heading {
  text-align: center;
  margin-bottom: 2rem;

  max-width:700px;
  margin: 0 auto;

  .section-subtitle {
    color: var(--Black, #000);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 18 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 170%; /* 30.6px */
  }
  h2{
    color: var(--Black, #000);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* H2 - Oswald */
    font-family: Oswald;
    font-size: 62px;
    font-style: normal;
    font-weight: 700;
    line-height: 70px; /* 112.903% */
    text-transform: uppercase;
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
  background: var(--Digital-SU-Red); /* rich red */
  color: #fff;
  padding: 40px 20px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;

  .slide-title {
    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* H5 */
    font-family: Montserrat;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px; /* 121.429% */
    margin-bottom:0px;
  }

  .slide-desc {
    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 16 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 25.6px */
    margin-bottom:0px;
  }
  .slide-link-holder{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .slide-link {
    display:inline-block;
    color: var(--White, #FFF);
    font-family: Montserrat;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 21.25px */
    border-bottom:1px solid #fff;
    text-decoration: none;
    &:hover { border-color: #fff; opacity: 0.95; }
  }

}


</style>
