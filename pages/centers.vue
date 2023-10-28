<template>
  <div>
    <div class="page-heading">
      <h4 class="body-1 white--text font-weight-bold">Our Centers</h4>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <h6 class="subtitle-1 primary--text mb-0">
            Our Centers where you can get qualified from.
          </h6>
          <div class="py-10">
            <v-data-table
              :headers="headers"
              :items="centerList"
              :items-per-page="5"
              class="elevation-1"
              :loading="loading"
              loading-text="Loading... Please wait"
            ></v-data-table>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <HomeCTA />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeCTA from "~/components/HomeCTA.vue";

@Component({
  head: {
    title: "Center",
  },
})
export default class Centers extends Vue {
  error: any = "";
  loading: any = false;
  headers: any = [
    { text: "Center Name", value: "centerName" },
    { text: "Address", value: "address" },
    { text: "Area", value: "area" },
    { text: "Email", value: "email" },
    // {text:'Contact', value:'phone'},
  ];
  centerList: any = [];

  mounted() {
    this.loading = true;
    try {
      this.$fire.firestore
        .collection("Centers")
        .onSnapshot(async (querySnapshot) => {
          this.centerList = [];
          await querySnapshot.forEach((doc) => {
            this.centerList.push({ id: doc.id, ...doc.data() });
            this.loading = false;
          });
        });
    } catch (error: any) {
      this.error = error.code;
    }
  }
}
</script>

<style scoped>
.page-heading {
  position: relative;
  padding: 80px 0;
  background: url(../static/cta.jpg) no-repeat center center;
  background-size: cover;
  margin-bottom: 30px;
  text-align: center;
}
</style>
