<template>
  <div class="testimonial-section">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h6 class="subtitle-1 primary--text mb-0">testimonials</h6>
          <h4 class="body-1 white--text">Our happy students</h4>
        </v-col>
        <v-col class="mt-15" cols="12" md="6">
          <v-carousel
            :continuous="false"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-circle"
            height="250"
          >
            <v-carousel-item v-for="i in 8" :key="i">
              <p class="white--text">
                The courses here exceeded my expectations in many regards,
                especially in the depth of information supplied. In a very
                non-threatening environment, I learned key principles of design
                that I can implement immediately.
              </p>
              <em class="text-medium white--text">Martin Brian</em>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeTestimonial extends Vue {}
</script>

<style lang="scss">
.testimonial-section {
  position: relative;
  padding: 50px 0 30px;
  background: url(../static/tesimonial.jpg) no-repeat center center;
  background-size: cover;
  // min-height: 450px;
}

.v-carousel__controls{
    justify-content: flex-start;
    left: 0 !important;
    right:unset !important;
}
</style>
