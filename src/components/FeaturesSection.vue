<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

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
    <div class="bg-overlay" aria-hidden="true"></div>

    <div class="container">
      <div class="sub-heading">Be Legendary</div>
      <h2 style="margin-bottom:1rem;">Explore your purpose at Seattle University</h2>

      <div class="card-grid">
        <div class="card feature-card">
          <div class="subtitle">UNDERGRADS</div>
          <h3>Begin your legend</h3>
          <p>Discover academic excellence, opportunities and life-changing experiences</p>
          <a href="#" class="btn btn-primary">Apply Now</a>
        </div>

        <div class="card feature-card">
          <div class="subtitle">GRAD STUDENTS</div>
          <h3>Grow your legend</h3>
          <p>Advance your career and your future in one of 50 graduate degree programs.</p>
          <a href="#" class="btn btn-primary">Explore grad school</a>
        </div>

        <div class="card feature-card">
          <div class="subtitle">ALUMNI</div>
          <h3>Celebrate your legend</h3>
          <p>Stay connected with a global community that leads, serves and inspires.</p>
          <a href="#" class="btn btn-primary">Connect now</a>
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
  background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: clip;

  @supports (-webkit-touch-callout: none) {
    background-attachment: scroll;
  }
}

/* Dark overlay for readability */
.bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  pointer-events: none;
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
  border: 1px solid rgba(255,255,255,0.9);
  border-radius: 16px;
  padding: 1.25rem 1.25rem 3.25rem; /* extra bottom space for the overlapped button */
  overflow: visible; /* allow button to hang past the border */

  .subtitle {
    font-weight: 800;
    font-size: .85rem;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: rgba(255,255,255,.85);
    margin-bottom: .4rem;
  }

  h3 { margin: 0 0 .4rem; }
  p  { color: rgba(255,255,255,.85); margin: 0 0 1.1rem; }

  /* Overlapping button */
  .btn.btn-primary {
    position: absolute;
    left: 1.25rem;
    bottom: -18px;                 /* hangs over the border */
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: .75rem 1.1rem;
    border-radius: 999px;
    background: $accent;           /* or your brand red */
    color: #061018;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid rgba(0,0,0,.06);

    /* white ring to emphasize overlap + soft shadow */
    box-shadow:
      0 0 0 2px #fff,              /* white ring sitting on the card border */
      0 10px 22px rgba(0,0,0,.25);

    transition: transform .1s ease, box-shadow .15s ease;
    &:active { transform: translateY(1px); }
  }
}
</style>
