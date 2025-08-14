<script setup>
import HeaderBar from './components/HeaderBar.vue'
import RallyCrySection from './components/RallyCrySection.vue'
import VideoSection from './components/VideoSection.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <HeaderBar />
  <main>
    <HeroSection />
    <RallyCrySection />
    <VideoSection />
    <CtaSection />
    <FeaturesSection />
  </main>
  <SiteFooter />
</template>
