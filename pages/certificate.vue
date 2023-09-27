<template>
  <div class="certicate">
    <div class="page-heading">
      <h4 class="body-1 white--text font-weight-bold">Find You Certificate</h4>
    </div>
    <v-container>
      <ViewCerti />
    </v-container>
    <HomeCTA />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import HomeCTA from "~/components/HomeCTA.vue";
import ViewCerti from "@/components/ViewCerti.vue";
@Component({
  head: {
    title: "Certificate",
  },
  components: {
    ViewCerti,
  },
})
export default class Certificate extends Vue {}
</script>

<style scoped lang="scss">
.page-heading {
  position: relative;
  padding: 80px 0;
  background: url(../static/cta.jpg) no-repeat center center;
  background-size: cover;
  margin-bottom: 30px;
  text-align: center;
}
.certificate-area {
  position: relative;
  display: block;
  margin: 0 auto;
  background: url(../static/certificateJssa.jpg) no-repeat left top;
  width: 100%;
  height: 640px;
  object-fit: cover;
  overflow: hidden;
  p {
    position: absolute;
    font-size: 16px;
    font-weight: 700;
    &#ref {
      top: 72mm;
      left: 60mm;
    }
    &#studId {
      top: 78mm;
      left: 63mm;
    }
    &#name {
      top: 91mm;
      left: 80mm;
      text-transform: capitalize;
    }
    &#course {
      top: 109mm;
      left: 50%;
      transform: translateX(-50%);
    }
    &#grade {
      top: 118mm;
      left: 70mm;
    }
    &#sdate {
      top: 118mm;
      left: 145mm;
    }
    &#edate {
      top: 118mm;
      left: 195mm;
    }
    &#center {
      top: 127mm;
      left: 50%;
      transform: translateX(-30%);
    }
    &#cdate {
      top: 151.5mm;
      left: 55mm;
    }
    &#location {
      top: 158.5mm;
      left: 55mm;
    }
  }
}
</style>
