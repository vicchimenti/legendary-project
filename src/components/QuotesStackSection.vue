<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
let ctx

// FPO data — swap with CMS/props
const quotes = [
  {
    quote: "This place didn’t just change my résumé, it changed my aim.",
    who: "Jordan M.",
    what: "Computer Science ’25"
  },
  {
    quote: "I found mentors who expect big things—and help me get there.",
    who: "Anika R.",
    what: "Mechanical Engineering ’26"
  },
  {
    quote: "Purpose isn’t a slogan here. It’s the work we do every day.",
    who: "Luis F.",
    what: "Public Policy ’24"
  },
  {
    quote: "Being in the city means what we learn moves—fast.",
    who: "Sam K.",
    what: "Marketing ’25"
  },
  {
    quote: "Community is why I came. Opportunity is why I stay.",
    who: "Maya T.",
    what: "Nursing ’26"
  }
]

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    const lines = section.value.querySelectorAll('.q-item')

    // Set the first one active on load (in case the user lands mid-page)
    if (lines[0]) lines[0].classList.add('is-active')

    lines.forEach((el) => {
      // Toggle active class when the quote's center crosses viewport middle
      ScrollTrigger.create({
        trigger: el,
        start: 'center 60%',
        end: 'center 40%',
        toggleClass: { targets: el, className: 'is-active' }
        // markers: true
      })

      // Optional: smooth size/opacity change tied to scroll
      gsap.fromTo(
        el,
        { opacity: 0.35, scale: 0.99 },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'center 70%',
            end: 'center 30%',
            scrub: true
          }
        }
      )
    })
  }, section)
})

onBeforeUnmount(() => {
  ctx && ctx.revert()
})
</script>

<template>
  <section class="quotes-stack" ref="section" aria-labelledby="quotes-heading">
    <div class="container">
      <h2 id="quotes-heading" class="sr-only">Student & Alumni Quotes</h2>

      <ul class="q-list" role="list">
        <li
          v-for="(q, i) in quotes"
          :key="i"
          class="q-item"
        >
          <figure class="q-figure">
            <blockquote class="q-text">
              {{ q.quote }}
            </blockquote>
            <figcaption class="q-meta">
              <div class="q-who">{{ q.who }}</div>
              <div class="q-what">{{ q.what }}</div>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.quotes-stack {
  background: var(--Digital-SU-Red);
  padding: 6rem 0;

  .container { max-width: 900px; margin: 0 auto; padding: 0 2rem; }
}

/* Vertical stack */
.q-list {
  display: grid;
  gap: 3.5rem;
  list-style:none;

  @media (min-width: 960px) { gap: 4.5rem; }
}

/* A single quote row */
.q-item {
  position: relative;
  opacity: .35;
  transition: opacity .25s linear, transform .25s ease;
  will-change: transform, opacity;

  &.is-active { opacity: 1; }
}

.q-figure { margin: 0; }

.q-text {
  position: relative;
  color: var(--White, #FFF);
  font-feature-settings: 'liga' off, 'clig' off;

  /* H5 */
  font-family: Montserrat;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px; /* 121.429% */

  /* Big framing quotation marks only when active */
  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s ease, transform .25s ease;
  }

  /* stylized quotes using pseudo elements */
  .is-active &::before {
    content: "“";
    left: -0.55em;
    top: -0.25em;
    font-size: clamp(3rem, 10vw, 5.5rem);
    color: rgba(200, 30, 30, 0.18); /* soft red tint */
    opacity: 1;
    transform: translateY(-6px);
  }

  .is-active &::after {
    content: "”";
    right: -0.4em;
    bottom: -0.6em;
    font-size: clamp(3rem, 10vw, 5.5rem);
    color: rgba(200, 30, 30, 0.18);
    opacity: 1;
    transform: translateY(6px);
  }
}

.q-meta {
  color: var(--Yellow, #FDB913);
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 155.556% */
}

/* Accessibility helper */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
</style>
