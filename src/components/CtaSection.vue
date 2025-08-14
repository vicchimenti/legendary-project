<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
let ctx

// Example data (swap with your content/CMS later)
const ctas = [
  {
    title: 'Hands-on learning that moves you forward',
    desc: `Tackle real projects with mentors and industry partners. 
           Build a portfolio that speaks for itself.`,
    img:  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    alt:  'Students collaborating on a project',
    buttons: [
      { label: 'Explore programs', href: '#', primary: true },
      { label: 'Talk to an advisor', href: '#' }
    ]
  },
  {
    title: 'A community that champions your purpose',
    desc:  `Find your people, lead with conviction, and make a measurable impact—on campus and beyond.`,
    img:   'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop',
    alt:   'Campus community gathering outdoors',
    buttons: [
      { label: 'Campus life', href: '#', primary: true },
      { label: 'Clubs & orgs', href: '#' }
    ]
  },
  {
    title: 'Career outcomes that open doors',
    desc:  `Internships, networks, and advising that translate your passion into a path.`,
    img:   'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop',
    alt:   'Graduate at a city overlook',
    buttons: [
      { label: 'Career services', href: '#', primary: true },
      { label: 'Alumni stories', href: '#' }
    ]
  }
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

// use html variables for colors
$bg: #AC0002;        
$card: #0b1224;      // slightly different for depth
$text: #e2e8f0;      // slate-200
$muted: #94a3b8;     // slate-400
$accent: #38bdf8;    // sky-400

/* Very light grey background for the whole section */
.cta-alt {
  background: #f5f7fa; // adjust if you have a $sectionLight var
  padding: 6rem 0;

  .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
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
    width: 100%;
    height: clamp(220px, 40vw, 420px);
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid rgba($accent, 0.12);
    box-shadow: 0 16px 40px rgba(0,0,0,0.18);
    background: $card;
    display: block;
  }

  /* When reversed, move media to the right on desktop */
  .reverse & { order: 2; }
  @media (max-width: 960px) { order: 1 !important; }
}

/* Copy column */
.cta-copy {
  order: 2;
  .reverse & { order: 1; }

  .cta-title {
    font-weight: 900;
    letter-spacing: .02em;
    line-height: 1.15;
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin: 0 0 .5rem;
    color: $bg ; // fallback if vars not present
  }

  .cta-desc {
    color: $muted;
    margin: 0 0 1.25rem;
    max-width: 60ch;
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

  &:active { transform: translateY(1px); }
}

.btn--primary {
  background: $accent;
  color: #061018;
  border-color: rgba($accent, .2);
  box-shadow: 0 8px 20px rgba(0,0,0,.15);

  &:hover { box-shadow: 0 10px 26px rgba(0,0,0,.2); }
}

.btn--ghost {
  background: transparent;
  color: #0f172a;
  border-color: rgba(0,0,0,.12);

  &:hover { background: rgba(0,0,0,.04); }
}

/* Visually hidden */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
</style>
