<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
let ctx
let onWinLoad

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    // 1) Line-by-line fade to white as each crosses the viewport middle
    const lines = section.value.querySelectorAll('.rally-line')
    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { opacity: 0.1 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top center',     // starts as the line enters middle
            end: 'bottom center',    // finishes as it passes the middle
            scrub: true,
            // markers: true,         // <-- uncomment to debug
          }
        }
      )
    })

    // 2) Each image animates in individually at the same middle point
    const images = section.value.querySelectorAll('.rally-img')
    images.forEach((img, i) => {
      gsap.from(img, {
        y: i % 2 ? 30 : -30,
        opacity: 0,
        rotate: i % 2 ? 2 : -2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          // markers: true,          // <-- uncomment to debug
        }
      })
    })
  }, section)

  // Images loading can change layout; refresh triggers after load.
  onWinLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onWinLoad)

  // If you lazy-load images, also refresh after each loads:
  section.value.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('load', onWinLoad)
  ctx && ctx.revert()
})
</script>



<template>
  <section class="rally" ref="section" aria-labelledby="rally-heading">
    <div class="rally-grid">
      <!-- Left images (decorative) -->
      <div class="rally-images left" aria-hidden="true">
      </div>

      <!-- Center pinned text -->
      <div class="rally-center">
        <h2 id="rally-heading" class="sr-only">Rally Cry</h2>
        <div ref="textEl" class="rally-cry-block" role="text" aria-label="Rally message">
          <p class="rally-line">In the Heart of the Pacific Northwest, in a city of influence,</p>
          <p class="rally-line">it takes Big Dreams inspiration and dedication to make your story legendary.</p>
          <p class="rally-line">Whether your path is clearly marked or you're sketching it out as you go,</p>
          <p class="rally-line">Seattle University is the place to be in the spotlight.</p>
          <p class="rally-line">be on the Forefront.</p>
          <p class="rally-line">be unstoppable</p>
          <p class="rally-line">be for others</p>
          <p class="rally-line">and be a leader with purpose who shapes the world with passion.</p>
        </div>
      </div>

      <!-- Right images (decorative) -->
      <div class="rally-images right" aria-hidden="true">
      </div>
    </div>
    <div class="rally-logo" aria-hidden="true">
      <img src="../assets/images/Desktop_Logo.svg" alt="Seattle University Logo" />

    </div>
  </section>
</template>

<style lang="scss" scoped>
.rally {
  padding: 8rem 0 6rem;
  position: relative;
  overflow: clip;

  .rally-grid {
    display: grid;
    grid-template-columns: 1fr minmax(0, 700px) 1fr;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
    }
  }

  .rally-center {
    text-align: center;
    padding: 2rem 1rem;
  }

  .rally-cry-block {
    color: #FFF;

    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Oswald;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 133.333% */
    text-transform: uppercase;
    p {
      margin: 0 0 1rem;
      &:last-child { margin-bottom: 0; }
    }
  }

  .rally-images {
    display: grid;
    gap: 1rem;

    // create a staggered collage feel
    grid-template-rows: repeat(6, 60px);
    grid-auto-flow: row;

    // .rally-img {
    //   width: 100%;
    //   height: 180px;
    //   object-fit: cover;
    //   border-radius: 1rem;
    //   border: 1px solid rgba(#fff, 0.12);
    //   box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    //   transform: translateZ(0);
    
    // }

    // &.left {
    //   .rally-img:nth-child(1) { grid-row: 1 / span 3; }
    //   .rally-img:nth-child(2) { grid-row: 3 / span 3; }
    //   .rally-img:nth-child(3) { grid-row: 5 / span 3; }
    // }

    // &.right {
    //   .rally-img:nth-child(1) { grid-row: 2 / span 3; }
    //   .rally-img:nth-child(2) { grid-row: 4 / span 3; }
    //   .rally-img:nth-child(3) { grid-row: 1 / span 3; }
    // }



    @media (max-width: 960px) {
      display: none; // hide side images on small screens; keep focus on the text
    }
  }

  .rally-logo{
    display:flex;
    justify-content: center;
    align-items: center;
    padding:8em 0 0em;
    img{
      width: 175px;
    }
  }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }
}
</style>
