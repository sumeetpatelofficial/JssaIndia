<template>
  <v-sheet color="white" rounded elevation="2">
    <div class="page-body">
      <v-data-table
        :headers="headers"
        :items="courseList"
        item-key="id"
        :items-per-page="5"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Our Courses</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.stop="courseDialog = true"
              class="text-capitalize"
              >Add Course</v-btn
            >
          </v-toolbar>
        </template>
        <template #item="{ item }">
          <tr>
            <td>{{ item.courseName }}</td>
            <td>{{ item.fullName ? item.fullName : "-" }}</td>
            <td>{{ item.duration }}</td>
            <td>{{ item.qualification }}</td>
            <td class="text-center"><v-chip class="white--text" :color="item.featured ? 'green darken-2':'amber darken-3'">{{ item.featured ? 'Featured':'Not' }}</v-chip></td>
            <td>
              <v-icon
                small
                color="success"
                class="mr-2"
                @click.stop.prevent="editItem(item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon
                small
                color="error"
                @click.stop.prevent="confirmDelete(item.id)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-snackbar
      v-model="snackbarConfig.snackbar"
      timeout="3000"
      absolute
      top
      right
      :color="snackbarConfig.color"
      elevation="24"
    >
      <h5 class="text-h6 mb-0">{{ snackbarConfig.snackbarText }}</h5>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          icon
          class="text-capitalize"
          v-bind="attrs"
          @click="snackbarConfig.snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="courseDialog" max-width="500px">
      <v-card :loading="loading">
        <v-card-title>
          <span class="text-h5">{{
            editForm ? "Edit Center Detail" : "Add New Center"
          }}</span>
        </v-card-title>
        <v-form
          ref="addCourseForm"
          v-model="formValid"
          class="login-form"
          lazy-validate
        >
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course.courseName"
                label="Course Name"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course.fullName"
                label="Course Full Name"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course.duration"
                label="Duration"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course.qualification"
                label="Course Min. Qualification"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-checkbox
                v-model="course.featured"
                :label="course.featured ? 'Is Featured':'check to featured'"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="12" md="12" class="text-course">
              <v-btn
                color="primary"
                @click.stop.prevent="addCourse"
                class="text-capitalize"
                >{{ editForm ? "Update" : "Add Course" }}</v-btn
              >
              <v-btn
                text
                @click.stop.prevent="onCloseForm"
                class="text-capitalize"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="5"
            indeterminate
          ></v-progress-linear>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDialog" max-width="320">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon color="error" class="vertical-middle">mdi-delete</v-icon>
          <span class="error--text">Confirm Delete</span>
        </v-card-title>

        <v-card-text class="text-h6">
          Are you sure you want to remove this data.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="confirmDialog = false">
            No
          </v-btn>

          <v-btn color="error darken-1" text @click="deleteItem">
            Yes, I Confirm
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Courses extends Vue {
  formValid: any = true;
  error: any = "";
  loading: any = false;
  courseDialog: any = false;
  editForm: any = false;
  editId: any = "";
  courseList: any = [];
  confirmDialog: any = false;
  snackbarConfig: any = {
    snackbar: false,
    snackbarText: "abc",
    color: "success",
  };
  headers: any = [
    { text: "Course Name", value: "courseName" },
    { text: "Full Name", value: "fullName" },
    { text: "Duration", value: "duration" },
    { text: "Qualification", value: "qualification" },
    { text: "Featured", value: "featured" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  course: any = {
    courseName: "",
    duration: "",
    featured: "",
    fullName: "",
    qualification: "",
  };
  mounted() {
    this.editId = "";
    this.loading = true;
    try {
      this.$fire.firestore
        .collection("Courses")
        .onSnapshot(async (querySnapshot) => {
          this.courseList = [];
          await querySnapshot.forEach((doc) => {
            this.courseList.push({ id: doc.id, ...doc.data() });
            this.loading = false;
          });
        });
    } catch (error: any) {
      this.error = error.code;
    }
  }

  async addCourse() {
    const valid = (this.$refs as any).addCourseForm.validate();
    if (valid) {
      this.loading = true;
      await setTimeout(() => {
        try {
          if (this.editId != "") {
            this.$fire.firestore
              .collection("Courses")
              .doc(this.editId)
              .update(this.course);
            this.snackbarConfig.snackbarText = "course updated.";
            this.snackbarConfig.snackbar = true;
            this.snackbarConfig.color = "success";
          } else {
            this.$fire.firestore.collection("Courses").doc().set(this.course);
            this.snackbarConfig.snackbarText = "course added.";
            this.snackbarConfig.snackbar = true;
            this.snackbarConfig.color = "success";
          }
        } catch (error: any) {
          console.log(error);
        }
        this.loading = false;
        this.courseDialog = false;
        (this.$refs as any).addCourseForm.reset();
        this.editForm = false;
      }, 2000);
    }
  }

  editItem(id: any) {
    this.editId = id;
    this.editForm = true;
    this.courseDialog = true;
    this.$fire.firestore
      .collection("Courses")
      .doc(id)
      .get()
      .then((doc) => {
        this.course = doc.data();
      });
  }
  confirmDelete(id: any) {
    this.editId = id;
    this.confirmDialog = true;
  }
  async deleteItem() {
    if (this.editId) {
      await this.$fire.firestore
        .collection("Courses")
        .doc(this.editId)
        .delete()
        .catch((error) => {
          console.log(error);
        });

      this.snackbarConfig.snackbarText = "Course removed.";
      this.snackbarConfig.snackbar = true;
      this.snackbarConfig.color = "error";
      this.confirmDialog = false;
      this.editId = "";
    }
  }

  onCloseForm() {
    const form = (this.$refs as any).addCourseForm;
    this.courseDialog = false;
    this.editForm = false;
    form.reset();
  }
}
</script>

<style scoped></style>
