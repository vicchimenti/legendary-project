<script setup>
  import { useUiStore } from '../stores/ui'
  const ui = useUiStore()
</script>

<template>
  <aside 
    class="sticky-nav" 
    role="navigation" 
    aria-label="Quick actions"
    :class="[{ 'sticky-nav-visible': ui.headerVisible }]"
    >
    <ul class="nav-list">
      <li class="nav-item">
        <a href="https://www.seattleu.edu/academics/all-programs/" class="nav-link" aria-label="Find your Program" target="_blank">
          <span class="icon" aria-hidden="true">
            <!-- magnifying glass -->
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0001 11.25C20.0001 6.41753 16.0826 2.50001 11.25 2.50001C6.41753 2.50001 2.50001 6.41753 2.50001 11.25C2.50001 16.0826 6.41753 20.0001 11.25 20.0001C13.6115 20.0001 15.7538 19.064 17.3279 17.5434C17.359 17.5038 17.3922 17.4651 17.4287 17.4287C17.4651 17.3922 17.5038 17.359 17.5434 17.3279C19.064 15.7538 20.0001 13.6115 20.0001 11.25ZM22.5001 11.25C22.5001 13.9063 21.5787 16.347 20.0391 18.2716L24.6339 22.8663C25.122 23.3545 25.122 24.1457 24.6339 24.6339C24.1457 25.122 23.3545 25.122 22.8663 24.6339L18.2716 20.0391C16.347 21.5787 13.9063 22.5001 11.25 22.5001C5.03682 22.5001 0 17.4633 0 11.25C0 5.03682 5.03682 0 11.25 0C17.4633 0 22.5001 5.03682 22.5001 11.25Z" fill="white"/>
            </svg>
          </span>
          <span class="label">Find your Program</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="https://www.seattleu.edu/admissions-aid/visit-tour/" class="nav-link" aria-label="Visit" target="_blank">
          <span class="icon" aria-hidden="true">
            <!-- map pin -->
            <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0508 24.835C10.7168 25.0553 10.2832 25.0553 9.94922 24.835L10.5 24L11.0508 24.835ZM19 10.4092C19 8.18214 18.1066 6.04455 16.5137 4.4668C14.9203 2.88871 12.7574 2 10.5 2C8.24257 2 6.07966 2.88871 4.48633 4.4668C2.89341 6.04455 2 8.18214 2 10.4092L2.00586 10.7139C2.13342 13.859 4.20967 16.892 6.47266 19.2578C7.6195 20.4568 8.76994 21.438 9.63477 22.1201C9.97392 22.3876 10.269 22.6069 10.5 22.7754C10.731 22.6069 11.0261 22.3876 11.3652 22.1201C12.2301 21.438 13.3805 20.4568 14.5273 19.2578C16.8633 16.8157 19 13.6627 19 10.4092ZM12.667 10.4092C12.667 9.23834 11.7057 8.27246 10.5 8.27246C9.2943 8.27246 8.33301 9.23834 8.33301 10.4092C8.33306 11.58 9.29433 12.5459 10.5 12.5459C11.7057 12.5459 12.6669 11.58 12.667 10.4092ZM14.667 10.4092C14.6669 12.7026 12.7921 14.5459 10.5 14.5459C8.20793 14.5459 6.33306 12.7026 6.33301 10.4092C6.33301 8.11569 8.2079 6.27246 10.5 6.27246C12.7921 6.27246 14.667 8.11569 14.667 10.4092ZM21 10.4092C21 14.4737 18.3866 18.1159 15.9727 20.6396C14.7446 21.9235 13.5199 22.9677 12.6035 23.6904C12.1447 24.0523 11.7611 24.3355 11.4902 24.5293C11.3547 24.6262 11.2466 24.7007 11.1719 24.752C11.1346 24.7775 11.1054 24.7978 11.085 24.8115C11.0751 24.8182 11.0672 24.8234 11.0615 24.8271C11.0588 24.829 11.0564 24.8309 11.0547 24.832L11.0527 24.834H11.0518L10.5 24L9.94824 24.834H9.94727L9.94531 24.832C9.9436 24.8309 9.94125 24.829 9.93848 24.8271C9.9328 24.8234 9.92494 24.8182 9.91504 24.8115C9.89465 24.7978 9.86542 24.7775 9.82812 24.752C9.75344 24.7007 9.64528 24.6262 9.50977 24.5293C9.23886 24.3355 8.85533 24.0523 8.39648 23.6904C7.48011 22.9677 6.25536 21.9235 5.02734 20.6396C2.68887 18.1948 0.163446 14.7003 0.0078125 10.7891L0 10.4092C4.15815e-08 7.6454 1.10892 4.99625 3.0791 3.04492C5.04892 1.09415 7.71849 6.25276e-08 10.5 0C13.2815 0 15.9511 1.09415 17.9209 3.04492C19.8911 4.99625 21 7.6454 21 10.4092Z" fill="white"/>
            </svg>

          </span>
          <span class="label">Visit</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="https://www.seattleu.edu/admissions-aid/request-information/" class="nav-link" aria-label="Inquire" target="_blank">
          <span class="icon" aria-hidden="true">
            <!-- mail -->
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 0C23.1875 0 23.7764 0.244466 24.2659 0.734049C24.7555 1.22363 25 1.8125 25 2.5V17.5C25 18.1875 24.7555 18.7764 24.2659 19.266L24.0771 19.4377C23.6271 19.8124 23.1015 20 22.5 20H5L0 25V2.5C0 1.8125 0.244466 1.22363 0.734049 0.734049C1.22363 0.244466 1.8125 0 2.5 0H22.5ZM2.5 2.50488V18.9648L3.23242 18.2324L3.41553 18.0664C3.86042 17.7018 4.41977 17.5 5 17.5H22.4951C22.4959 17.4992 22.4967 17.4984 22.4976 17.4976C22.4985 17.4966 22.4991 17.4952 22.5 17.4943V2.50488L22.4951 2.5H2.50488L2.5 2.50488Z" fill="white"/>
            </svg>

          </span>
          <span class="label">Inquire</span>
        </a>
      </li>
    </ul>
  </aside>
