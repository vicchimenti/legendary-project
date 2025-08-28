<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y } from 'swiper/modules'

gsap.registerPlugin(ScrollTrigger)

// Required Swiper styles (core + the modules you use)
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const section = ref(null)

let resizeObserver


let ctx

const items = ref([
  {
    img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop',
    alt: 'SU Baseball Start Headed to All-Star Game',
    title: 'SU Baseball Start Headed to All-Star Game',
    desc: 'Albers graduate and Cy Young winner Tarik Skubal, ’18 selected to the MLB Midsummer Classic.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    alt: 'A Rising Star',
    title: 'A Rising Star',
    desc: 'Alum Shasti Conrad, ’07, named new Vice Chair of the Democratic National Committee.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    alt: 'Bridging Education and Industry Innovation',
    title: 'Bridging Education and Industry Innovation',
    desc: 'Projects Day showcases real-world projects from science and engineering students.',
    href: '#'
  },
    {
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    alt: 'Bridging Education and Industry Innovation',
    title: 'Bridging Education and Industry Innovation',
    desc: 'Projects Day showcases real-world projects from science and engineering students.',
    href: '#'
  },
  {
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    alt: 'Bridging Education and Industry Innovation',
    title: 'Bridging Education and Industry Innovation',
    desc: 'Projects Day showcases real-world projects from science and engineering students.',
    href: '#'
  },
])


onMounted(async () => {
  await nextTick()



  const all = gsap.utils.toArray('.legendary-swiper .swiper-slide:not(.swiper-slide-duplicate) .slide')
  gsap.set(all, { opacity: 0, y: 24 })

  ctx = gsap.context(() => {
    // Animate only the currently visible slides the first time the section enters the viewport
    ScrollTrigger.create({
      trigger: '.legendary-swiper',
      start: 'top 80%',
      once: true,
      onEnter: () => animateVisibleSlides(),
    })
  })
})

function animateVisibleSlides() {
  // Select only the visible slides' inner content (your .slide article)
  const cards = gsap.utils.toArray('.legendary-swiper .slide')
  if (!cards.length) return

  // Clear inline styles if rerun defensively
  gsap.set(cards, { clearProps: 'all' })

  gsap.from(cards, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.2,
  })
}

onBeforeUnmount(() => {

  resizeObserver?.disconnect()
  ctx?.revert() // cleans up tweens + ScrollTriggers created in this context
})
</script>

<template>
  <section class="carousel-section" ref="section" aria-labelledby="carousel-heading">

    <div class="container">
      <div class="section-heading">
        <div class="section-subtitle">LEGENDARY LEADERS</div>
        <h2 id="carousel-heading" class="section-title">Legends are made at Seattle University</h2>
      </div>


      <div class="carousel-container">

      

        <Swiper
          class="legendary-swiper"
          :modules="[Navigation, Pagination, A11y]"
          :slides-per-view="1.15"
          :space-between="16"
          :loop="true"
          :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
          :a11y="{ enabled: true, prevSlideMessage: 'Previous', nextSlideMessage: 'Next' }"
          :breakpoints="{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024:{ slidesPerView: 3, spaceBetween: 24 }
          }"
        >
          <SwiperSlide
            v-for="(item, i) in items"
            :key="i"
            ><article class="slide">
              
              <div class="slide-img-holder">
                <img class="slide-img" :src="item.img" :alt="item.alt" loading="lazy" decoding="async" />
              </div>  
              <div class="slide-card">
                <h3 class="slide-title">{{ item.title }}</h3>
                <p class="slide-desc">{{ item.desc }}</p>
                <div class="slide-link-holder">
                  <a class="slide-link" :href="item.href">Learn more →</a>
                </div>
              </div>

            </article>
          
          </SwiperSlide>

        </Swiper>

        <div class="carousel-nav">
          <button class="swiper-button-prev" aria-label="Previous Slide"></button>
          <button class="swiper-button-next" aria-label="Next Slide"></button>
        </div>


      </div>

      <div class="button-bar mt-5  text-center">
        <a href="#" class="btn btn-primary" role="button">Read More Legendary Stories</a>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
