<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form class="login-form">
          <v-text-field
            label="Student Id"
            placeholder="Enter Student Id"
            outlined
            required
            append-icon="mdi-magnify"
            @click:append="search"
            persistent-hint
            hint="Add your student id and hit magnify icon."
            v-model="studentIdInput"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-sheet color="white" rounded elevation="2">
          <template v-if="studentData.length">
            <div
              class="certificate-area"
              :class="studentData.isOldCertificate ? 'old' : 'new'"
            >
              <p id="ref">{{ studentData[0].Addmissiondate?.slice(-4) }}</p>
              <p id="studId">{{ studentData[0]?.StudentId }}</p>
              <p id="name">
                {{ `${studentData[0]?.Firstname} ${studentData[0]?.Lastname}` }}
              </p>
              <p id="course">{{ studentData[0]?.Coursename }}</p>
              <p id="grade">{{ studentData[0]?.Grade }}</p>
              <p id="sdate">{{ studentData[0]?.Addmissiondate }}</p>
              <p id="edate">{{ studentData[0]?.Enddate }}</p>
              <p id="center">{{ studentData[0]?.Centername }}</p>
              <p id="cdate">{{ studentData[0]?.Certificatedate }}</p>
              <p id="location">{{ studentData[0]?.State }}</p>
            </div>
          </template>
          <div class="px-10 py-10 text-center" v-else>
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="text-center" cols="12">
                <p class="mb-0" v-if="!loading">No Certificate Found !!!</p>
                <p class="mb-0" v-if="loading">Getting your files</p>
              </v-col>
              <v-col cols="6" v-if="loading">
                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  color="deep-purple accent-4"
                  rounded
                  height="6"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ViewCerti extends Vue {
  showCerti: any = false;
  studentIdInput: any = "";
  error: any = "";
  loading: any = false;
  studentData: any = "";
  progressValue = 0;
  search() {
    if (this.studentIdInput != "") {
      this.studentData = [];
      this.loading = true;
      try {
        this.$fire.firestore
          .collection("Students")
          .where("StudentId", "==", this.studentIdInput)
          .where("IsActive", "==", true)
          .get()
          .then((querySnapshot) => {
            this.loading = false;
            querySnapshot.forEach((doc) => {
              this.studentData.push({ ...doc.data() });
            });
          });
      } catch (error: any) {
        this.error = error.code;
      }
    }
  }

  mounted() {
    this.studentData = [];
  }
}
</script>

<style scoped lang="scss">
.certificate-area {
  position: relative;
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 640px;
  object-fit: cover;
  overflow: hidden;

  &.old {
    background: url(../static/certificateJssa.jpg) no-repeat left top;
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
  &.new {
    background: url(../static/newCerti.jpg) no-repeat left top;
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
}
</style>
