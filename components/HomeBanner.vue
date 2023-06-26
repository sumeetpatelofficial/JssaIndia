<template>
  <v-container>
    <v-row align="center" class="banner">
      <v-col cols="12" sm="12" md="12" lg="12" xl="6">
        <h6 class="subtitle-1 primary--text mb-0">best opportunity</h6>
        <h2 class="text-h2 primary_dark--text">to become successful</h2>
        <p class="py-3">
          Our ultimate goal is your education and growth in this competitive
          world. We offers various courses to fulfil need of every individual
          who wanted to learn some computer related courses.
        </p>
        <div class="mt-10">
          <v-btn class="text-capitalize" color="primary" elevation="2">
            check courses</v-btn
          >
          <v-btn class="text-capitalize grey--text" elevation="0" text plain>
            how to get admission ?</v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="6">
        <v-img class="z" :src="require('../static/banner1.jpg')"> </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HomeBanner extends Vue {}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  z-index: 1;
  padding: 40px 0;
}
</style>