/* Section with white background */
.carousel-section {
  background: #ffffff;
  padding:100px 0;
}

.section-heading {
  text-align: center;
  margin-bottom: 2rem;

  max-width:700px;
  margin: 0 auto;

  margin-bottom:50px;

  .section-subtitle {
    color: var(--Black, #000);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 18 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 170%; /* 30.6px */

    @include media-breakpoint-down(md) {
      font-size: 14px;
    }
  }
  h2{
    color: var(--Black, #000);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* H2 - Oswald */
    font-family: Oswald;
    font-size: 62px;
    font-style: normal;
    font-weight: 700;
    line-height: 70px; /* 112.903% */
    text-transform: uppercase;

    @include media-breakpoint-down(md) {
      font-size: 32px;
      line-height: 36px;
    }
  }

}


.carousel-container{
  position: relative;
}
//swiper

.carousel-nav{
  @include media-breakpoint-down(md) {
    position: relative;
    bottom: 0px;
    left: 20px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    height: 40px;
  }
}
.swiper-button-prev,
.swiper-button-next{

  --swiper-navigation-size: 48px;
  --swiper-navigation-color: #fff;
  --swiper-navigation-size:20px;
  --swiper-navigation-sides-offset:-20px;
  display: flex;
  width: 48px;
  height: 48px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  background: var(--Digital-SU-Red, #A00);
  border:none;


  transition: transform .1s ease, background .1s ease;

  &:hover, &:focus {
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.2);
    background: #700000;
    color:white;
  }

  &:active {  
    transform: translateY(1px); 
    color:white;
  }

}
.swiper-button-prev{

}
.swiper-button-next{
  @include media-breakpoint-down(md) {
    right: unset;
    left: 40px;
  }
}

.swiper-slide{
  height: 100%;

  &:nth-child(even){
    @include media-breakpoint-up(md) {
      margin-top:-70px;
    }
    .slide {
      @include media-breakpoint-up(md) {
        flex-direction: column-reverse;
      }
      .slide-img {
        @include media-breakpoint-up(md) {
          height:675px;
        }
      }
    }
  }

  .slide{
    display:flex;
    flex-direction: column;
  }


  &:hover{
    .slide-img {
      transform: scale(1.05);
    }
  } 
}


/* Slides (1 on mobile, 2 on tablet, 3 on desktop) */
.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;

  overflow: hidden; /* clip child corners */

  @media (min-width: 640px) { flex-basis: 50%; }
  @media (min-width: 1024px) { flex-basis: calc(33.3333% - .6667rem); } /* compensate gap a bit */
}

.slide-img-holder{
  height: 480px;
  overflow: hidden;
  @include media-breakpoint-down(md) {
    height: 337px!important;
  }
  .slide-img {
    width: 100%;
    height: 100%;
    
    object-fit: cover;
    display: block;
    background: #e5e7eb;
    transition: transform 0.3s ease;


  }
}

/* Red box below image */
.slide-card {
  background: var(--Digital-SU-Red); /* rich red */
  color: #fff;
  padding: 40px 20px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;

  .slide-title {
    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* H5 */
    font-family: Montserrat;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px; /* 121.429% */
    margin-bottom:0px;

    @include media-breakpoint-down(md) {
      font-size: 21px;
      line-height: 140%;
    }
  }

  .slide-desc {
    color: var(--White, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body 16 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 25.6px */
    margin-bottom:0px;

    @include media-breakpoint-down(md) {
      font-size: 15px;
      line-height: 26px; 
    }
  }
  .slide-link-holder{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .slide-link {
    display:inline-block;
    color: var(--White, #FFF);
    font-family: Montserrat;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 21.25px */
    border-bottom:1px solid #fff;
    text-decoration: none;
    &:hover { border-color: #fff; opacity: 0.95; }

    @include media-breakpoint-down(md) {
      font-size: 16px;

      line-height: 125%;
      
    }
  }

}

.button-bar{
  a{
    @include media-breakpoint-down(md) {
      width:100%;
    }
  }
}



</style>
