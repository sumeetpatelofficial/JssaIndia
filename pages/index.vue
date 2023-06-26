<template>
  <div>
    <HomeBanner />
    <HomeIntro />
    <HomeCTA />
    <HomeAbout />
    <HomeService videoVisible />
    <HomeTestimonial />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
@Component({
  head:{
    title:'Home'
  }
})
export default class Index extends Vue{
  
}
</script>