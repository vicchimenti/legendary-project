<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUiStore } from '../stores/ui' 

gsap.registerPlugin(ScrollTrigger)

const ui = useUiStore()

import DesktopLogo from '../assets/images/Desktop_Logo.svg'


const section = ref(null)
let ctx
let onWinLoad

let tMid = null
let tTop = null

onMounted(async () => {
  await nextTick()

  const scopeEl = section.value


 // 1) Show rally-cry-1 when section TOP reaches middle of viewport
  tMid = ScrollTrigger.create({
    trigger: section.value,
    start: 'top 50%',
    end: 'bottom top',
    // markers: true,
    onEnter:     () => ui.setBgSlide('rally-cry-1'),
    onEnterBack: () => ui.setBgSlide('rally-cry-1'),
    onLeaveBack: () => ui.setBgSlide(null),      // scrolling up above mid -> hide
  })

  // 2) Swap to rally-cry-2 when section TOP reaches the top of the viewport
  tTop = ScrollTrigger.create({
    trigger: section.value,
    start: 'top top', // same as 'top 0%'
    end: 'bottom top',
    // markers: true,
    onEnter:     () => ui.setBgSlide('rally-cry-2'),
    onEnterBack: () => ui.setBgSlide('rally-cry-2'),
    onLeaveBack: () => ui.setBgSlide('rally-cry-1'), // going back down -> return to first
  })





  // rally lines
  ctx = gsap.context(() => {
    const lines = gsap.utils.toArray('.rally-line', scopeEl)
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
  
  }, scopeEl)


  // logo resize
  gsap.fromTo(
    '.rally-logo svg',
    { width: 125 },     // starting size
    {
      width: 350,       // ending size
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,   
        start: 'center center',  
        end: 'bottom center',
        scrub: true,
        // markers: true,          // enable for debugging
      }
    }
  )

})

onBeforeUnmount(() => {
  tMid?.kill()
  tTop?.kill()
  tMid = tTop = null
  window.removeEventListener('load', onWinLoad)
  ctx && ctx.revert()
})
</script>

<template>
  <section class="rally" ref="section" aria-labelledby="rally-heading">
    <div class="rally-grid">

      <div class="rally-images left" aria-hidden="true">
      </div>


      <div class="rally-center">
        <h2 id="rally-heading" class="sr-only">Rally Cry</h2>
        <div ref="textEl" class="rally-cry-block" role="text" aria-label="Rally message">
          <p class="rally-line">In the heart of the Pacific Northwest, In a city of influence, </p>
          <p class="rally-line">It takes big dreams, inspiration, and dedication to make your story legendary. </p>
          <p class="rally-line">Whether your path is clearly marked or you're sketching it out as you go, </p>
          <p class="rally-line">Seattle University is the place to be in the spotlight. </p>
          <p class="rally-line">Be a leader with purpose who shapes the world with passion. </p>
          <p class="rally-line">Be on the forefront.</p>
          <p class="rally-line">Be unstoppable.</p>
          <p class="rally-line">Be for others.</p>
          <p class="rally-line">Seattle University.</p>
          <p class="rally-line">Be legendary.</p>
        </div>
      </div>


      <div class="rally-images right" aria-hidden="true">
      </div>
    </div>
    <div class="rally-logo" aria-hidden="true">
      <DesktopLogo alt="Seattle University Logo" style="fill:white; width:170px;"/>
    </div>
  </section>
</template>



<style lang="scss" scoped>

.rally {
  padding: 4rem 1em 6rem;
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

    @include media-breakpoint-down(md) {
      font-size: 22px;

      line-height: 28px;
    }
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
    padding:4em 1em 0em;

  }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }
}
</style>