</template>



<style lang="scss" scoped>
.sticky-nav {

  position: fixed;
  top: 35vh;
  right: 0;                    /* pin to right edge */
  z-index: 1;

  /* start off-canvas to the right, then slide in */
  transform: translateX(65px);
  opacity: 0;

  transition:
    transform 0.6s ease-in-out,
    opacity 0.6s ease-in-out;


  @include media-breakpoint-down(md) {
  top: unset;
  bottom:0px;
  }

}

.sticky-nav.sticky-nav-visible {
  transform: translateX(0);
  opacity: 1;
}
.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 3px 0 0 3px;
  overflow: hidden;
}

.nav-link {
  --bg: #6F0003;
  --bgHover: #6F0003;
  --text: #fff;

  display: inline-flex;
  align-items: center;
  background: var(--bg);
  color: var(--text);
  text-decoration: none;


  overflow: hidden;
  min-height: 65px;
  padding: 20px; /* just enough padding around icon */
  max-width: 65px; /* collapsed width = just icon */
  transition: max-width 220ms ease, background 180ms ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  background: var(--bgHover);
  max-width: 260px; 

}

.icon {
  width: 25px;
  height: 25px;
  min-width: 25px;
  border-radius: 0px;
  display: grid;
  place-items: center;
  background: none;
  color: white;
}

.label {
  white-space: nowrap;
  margin-left: 10px;
  opacity: 0;
  transition: opacity 180ms ease;

  color: #FFF;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;

  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 133.333% */

}

.nav-link:hover .label,
.nav-link:focus-visible .label {
  opacity: 1;
}
</style>
