<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


import PhotoGrid from '../assets/images/Photo_GRID.jpg'
import PhotoGridMobile from '../assets/images/Photo_GRID_MOBILE.jpg'

const section = ref(null)
let ctx

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    // Animate each card when it scrolls into view
    gsap.utils.toArray('.feature-card').forEach((card) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',                 // fire per-card
          toggleActions: 'play none none reverse'
          // markers: true,
        }
      })
    })
  }, section)
})

onBeforeUnmount(() => {
  ctx && ctx.revert()
})
</script>

<template>
  <section id="features" class="section features" ref="section">
    <div class="bg-imagery">
      <img
        ref="imgEl"
        class="bg-img d-md-block d-none"
        :src="PhotoGrid"
        alt=""
        aria-hidden="true"
      />

      <img
        ref="imgEl"
        class="bg-img d-block d-md-none"
        :src="PhotoGridMobile"
        alt=""
        aria-hidden="true"
      />
    </div>
    <div class="bg-overlay" aria-hidden="true"></div>

    <div class="container">
      <div class="section-heading">
        <div class="section-subtitle">Be Legendary</div>
        <h2 class="section-title">Explore your purpose at Seattle University</h2>
      </div>

      <div class="card-grid">
        <div class="card feature-card">
          <div class="subtitle">UNDERGRADS</div>
          <h3>Begin your legend</h3>
          <p>Discover academic excellence, opportunities and life-changing experiences</p>
          <div class="btn-group">
            <a href="#" class="btn btn-primary">Apply Now</a>
          </div>
        </div>

        <div class="card feature-card">
          <div class="subtitle">GRAD STUDENTS</div>
          <h3>Grow your legend</h3>
          <p>Advance your career and your future in one of 50 graduate degree programs.</p>
          <div class="btn-group">
            <a href="#" class="btn btn-primary">Explore grad school</a>
          </div>
        </div>

        <div class="card feature-card">
          <div class="subtitle">ALUMNI</div>
          <h3>Celebrate your legend</h3>
          <p>Stay connected with a global community that leads, serves and inspires.</p>
          <div class="btn-group">
            <a href="#" class="btn btn-primary">Connect now</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

$accent: #e63946; /* Example accent color, replace with your brand color */
/* Section with fixed background (unchanged) */
.features {
  position: relative;
  .container {
    z-index: 1;
    position: relative;
  }
}

.bg-imagery {
  position: absolute;
  inset: 0;
  width: 100%;
  overflow: hidden;
  will-change: transform;

  &:before{
    content:'';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.30) 0%, #000 100%);
    pointer-events: none;
    z-index: 1;
    width:100%;
    height:100%;
  }

  img{
    width: 100%;
    height: 120%;   
    object-fit: cover;
  }
}


.section-heading{
  max-width:800px;
  margin:0px auto 70px;
  text-align: center;
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
  .section-title{
    color: var(--White, #FFF);
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
/* Extra bottom padding so overlapped buttons don't get clipped */
.section.features { padding: 6rem 0 7.5rem; }

.card-grid {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: 1fr;

  @media (min-width: 760px) {
    grid-template-columns: repeat(3, 1fr);
  }
  .card{
      @media (min-width: 760px) {
    grid-column:auto;
      }
  }
}

/* Transparent card with white border; leave room for overlapped button */
.card.feature-card {
  position: relative;
  background: transparent;
  color: #fff;
  border: 0.5px solid var(--White, #FFF);

  padding: 40px;
  overflow: visible; /* allow button to hang past the border */

  .subtitle {
    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 18px */
    margin-bottom: 24px;
  }

  h3 { 
    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Oswald;
    font-size: 50px;
    font-style: normal;
    font-weight: 700;
    line-height: 60px; /* 120% */
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  p  { 
    
    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 16 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 25.6px */
   }

  /* Overlapping button */

  .btn-group {
    position: absolute;
    left: 0px;
    bottom: -18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .btn.btn-primary {
    display:inline-block;
        width: auto;
    flex: 0 1 auto;

    padding: .75rem 1.1rem;


    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* CTA */
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 133.333% */

    text-decoration: none;
    border: transparent;
    border-radius: 3px;
    background: var(--Digital-SU-Red, #A00);



    transition: transform .1s ease;
    &:active { transform: translateY(1px); }
  }
}
</style>
