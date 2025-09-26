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


      // Stats: sequential reveal (left -> right), fade + slide up
      const items = gsap.utils.toArray('.stats-grid .stat', section.value)

      if (items.length) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
          gsap.set(items, { y: 0, autoAlpha: 1 })
        } else {
          gsap.set(items, { y: 100, autoAlpha: 0 }) // start slightly below and hidden

          gsap.to(items, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: { each: 0.25, from: 'start' }, 
            scrollTrigger: {
              trigger: card.value,     // start when the card is nearing view
              start: 'top 85%',
              toggleActions: 'play none none reverse', // reverse on scroll up; use 'play none none none' for once
              // markers: true,
            }
          })
        }
      }








    }
  }, section.value)

  // // Keep triggers accurate after media load / layout shift
  // onWinLoad = () => ScrollTrigger.refresh()
  // window.addEventListener('load', onWinLoad)
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
      <div class="legendary-hero-image" />
      <!-- <img
        ref="imgEl"
        class="legendary-img d-md-block d-none"
        :src="ResultsImage"
        alt=""
        aria-hidden="true"
      /> -->

      <!-- <img
        ref="imgEl"
        class="legendary-img d-block d-md-none"
        :src="ResultsImageMobile"
        alt=""
        aria-hidden="true"
      /> -->

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
  overflow:hidden;
  .container{
    position: relative;
    height: 100%;

    @include media-breakpoint-down(md) {
      padding:0px;
    }

  }
}

/* Full-width parallax image area */
.legendary-hero {
  position: relative;
  height: clamp(420px, 70vh, 600px);
  overflow: hidden;
}
.legendary-hero-image{
  position: absolute;
  inset: 0;
  background-image: url('@/assets/images/RESULTS_IMAGE.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;

  @include media-breakpoint-down(md) {
    background-image: url('@/assets/images/RESULTS_IMAGE_MOBILE.jpg');
    background-position: top;
  }
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

  @include media-breakpoint-down(md) {
    top: unset;
    bottom: 20px;
    transform: none;
  }

  .section-subtitle {
    color: var(--White, #FFF);
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 18 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 170%; /* 30.6px */
    @include media-breakpoint-down(md) {
      font-size: 14px;
      line-height: 170%;
    }
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
    @include media-breakpoint-down(md) {
      font-size: 32px;

      line-height: 36px;
    }
  }
}


.legendary-stats {
  position: relative;
  background: var(--White, #FFF);
  color: var(--Digital-SU-Red);


  margin-top: -150px;
  margin-left: 280px;
  width: auto;
  @include media-breakpoint-down(md) {
    margin-left: 0px;
    width: auto !important;
    margin-top: 0px !important;
  }
  .inner{
    padding: 40px 0px 60px 70px;

    @include media-breakpoint-down(md) {
      padding: 0px 30px 40px 30px;
    }
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
    background-color: var(--White, #FFF);
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
    color: var(--Digital-SU-Red);
    font-family: "Roboto Slab";
    font-size: 112px;
    font-weight: 700;
    line-height: 150%; /* 168px */

    @include media-breakpoint-down(md) {

    }
  }
  .stat-title {
    color: var(--Digital-SU-Red);

    /* Mobile/H4/Regular */
    font-family: Montserrat;
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 29.4px */

      @include media-breakpoint-down(md) {

    }
  }
  .stat-desc {
    color: var(--Digital-SU-Red);
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 16 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 25.6px */

    @include media-breakpoint-down(md) {
      font-size: 17px;

      line-height: 150%;

      display:none;
    }
  }
}
</style>
