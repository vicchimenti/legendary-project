<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import Dropdown from 'bootstrap/js/dist/dropdown'

import DesktopLogo from '../assets/images/Desktop_Logo.svg'
import MobileLogo from '../assets/images/Mobile_Logo.svg'
import MenuBars from '../assets/images/MENU_BARS.svg'
import Close from '../assets/images/CLOSE.svg'

const headerEl = ref(null)
const toggleBtn = ref(null)
const isOpen = ref(false)

let dropdown

onMounted(() => {
  // animate header in
  gsap.from(headerEl.value, { y: -40, opacity: 0, duration: 0.6, ease: 'power3.out' })

  // init Bootstrap dropdown
  dropdown = new Dropdown(toggleBtn.value)

  // sync Vue state with Bootstrap events
  const btn = toggleBtn.value
  btn.addEventListener('show.bs.dropdown', () => (isOpen.value = true))
  btn.addEventListener('hide.bs.dropdown', () => (isOpen.value = false))
})

onBeforeUnmount(() => {
  dropdown?.dispose()
})
</script>

<template>
  <!-- add class when open -->
  <header ref="headerEl" :class="['header', { 'menu-open': isOpen }]">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="logo-container">
        <DesktopLogo class="logo d-none d-md-block" alt="Seattle University Logo" />
        <MobileLogo class="logo d-block d-md-none" alt="Seattle University Logo" />
      </div>

      <div class="menu-container">
        <div class="btn-group">
          <!-- Bootstrap controls open/close; we just switch the icon -->
          <button
            ref="toggleBtn"
            type="button"
            class="btn btn-danger dropdown-toggle"
            data-bs-toggle="dropdown"
            :aria-expanded="isOpen.toString()"
          >
            <MenuBars v-if="!isOpen" class="menu-icon" alt="Menu" />
            <Close v-else class="menu-icon" alt="Close Menu" />
          </button>

          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Admissions</a></li>
            <li><a class="dropdown-item" href="#">Explore Programs</a></li>
            <li><a class="dropdown-item" href="#">Campus Life</a></li>
            <li><a class="dropdown-item" href="#">The Seattle U Impact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding:0;
  z-index: 1;
  position: relative;
  >.container{
    padding:0px;
  }

  &.menu-open {
    /* styles when dropdown open (example) */

    @include media_breakpoint_down(md) {
      background:black;
    }

  }
}
.logo-container{

  padding: 20px 0px;
  display: flex;
  align-items: center;

  .logo {
    width: 230px;
    height: auto;
    fill: white;
    @include media_breakpoint_down(md) {
      width: 100%;
    }
  }

}


.menu-container{
  > .btn-group{
    > button{
      width: 130px;
      height: 110px;
      border-radius: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      background:none;
      border:none;
      padding: 0px;
      &.show{
        @include media_breakpoint_up(md) {
          background: black;
        }
      }

      @include media_breakpoint_down(md) {
        width: 40px;
        height: 40px;
      }


      .menu-icon {
        width: 50px;
        height: 56px;
        display: block;
        fill:white;

        @include media_breakpoint_down(md) {
          width: 25px;
          height: 25px;
        }
      }

      &:after{
        display:none;
      }
    }

    .dropdown-menu{
      background: black;
      width: 340px;
      padding: 30px 30px 31px 30px;
      justify-content: center;
      align-items: flex-start;
      flex-shrink: 0;
      z-index: 50;
      border-radius: 0px;
      
      flex-direction: column;
      grid-gap:20px;
      top: -2px !important;
      &.show{
        display:flex;
      }
      li{
        &:hover{
          background: none;
        }
        a{
          color: var(--White, #FFF);
          font-feature-settings: 'liga' off, 'clig' off;
          font-family: Oswald;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 20px; /* 83.333% */
          text-transform: capitalize;
          padding: 0px;


          @include media_breakpoint_down(md) {
            font-size: 18px;
            line-height: 13px;
          }

          &:hover{
            color: var(--Yellow, #FDB913);
            background:none;
          }
        }
      }
    }
  }

}


</style>
