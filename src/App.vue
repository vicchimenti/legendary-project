<script setup>
import HeaderBar from './components/HeaderBar.vue'
import RallyCrySection from './components/RallyCrySection.vue'
import VideoSection from './components/VideoSection.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import CtaSection from './components/CtaSection.vue'
import CarouselSection from './components/CarouselSection.vue'

import LegendaryResultsSection from './components/LegendaryResultsSection.vue'
import QuotesStackSection from './components/QuotesStackSection.vue'

import SiteFooter from './components/SiteFooter.vue'


import StickyNav from './components/StickyNav.vue'
</script>

<template>
  <HeaderBar />
  <main>
    <HeroSection />
    <RallyCrySection />
    <VideoSection />
    <CtaSection />
    <CarouselSection /> 
    <LegendaryResultsSection />   
    <QuotesStackSection />   
    <FeaturesSection />
  </main>
  <SiteFooter />
  <StickyNav />
</template>

<style lang="scss">
main{
  overflow: hidden;
}
</style>