<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import VideoIcon from '../assets/images/circle-play-solid-full.svg'
import Close from '../assets/images/CLOSE.svg'

const section = ref(null)
let ctx
let onWinLoad


const isOpen = ref(false);
const videoUrl = "https://player.vimeo.com/video/1003737596"; 

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {


    // Optional: lift the video box in
    gsap.from('.video-box', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: section.value, start: 'top 85%' }
    })
  }, section)

  // Refresh after media loads so positions are accurate
  onWinLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onWinLoad)
  section.value.querySelectorAll('video').forEach(v => {
    v.addEventListener('loadeddata', () => ScrollTrigger.refresh(), { once: true })
  })
})

onBeforeUnmount(() => {
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
          <div class="video-box">
            <!-- Background video inside the box -->
            <!-- Replace src/poster with your asset(s) -->
            <video
              class="video-el"
              src="https://download-video-ak.vimeocdn.com/v3-1/playback/db41e502-f0f3-4438-976e-1e47e4630ee2/5d36b664-09628be3?__token__=st=1755909583~exp=1755913183~acl=%2Fv3-1%2Fplayback%2Fdb41e502-f0f3-4438-976e-1e47e4630ee2%2F5d36b664-09628be3%2A~hmac=f56f7f9666bcad30564b99ae17b0ec8366e152ba8f6881c13eb6339ea8b53735&r=dXMtd2VzdDE%3D"
              poster="https://i.vimeocdn.com/video/876420319_1920x1080.jpg"
              playsinline
              autoplay
              muted
              loop
            ></video>

            <!-- Overlay text -->
            <div class="video-overlay">
              <div class="video-tagline d-none d-md-block">your story is just getting started</div>

              <button class="video-button" aria-label="Watch full video"  @click="openModal">            
                <VideoIcon class="icon" aria-hidden="true" />
                <span class="text  d-none d-md-block">Watch full video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
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
    </div>


  </section>
</template>

<style lang="scss" scoped>
.video-section {
  padding: 0rem 0 0rem;
  background:
    linear-gradient(to bottom, var(--page-bg) 0 50%, transparent 50% 100%),
    url('../assets/images/TEXTURE_BG_.jpg');
  background-repeat: repeat;
  background-position: right;
  background-size: 100% auto;
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
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
