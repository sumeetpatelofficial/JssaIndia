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
            <v-carousel-item v-for="testimonail, i in testimonialList" :key="i">
              <p class="white--text">
                {{ testimonail.testimonialText }}
              </p>
              <em class="text-medium white--text">{{ testimonail.givenBy }}</em>
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
export default class HomeTestimonial extends Vue {
  error: any = "";
  testimonialList: any = [];
  loading: any = false;
  mounted() {
    this.loading = true;
    try {
      this.$fire.firestore
        .collection("Testimonials")
        .where('isActive','==',true)
        .onSnapshot(async (querySnapshot) => {
          this.testimonialList = [];
          await querySnapshot.forEach((doc) => {
            this.testimonialList.push({ id: doc.id, ...doc.data() });
            this.loading = false;
          });
        });
    } catch (error: any) {
      this.error = error.code;
    }
  }
}
</script>

<style lang="scss">
.testimonial-section {
  position: relative;
  padding: 50px 0 30px;
  background: url(../static/tesimonial.jpg) no-repeat center center;
  background-size: cover;
  // min-height: 450px;
}

.v-carousel__controls {
  justify-content: flex-start;
  left: 0 !important;
  right: unset !important;
}
</style>
