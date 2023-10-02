<template>
  <v-sheet color="white" rounded elevation="2">
    <div class="page-body">
      <v-data-table
        :headers="headers"
        :items="studentList"
        item-key="id"
        :items-per-page="15"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>All Non Certified Students</v-toolbar-title>
          </v-toolbar>
        </template>
        <template #item="{ item }">
          <tr>
            <td>{{ item.StudentId }}</td>
            <td class="text-lowercase">
              {{ `${item.Firstname}  ${item.Lastname}` }}
            </td>
            <td>{{ item.Coursename }}</td>
            <td>{{ item.Addmissiondate }}</td>
            <td>{{ item.Enddate ? item.Enddate : "-" }}</td>
            <td>{{ item.Certificatedate ? item.Certificatedate : "-" }}</td>
            <td>
              <v-btn
                small
                color="primary"
                class="text-capitalize"
                @click.stop.prevent="editItem(item.id)"
                >click here</v-btn
              >
            </td>
          </tr>
        </template>
      </v-data-table>
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

      <v-dialog v-model="studentDialog" max-width="720px" persistent>
        <v-card :loading="loading">
          <v-card-title>
            <span class="text-h5"
              >Certify : {{ `${student.Firstname} ${student.Lastname}` }}</span
            >
          </v-card-title>
          <v-form
            class="login-form"
            ref="certifyStudentForm"
            v-model="formValid"
            lazy-validate
          >
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="student.StudentId"
                  label="Student Id"
                  placeholder=""
                  outlined
                  required
                  hide-details="auto"
                  disabled
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" style="position: relative">
                <v-text-field
                  v-model="student.Addmissiondate"
                  label="Admission Date"
                  placeholder=""
                  outlined
                  disabled
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" style="position: relative">
                <v-text-field
                  v-model="student.Enddate"
                  label="End Date"
                  placeholder=""
                  outlined
                  required
                  hide-details="auto"
                  @click="openEnd = true"
                ></v-text-field>
                <date-picker
                  class="date-picker-style"
                  :open.sync="openEnd"
                  v-model="student.Enddate"
                  value-type="format"
                  format="DD/MM/YYYY"
                ></date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                  v-model="student.Grade"
                  label="Select Grade"
                  :items="gradeList"
                  outlined
                  required
                  hide-details="auto"
                  clearable
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6" style="position: relative">
                <v-text-field
                  v-model="student.Certificatedate"
                  label="Cerificate Date"
                  placeholder=""
                  outlined
                  required
                  hide-details="auto"
                  @click="openCerti = true"
                ></v-text-field>
                <date-picker
                  class="date-picker-style"
                  :open.sync="openCerti"
                  v-model="student.Certificatedate"
                  value-type="format"
                  format="DD/MM/YYYY"
                ></date-picker>
              </v-col>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="12" md="12" class="text-center">
                <v-btn
                  color="primary"
                  @click.stop.prevent="certifyStudent"
                  class="text-capitalize"
                  >save</v-btn
                >
                <v-btn text class="text-capitalize" @click="onCloseForm"
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
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
@Component({
  components: {
    DatePicker,
  },
})
export default class GenerateCertificate extends Vue {
  studentList: any = [];
  error: any = "";
  loading: any = false;
  studentDialog: any = false;
  formValid: any = true;
  openEnd: any = false;
  openCerti: any = false;
  snackbarConfig: any = {
    snackbar: false,
    snackbarText: "abc",
    color: "success",
  };
  student: any = {
    SrNo: "",
    StudentId: "",
    Firstname: "",
    Lastname: "",
    Gender: "Male",
    Address: "",
    City: "",
    State: "",
    Email: "",
    Contactno: "",
    Qualification: "",
    Centername: "",
    Coursename: "",
    Addmissiondate: "",
    Enddate: "",
    Grade: "",
    Certificatedate: "",
    Timestamp: Date.now(),
    IsActive: false,
  };
  headers: any = [
    { text: "Stud.Id", value: "StudentId" },
    { text: "Name", value: "Firstname" },
    { text: "Course", value: "Coursename" },
    { text: "Started", value: "Addmissiondate" },
    { text: "Ended", value: "Enddate" },
    { text: "Certified", value: "Certificatedate" },
    // { text: "Status", value: "IsActive" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  editId: any = "";
  gradeList: any = ["A", "A+", "B", "B+", "C", "C+"];

  getAllStudents() {
    this.loading = true;
    try {
      this.$fire.firestore
        .collection("Students")
        .where("IsActive", "==", false)
        .onSnapshot(async (querySnapshot) => {
          this.studentList = [];
          await querySnapshot.forEach((doc) => {
            this.studentList.push({ id: doc.id, ...doc.data() });
            this.loading = false;
          });
        });
    } catch (error: any) {
      this.error = error.code;
    }
  }

  async mounted() {
    this.editId = "";
    await this.getAllStudents();
  }

  async certifyStudent() {
    const valid = (this.$refs as any).certifyStudentForm.validate();
    if (valid) {
      this.loading = true;
      await setTimeout(() => {
        try {
          this.student.IsActive = true;
          this.$fire.firestore
            .collection("Students")
            .doc(this.editId)
            .update(this.student)
            .then(() => {
              this.snackbarConfig.snackbarText = "student Certified.";
              this.snackbarConfig.snackbar = true;
              this.snackbarConfig.color = "success";
            });
        } catch (error: any) {
          console.log(error);
        }
        this.loading = false;
        this.studentDialog = false;
        (this.$refs as any).certifyStudentForm.reset();
      }, 2000);
    }
  }

  editItem(id: any) {
    this.editId = id;
    this.studentDialog = true;
    this.$fire.firestore
      .collection("Students")
      .doc(id)
      .get()
      .then((doc) => {
        this.student = doc.data();
      });
  }
  onCloseForm() {
    const form = (this.$refs as any).certifyStudentForm;
    this.studentDialog = false;
    this.student = {
      SrNo: "",
      StudentId: "",
      Firstname: "",
      Lastname: "",
      Gender: "Male",
      Address: "",
      City: "",
      State: "",
      Email: "",
      Contactno: "",
      Qualification: "",
      Centername: "",
      Coursename: "",
      Addmissiondate: "",
      Enddate: "",
      Grade: "",
      Certificatedate: "",
      Timestamp: "",
      IsActive: false,
    };
    form.reset();
  }
}
</script>

<style scoped>
.date-picker-style {
  position: absolute;
  top: 22px;
  left: 12px;
  opacity: 0;
}
</style>
