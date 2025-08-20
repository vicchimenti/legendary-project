<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


import UndergradImg from '../assets/images/Seattle-U-UL-Undergrad-1-R3-1.jpg'
import GradImg      from '../assets/images/Seattle-U-UL-Grad-1-R3-2.jpg'

const section = ref(null)
let ctx

const ctas = [
  {
    subtitle: 'UNDERGRADS',
    title: 'Small Classes, Big Wins',
    desc: `Discover rigorous academic excellence, thousands of internship and career opportunities, and life-changing experiences in an inspiring community.`,
    img:  UndergradImg,
    alt:  'person standing in front of the seattle skyline',
    buttons: [
      { label: 'Get Started', href: '#', primary: true },
      // { label: 'Talk to an advisor', href: '#' }
    ]
  },
  {
    subtitle: 'GRAD STUDENTS',
    title: 'TRANSFORM YOURSELF AND THE WORLD',
    desc:  `Advance your career in one of 50 graduate degree programs, network with industry leaders, and build your future in a city propelled by innovators, artists, and adventurers. `,
    img:  GradImg,
    alt:  'person standing in front of the seattle skyline',
    buttons: [
      { label: 'Get Started', href: '#', primary: true },

    ]
  },

]

onMounted(async () => {
  await nextTick()
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    const rows = section.value.querySelectorAll('.cta-row')
    rows.forEach((row) => {
      const isReverse = row.classList.contains('reverse')
      const img = row.querySelector('.cta-media')
      const copy = row.querySelector('.cta-copy')

      if (!prefersReduced) {
        gsap.from(img, {
          x: isReverse ? 40 : -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })

        gsap.from(copy, {
          x: isReverse ? -30 : 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      }
    })
  }, section)
})

onBeforeUnmount(() => {
  ctx && ctx.revert()
})
</script>

<template>
  <section class="cta-alt" ref="section" aria-labelledby="cta-alt-heading">
    <h2 id="cta-alt-heading" class="sr-only">Calls to Action</h2>
    <div class="container">
      <div
        v-for="(item, i) in ctas"
        :key="i"
        class="cta-row"
        :class="{ reverse: i % 2 === 1 }"
      >
        <div class="cta-media">
          <img
            :src="item.img"
            :alt="item.alt"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div class="cta-copy">
          <div class="cta-subtitle">{{ item.subtitle }}</div>
          <h3 class="cta-title">{{ item.title }}</h3>
          <p class="cta-desc">{{ item.desc }}</p>

          <div class="cta-actions">
            <a
              v-for="(btn, j) in item.buttons"
              :key="j"
              :href="btn.href"
              class="btn"
              :class="{ 'btn--primary': btn.primary, 'btn--ghost': !btn.primary }"
            >{{ btn.label }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>



.cta-alt {
  background: #f5f7fa;
  padding: 6rem 0;

  .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }


  background:  url('../assets/images/TEXTURE_BG_.jpg');
  background-repeat: repeat;
  background-position: right;
  background-size: 100% auto;

}

/* One row per CTA */
.cta-row {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 2.25rem;
  align-items: center;
  margin: 0 0 3rem;
  padding: 1rem 0;

  &:last-child { margin-bottom: 0; }

  &.reverse { grid-template-columns: 1fr 1.15fr; }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    &.reverse { grid-template-columns: 1fr; }
  }
}

/* Image */
.cta-media {
  order: 1;
  & img {

     --bleed: clamp(0px, 8vw, 120px); 

    display: block;
    width: calc(100% + var(--bleed) * 2);
    margin-left: calc(var(--bleed) * -1);
    margin-right: calc(var(--bleed) * -1);
    height: auto;
    object-fit: cover;

    @media (max-width: 960px) {
      :root { --bleed: 0px; }
    }
  }

  /* When reversed, move media to the right on desktop */
  .reverse & { order: 2; }
  @media (max-width: 960px) { order: 1 !important; }
}

/* Copy column */
.cta-copy {
  order: 2;
  z-index: 1;
  .reverse & { order: 1; }

  .cta-subtitle {
    color: var(--Black, #000);
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 18 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 170%; /* 30.6px */
    margin-bottom:8px;
    text-transform: uppercase;
  }
  .cta-title {
    color: var(--Digital-SU-Red, #A00);
    font-feature-settings: 'liga' off, 'clig' off;

    /* H2 - Oswald */
    font-family: Oswald;
    font-size: 62px;
    font-style: normal;
    font-weight: 700;
    line-height: 70px; /* 112.903% */
    text-transform: uppercase;
    margin-bottom:8px;
    margin-bottom: 8px;
    margin-top: 0px;
  }

  .cta-desc {
    color: var(--Black, #000);
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 16 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 25.6px */
  }

  .cta-actions {
    display: flex; flex-wrap: wrap; gap: .75rem;
  }
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: .75rem 1.1rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform .12s ease, box-shadow .12s ease;

  color: var(--White, #FFF);
  font-feature-settings: 'liga' off, 'clig' off;
  /* CTA */
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 133.333% */



  &:active { transform: translateY(1px); }
}

.btn--primary {
  border-radius: 3px;
  background: var(--Digital-SU-Red, #A00);
  color:#fff;
  &:hover { box-shadow: 0 10px 26px rgba(0,0,0,.2); }
}



/* Visually hidden */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
</style>
