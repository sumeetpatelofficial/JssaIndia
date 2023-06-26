<template>
  <div class="services">
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="text-center">
          <h6 class="subtitle-1 primary--text mb-0">{{ heading }}</h6>
          <h5 class="body-2 my-3">We are building your career</h5>
        </v-col>
        <v-col cols="12">
          <v-tabs centered v-model="tab">
            <v-tab link :ripple="false" href="#tab-1">Courses</v-tab>
            <v-tab link :ripple="false" href="#tab-2">Featured Courses</v-tab>
            <v-tab v-if="videoVisible" link :ripple="false" href="#tab-3"
              >Videos</v-tab
            >
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-row>
                <v-col cols="12" md="4" v-for="course, i in notFeaturedCourses" :key="i">
                  <CourseCard :course="course"  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-row>
                <v-col cols="12" md="4" v-for="course, i in FeaturedCourses" :key="i">
                  <CourseCard :course="course"  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item value="tab-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              omnis illo ea. Repellendus consequuntur consectetur asperiores
              iure aperiam placeat similique aliquam ex dicta laboriosam!
              Repellendus deserunt aliquam qui harum odio.
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class HomeService extends Vue {
  @Prop({ type: String, default: "We're here to" }) heading: any;
  @Prop({ type: Boolean, default: false }) videoVisible: any;
  tab: any = null;

  error: any = "";
  courseList: any = [];

  created() {
    try {
      this.$fire.firestore
        .collection("Courses")
        .onSnapshot(async (querySnapshot) => {
          this.courseList = [];
          await querySnapshot.forEach((doc) => {
            this.courseList.push({ id: doc.id, ...doc.data() });
          });
        });
    } catch (error: any) {
      this.error = error.code;
    }
  }

  get notFeaturedCourses(){
    return this.courseList.filter((x:any) => x.featured == false)    
  }
  get FeaturedCourses(){
    return this.courseList.filter((x:any) => x.featured == true)    
  }
}
</script>

<style scoped lang="scss">
.services {
  position: relative;
  padding: 80px 0 50px;
}
.v-tab {
  font-size: 16px;
  text-transform: capitalize;
}
.v-tabs-items {
  padding: 50px 0;
}
</style>
