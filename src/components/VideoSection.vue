<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Player from "@vimeo/player";

gsap.registerPlugin(ScrollTrigger)

import VideoIcon from '../assets/images/circle-play-solid-full.svg'
import Close from '../assets/images/CLOSE.svg'
import VideoPlaceholder from '../assets/images/VideoPlaceholder.avif'

const section = ref(null)
let ctx


let onWinLoad


let isPaused = ref(false);
let player = null;
let unsubs = [];

const isOpen = ref(false);

const vimeoId = 1003737596; 

const embedUrl = computed(() => {
  const origin = encodeURIComponent(window.location.origin);
  return `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&portrait=0&playsinline=1&dnt=1&origin=${origin}`;
});

async function togglePlayback() {


  try {
    const paused = await player.getPaused();
    if (paused) await player.play();
    else await player.pause();

  } catch (e) {
    console.warn("togglePlayback failed, retrying init:", e);
    try {
      const paused = await player.getPaused();
      if (paused) await player.play();
      else await player.pause();
    } catch (e2) {
      console.error("togglePlayback retry failed:", e2);
    }
  }

  try { isPaused.value = await player.getPaused(); } catch {}

}

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

onMounted(async () => {
  await nextTick()

  player = new Player("bgVimeo");


  // ctx = gsap.context(() => {


  //   // Optional: lift the video box in
  //   gsap.from('.video-wrap', {
  //     y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
  //     scrollTrigger: { trigger: section.value, start: 'top 85%' }
  //   })
  // }, section)

  // Refresh after media loads so positions are accurate

  window.addEventListener('load', onWinLoad)
  section.value.querySelectorAll('video').forEach(v => {
    v.addEventListener('loadeddata', () => ScrollTrigger.refresh(), { once: true })
  })



})



onBeforeUnmount(() => {

  unsubs.forEach((fn) => fn());
  unsubs = [];
  player?.unload();

  window.removeEventListener('load', onWinLoad)
  ctx && ctx.revert()
})
</script>



<template>
  <section class="video-section section" ref="section" aria-labelledby="video-heading">
    <div class="video-tagline-mobile d-block d-md-none">your story is just getting started</div>
    <div class="video-section-inner">
      <div class="container">
        <h2 id="video-heading" class="sr-only">Feature Video</h2>

        
        <div class="video-wrap">
          <div 
            class="video-box" 
            :style="{ backgroundImage: `url(${VideoPlaceholder})` }"
          >


            <iframe
              id="bgVimeo"
              class="video-el"
              :src=embedUrl
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              aria-hidden="true"
              tabindex="-1"
            />

            <button
              class="video-toggle"
              @click="togglePlayback"
              :aria-pressed="!isPaused"
              :aria-label="isPaused ? 'Play background video' : 'Pause background video'"
              type="button"
            >
              {{ isPaused ? "Play" : "Pause" }}
            </button>

            <!-- Overlay text -->
            <div class="video-overlay">
              <div class="video-tagline d-none d-md-block">your story is just getting started</div>

              <!-- <button class="video-button" aria-label="Watch full video"  @click="openModal">            
                <VideoIcon class="icon" aria-hidden="true" />
                <span class="text  d-none d-md-block">Watch full video</span>
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <!-- <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" aria-label="Close Video"><Close /></button>
        <iframe
          :src="videoUrl"
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>

      </div>
    </div> -->


  </section>
</template>

<style lang="scss" scoped>
.video-section {
  padding: 0rem 0 0rem;
  background:var(--page-bg);
  background-repeat: repeat;
  background-position: right;
  background-size: 100% auto;

  position: relative;

  &:after{
    content:'';
    position: absolute;
    inset: 0;
    background:  url('../assets/images/TEXTURE-BG_2300.jpg');
    background-size: 100% auto;
    width: 100%;
    height: 50%;
    bottom: 0px;
    left: 0px;
    top: unset;
    z-index: 1;
  }

  .video-section-inner{
    position: relative;
    z-index: 2;
  }
}

.video-wrap {
  display: grid;
  place-items: center;
}

.video-box {
  position: relative;
  width: min(100%, 1160px);
  aspect-ratio: 232/97;

  overflow: hidden;
  background-size: 100%;


  &:before{
    content:'';
    position: absolute;  
    width:100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%);
    background-blend-mode: multiply;
    z-index: 1;
  }
}

.video-el {
  // position: absolute;
  // inset: 0;
  // width: 100%;
  // height: 100%;
  // object-fit: cover;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 177.78vh;  /* 100 * (16 / 9) → ensures coverage */
  height: 100vh;
  transform: translate(-50%, -50%);
  pointer-events: none; /* prevent clicking */
}

.video-toggle {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
}

.video-toggle:focus {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  place-items: center;
  padding: 1rem;
  text-align: center;
  z-index: 2;
  max-width: 475px;
  margin: 0px auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.video-tagline-mobile {
  color: var(--White, #FFF);
  text-align: center;

  /* H4 Mobile */
  font-family: Oswald;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px; /* 112.5% */
  text-transform: uppercase;

}
.video-tagline {
  color: var(--White, #FFF);
  text-align: center;
  font-family: Oswald;
  font-size: 50px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 55px */
  text-transform: uppercase;
  margin-bottom: 25px;
}
.video-button{
  background: none;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon{
    fill: white;
    width:48px;
  }

  color: var(--White, #FFF);
  text-align: center;

  /* Body/Regular */
  font-family: Montserrat;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 170%; /* 28.9px */

}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: none;
  padding: 0px;
  border-radius: 8px;
  position: relative;
  width: auto;
  button{
    position: absolute;
    right: 0px;
    top: -55px;
    height: 55px;
    width: 55px;
    border: none;
    background: black;
    box-shadow: none;
    svg{
      fill:white
    }

    &:hover{
      background: var(--Digital-SU-Red, #A00);
    }
  }
}
iframe {
  display: block;
  max-width: 100%;
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
</style>
