<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

import DesktopLogo from '../assets/images/Desktop_Logo.svg'
import MobileLogo from '../assets/images/Mobile_Logo.svg'
const header = ref(null)
const year = new Date().getFullYear()

onMounted(() => {

})
</script>
<template>
  <footer class="footer">
    <div class="container">
      <DesktopLogo class="logo d-none d-md-block" alt="Seattle University Logo" />
      <MobileLogo class="logo d-block d-md-none" alt="Seattle University Logo" />
      <div class=" footer--second ">
        <p class="site-footer__copyright">Copyright © {{ year }} Seattle University</p>
        <ul>
          <li><a href="https://www.seattleu.edu/policies-regulations/" target="_blank">Policies &amp; Regulations</a></li>
          <li><a href="https://www.seattleu.edu/policies-regulations/online-privacy-statement/" target="_blank">Privacy Policy</a></li>
          <li><a href="https://www.seattleu.edu/policies-regulations/website-terms-and-conditions-of-use/" target="_blank">Terms of Service</a></li>
          <li><a href="https://www.seattleu.edu/policies-regulations/accessibility/" target="_blank">Accessibility</a></li>
          <li><a href="https://secure.ethicspoint.com/domain/media/en/gui/23241/index.html" target="_blank">Ethics Line</a></li></ul>
    </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer{
  background:black
}
.footer .container {
  display: flex;
  align-items: flex-end;
  grid-gap: 10px;
  justify-content: space-between;
  @include media-breakpoint-down(md) {
    flex-direction: column;
    align-items: flex-start;
  }
}
.footer--second {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    grid-gap: 20px;
    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: flex-start;
    }
    p{
      margin:0px;
      color: var(--white, #FFF);

      /* Small Text/Regular */
      font-family: Montserrat;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 170%; /* 25.5px */
    }
    ul{
      margin:0px;
      list-style:none;
      display:flex;
      flex-wrap: wrap;  
      grid-gap: 5px;
      padding: 0px;
      @include media-breakpoint-down(md) {
      
        flex-direction: column;
      }
      li{


        a{
          color:white;

          color: var(--White, #FFF);

          /* Small Text/Link */
          font-family: Montserrat;
          font-size: 15px;
          font-style: normal;
          font-weight: 700;
          line-height: 175%; /* 26.25px */
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-skip-ink: none;
          text-decoration-thickness: auto;
          text-underline-offset: auto;
          text-underline-position: from-font;

        }

      }
    }
}
.logo{
  width: 170px;
  fill: white;

  @include media-breakpoint-down(md) {
    width:auto;
    max-width:280px;
    margin-bottom:40px;
  }
}
</style>