<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


import ResultsImage from '../assets/images/RESULTS_IMAGE.jpg'
import ResultsImageMobile from '../assets/images/RESULTS_IMAGE_MOBILE.jpg'

const section = ref(null)
const imgEl = ref(null)
const card = ref(null)
let ctx
let onWinLoad

// FPO stats — swap with props/CMS later
const stats = [
  { value: '#1', title: 'Economically Diverse University in WA', desc: `The New York Times College-Access Index noted that we're the most economically diverse selective university in Washington.` },
  { value: '11:1', title: 'Student-to-Faculty Ratio', desc: 'Small classes led by talented faculty to foster active learning, an SU hallmark.' },
  { value: '96%', title: 'Success Rate', desc: 'Most Redhawks are employed or in grad school within 6 months of graduation.' }
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
        class="legendary-img d-md-block d-none"
        :src="ResultsImage"
        alt=""
        aria-hidden="true"
      />

      <img
        ref="imgEl"
        class="legendary-img d-block d-md-none"
        :src="ResultsImageMobile"
        alt=""
        aria-hidden="true"
      />

      <div class="legendary-overlay"></div>

      <!-- Left overlay text -->
      <div class=" container">
        <div class="section-heading">
          <span class="section-subtitle">LEGENDARY RESULTS</span>
          <h2 id="legendary-heading" class="section-title">PUT YOUR STORY IN MOTION</h2>
        </div>
      </div>
    </div>

    <!-- Red cutout stats card that pulls up into the image -->
    <div class="container">
      <aside class="legendary-stats" ref="card">
        <div class="inner">
          <ul class="stats-grid" role="list">
            <li v-for="(s, i) in stats" :key="i" class="stat">
              <div class="stat-value">{{ s.value }}</div>
              <div class="stat-title">{{ s.title }}</div>
              <div class="stat-desc">{{ s.desc }}</div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.legendary {
  background: var(--Digital-SU-Red); // page section background
  .container{
    position: relative;
    height: 100%;

  }
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
.section-heading {
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  color: #fff;
  z-index: 1;

  .section-subtitle {
    color: var(--White, #FFF);
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 18 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 170%; /* 30.6px */
  }

  .section-title {
    color: var(--White, #FFF);
    font-feature-settings: 'liga' off, 'clig' off;

    /* H2 - Oswald */
    font-family: Oswald;
    font-size: 62px;
    font-style: normal;
    font-weight: 700;
    line-height: 70px; /* 112.903% */
    text-transform: uppercase;
    max-width:465px;
  }
}


.legendary-stats {
  position: relative;
  background: var(--Digital-SU-Red); 
  color: #fff;


  margin-top: -150px;
  margin-left: 280px;
  width: auto;
  .inner{
    padding: 40px 0px 0px 70px;
  }

  @media (max-width: 960px) {
    margin-top: -140px;
    width: 92%;
  }

  &:before{
    content:"";
    position: absolute; 
    width:50vw;
    left:50%;
    height: 100%;
    background-color: var(--Digital-SU-Red);
    z-index: -1;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  list-style: none;
  margin: 0px;
  padding: 0px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
}

.stat {
  .stat-value {
    color: var(--White, #FFF);
    font-family: "Roboto Slab";
    font-size: 112px;
    font-style: normal;
    font-weight: 200;
    line-height: 150%; /* 168px */
  }
  .stat-title {
    color: var(--White, #FFF);

    /* Mobile/H4/Regular */
    font-family: Montserrat;
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 29.4px */
  }
  .stat-desc {
    color: var(--White, #FFF);
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 16 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 25.6px */
  }
}
</style>
