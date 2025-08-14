<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
const imgEl = ref(null)
const card = ref(null)
let ctx
let onWinLoad

// FPO stats — swap with props/CMS later
const stats = [
  { value: '98%', title: 'Career Outcomes', desc: 'Graduates employed or in grad school within 6 months.' },
  { value: '200+', title: 'Industry Partners', desc: 'Active collaborations driving real-world projects.' },
  { value: '#1', title: 'Service & Impact', desc: 'Recognized regionally for community engagement.' }
]

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Parallax: move image gently as you scroll past the section
    if (!prefersReduced) {
      gsap.fromTo(
        imgEl.value,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section.value,
            start: 'top bottom',   // when section enters viewport
            end: 'bottom top',     // until it leaves
            scrub: true
          }
        }
      )

      // Stats card reveal
      gsap.from(card.value, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card.value,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    }
  }, section)

  // Keep triggers accurate after media load / layout shift
  onWinLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onWinLoad)
})

onBeforeUnmount(() => {
  window.removeEventListener('load', onWinLoad)
  ctx && ctx.revert()
})
</script>

<template>
  <section class="legendary" ref="section" aria-labelledby="legendary-heading">
    <!-- Parallax image area -->
    <div class="legendary-hero">
      <img
        ref="imgEl"
        class="legendary-img"
        src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2400&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
      />
      <div class="legendary-overlay"></div>

      <!-- Left overlay text -->
      <div class="legendary-copy container">
        <h2 id="legendary-heading" class="legendary-kicker">Legendary Results</h2>
        <p class="legendary-title">PUT YOUR STORY IN MOTION.</p>
      </div>
    </div>

    <!-- Red cutout stats card that pulls up into the image -->
    <div class="container">
      <aside class="legendary-stats" ref="card">
        <ul class="stats-grid" role="list">
          <li v-for="(s, i) in stats" :key="i" class="stat">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-title">{{ s.title }}</div>
            <div class="stat-desc">{{ s.desc }}</div>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.legendary {
  background: #AC0002; // page section background

  .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
}

/* Full-width parallax image area */
.legendary-hero {
  position: relative;
  height: clamp(420px, 70vh, 600px);
  overflow: hidden;
}

.legendary-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 120%;           /* extra height to hide parallax edges */
  object-fit: cover;
  will-change: transform;
}

/* soft dark gradient for text readability */
.legendary-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0) 70%);
  pointer-events: none;
}

/* Left overlay copy */
.legendary-copy {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .legendary-kicker {
    color: #fff;
    opacity: .9;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    margin: 0 0 .25rem;
    font-size: clamp(.9rem, 1.6vw, 1rem);
  }

  .legendary-title {
    color: #fff;
    margin: 0;
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: .02em;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
  }
}

/* Red cutout stats card */
.legendary-stats {
  position: relative;
  background: #AC0002; // red
  color: #fff;


  /* Pull up into the bottom-right of the image by ~170px */
  margin-top: -100px;
  margin-left: auto;       /* align right */
  width: min(100%, 680px); /* control max width */
  padding: 1.25rem 1.25rem 1.4rem;

  @media (max-width: 960px) {
    margin-top: -140px;
    width: 92%;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
}

.stat {
  .stat-value {
    font-weight: 900;
    font-size: clamp(1.75rem, 4.5vw, 2.5rem);
    line-height: 1;
    margin-bottom: .35rem;
  }
  .stat-title {
    font-weight: 800;
    letter-spacing: .02em;
    margin-bottom: .25rem;
  }
  .stat-desc {
    opacity: .95;
    line-height: 1.45;
  }
}
</style>
