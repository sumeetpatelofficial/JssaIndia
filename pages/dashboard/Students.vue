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
        :search="searchStudent"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>All Students</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchStudent"
              append-icon="mdi-magnify"
              label="Search by Id"
              single-line
              hide-details
              outlined
              dense
              class="mr-10"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.stop="OpenStudentDialog"
              class="text-capitalize"
              >Add Student</v-btn
            >
          </v-toolbar>
        </template>
        <template #item="{ item }">
          <tr>
            <td>
              <v-chip
                ><v-icon left :color="item.IsActive ? 'success' : 'red'">{{
                  item.IsActive ? "mdi-check-circle" : "mdi-close-circle"
                }}</v-icon
                >{{ item.StudentId }}</v-chip
              >
            </td>
            <td>
              <v-switch
                inset
                v-model="item.isOldCertificate"
                :label="item.isOldCertificate ? 'Old' : 'New'"
                @change="updateStudentCertiType(item.id, item.isOldCertificate)"
              ></v-switch>
              <!-- {{ item?.isOldCertificate }} -->
            </td>
            <td class="text-lowercase">
              {{ `${item.Firstname}  ${item.Lastname}` }}
            </td>
            <td>{{ item.Coursename }}</td>
            <td>{{ item.Addmissiondate }}</td>
            <td>{{ item.Enddate ? item.Enddate : "-" }}</td>
            <td>{{ item.Certificatedate ? item.Certificatedate : "-" }}</td>
            <td>
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click.stop.prevent="editItem(item.id)">
                    <v-list-item-icon
                      ><v-icon color="success" class="mr-2"
                        >mdi-pencil</v-icon
                      ></v-list-item-icon
                    >
                    Edit
                  </v-list-item>
                  <v-list-item @click.stop.prevent="confirmDelete(item.id)">
                    <v-list-item-icon
                      ><v-icon color="error"
                        >mdi-delete</v-icon
                      ></v-list-item-icon
                    >
                    Delete
                  </v-list-item>
                  <v-list-item
                    v-if="item.IsActive"
                    @click.stop.prevent="printCerti(item.id)"
                  >
                    <v-list-item-icon
                      ><v-icon color="info"
                        >mdi-printer</v-icon
                      ></v-list-item-icon
                    >
                    Print
                  </v-list-item>
                  <v-list-item
                    v-if="item.IsActive"
                    @click.stop.prevent="confirmRemove(item.id)"
                  >
                    <v-list-item-icon
                      ><v-icon color="info"
                        >mdi-refresh</v-icon
                      ></v-list-item-icon
                    >
                    Reinitiate Certificate
                  </v-list-item>
                </v-list>
              </v-menu>
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

    <v-dialog v-model="studentDialog" max-width="720px" persistent>
      <v-card :loading="loading">
        <v-card-title>
          <span class="text-h5">{{
            editForm ? "Edit Student Detail" : "Add New Student"
          }}</span>
        </v-card-title>
        <v-form
          class="login-form"
          ref="addStudentForm"
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
                append-icon="mdi-refresh"
                readonly
                @click:append="updateStudentId"
                :loading="idLoading"
              >
                <template v-slot:progress>
                  <v-progress-circular
                    color="primary"
                    :size="20"
                    :width="2"
                    indeterminate
                  ></v-progress-circular>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="student.Firstname"
                label="Student First Name"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="student.Lastname"
                label="Student Last Name"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-radio-group v-model="student.Gender" row>
                <template v-slot:label>
                  <div class="text-h6">Gender</div>
                </template>
                <v-radio label="Male" value="Male"></v-radio>
                <v-radio label="Female" value="Female"></v-radio>
                <v-radio label="Other" value="Other"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="student.Address"
                label="Student Address"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="student.City"
                label="Student City"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="student.State"
                label="Student State"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="student.Email"
                label="Student Email"
                placeholder=""
                outlined
                required
                hide-details="auto"
                :rules="emailRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="student.Contactno"
                label="Contact"
                placeholder="+91-123 456 7890"
                outlined
                required
                :rules="TelephoneNumberRule"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                v-model="student.Qualification"
                label="Student Qualification"
                :items="qualificationList"
                outlined
                required
                hide-details="auto"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                label="Select Center"
                :items="centerList"
                outlined
                required
                hide-details="auto"
                :loading="loading"
                clearable
                :value="student.Centername"
              >
                <template v-slot:item="{ index, item }">
                  <v-list-item-content @click.stop="centerSelection(item)">
                    {{ item.centerName }}
                  </v-list-item-content>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                label="Select Course"
                :items="courseList"
                outlined
                required
                hide-details="auto"
                :loading="loading"
                clearable
                :value="student.Coursename"
              >
                <template v-slot:item="{ index, item }">
                  <v-list-item-content @click.stop="courseSelection(item)">
                    {{ item.fullName ? item.fullName : item.courseName }}
                    {{ item.fullName == null ? "" : `(${item.courseName})` }}
                  </v-list-item-content>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" md="6" style="position: relative">
              <v-text-field
                v-model="student.Addmissiondate"
                label="Admission Date"
                placeholder=""
                outlined
                required
                hide-details="auto"
                @click="openAdmit = true"
              ></v-text-field>
              <date-picker
                class="date-picker-style"
                :open.sync="openAdmit"
                v-model="student.Addmissiondate"
                value-type="format"
                format="DD/MM/YYYY"
              ></date-picker>
            </v-col>
            <template v-if="isExisitingStudent">
              <v-col cols="12" md="6" style="position: relative">
                <v-text-field
                  v-model="student.Enddate"
                  label="End Date"
                  placeholder=""
                  outlined
                  required
                  clearable
                  hide-details="auto"
                  @click="openEnd = true"
                  :disabled="!editForm"
                ></v-text-field>
                <date-picker
                  class="date-picker-style"
                  :open.sync="openEnd"
                  v-model="student.Enddate"
                  value-type="format"
                  format="DD/MM/YYYY"
                  :disabled="!editForm"
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
                  :disabled="!editForm"
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
                  :disabled="!editForm"
                  clearable
                ></v-text-field>
                <date-picker
                  class="date-picker-style"
                  :open.sync="openCerti"
                  v-model="student.Certificatedate"
                  value-type="format"
                  format="DD/MM/YYYY"
                  :disabled="!editForm"
                ></date-picker>
              </v-col>
            </template>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="12" md="12" class="text-center">
              <v-btn
                color="primary"
                @click.stop.prevent="addStudent"
                class="text-capitalize"
                >{{ editForm ? "Update" : "Add Student" }}</v-btn
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

    <!-- <v-dialog v-model="printDialog" max-width="600"> -->
    <v-sheet elevation="0" v-if="certificateStudent">
      <v-row class="py-2 px-2">
        <v-col cols="12" md="12">
          <v-btn
            v-print="'#printableCertificate'"
            class="text-capitalize"
            color="primary"
            >Print</v-btn
          >
          <v-btn outlined class="text-capitalize" @click="closePrintDialog"
            >Cancel</v-btn
          >
        </v-col>
      </v-row>
      <div id="printableCertificate" class="certificate-print new">
        <div class="ref-no" style="">
          <p ID="RefNo">{{ certificateStudent.Addmissiondate?.slice(-4) }}</p>
        </div>
        <div class="student-id" style="">
          <p ID="lblStudId">{{ certificateStudent.StudentId }}</p>
        </div>
        <div class="student-name" style="">
          <p ID="lblStudName">
            {{
              `${certificateStudent.Firstname} ${certificateStudent.Lastname}`
            }}
          </p>
        </div>
        <div class="course-name" style="">
          <p ID="lblCourse">{{ certificateStudent.Coursename }}</p>
        </div>
        <div class="grade" style="">
          <p ID="lblGarde" class="margin-right grade-value" Text="A+">
            {{ certificateStudent.Grade }}
          </p>
          <p ID="lblStartDate" class="addmission-date">
            {{ certificateStudent.Addmissiondate }}
          </p>
          <p ID="lblEndDate" class="margin-left end-date" Text="25/07/2015">
            {{ certificateStudent.Enddate }}
          </p>
        </div>
        <div class="center-name" style="">
          <p ID="lblCenter">{{ certificateStudent.Centername }}</p>
        </div>
        <div class="certificate-date" style="">
          <p ID="lblCertiDate">{{ certificateStudent.Certificatedate }}</p>
        </div>
        <div class="location" style="">
          <p ID="lblState">gujarat</p>
        </div>
        <div></div>
      </div>
    </v-sheet>
    <!-- </v-dialog> -->

    <v-dialog v-model="confirmRemoveDialog" max-width="320">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon color="error" class="vertical-middle">mdi-delete</v-icon>
          <span class="error--text">Confirm Remove</span>
        </v-card-title>

        <v-card-text class="text-h6">
          Are you sure you want to remove end date, grade and certificate date ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="confirmDialog = false">
            No
          </v-btn>

          <v-btn color="error darken-1" text @click="removeItem">
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import print from "vue-print-nb";
import {
  emailRules,
  onlyCharacterRule,
  TelephoneNumberRule,
} from "~/validationRules";
@Component({
  components: {
    DatePicker,
  },
  directives: {
    print,
  },
})
export default class Students extends Vue {
  studentList: any = [];
  formValid: any = true;
  error: any = "";
  loading: any = false;
  studentDialog: any = false;
  editForm: any = false;
  editId: any = "";
  confirmDialog: any = false;
  confirmRemoveDialog: any = false;
  searchStudent: any = "";
  snackbarConfig: any = {
    snackbar: false,
    snackbarText: "abc",
    color: "success",
  };
  isExisitingStudent: any = false;
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
    isOldCertificate: false,
  };

  // certificateStudent: any = {};

  headers: any = [
    { text: "Stud.Id", value: "StudentId" },
    { text: "Type", value: "isOldCertificate" },
    { text: "Name", value: "Firstname" },
    { text: "Course", value: "Coursename" },
    { text: "Started", value: "Addmissiondate" },
    { text: "Ended", value: "Enddate" },
    { text: "Certified", value: "Certificatedate" },
    { text: "Action", value: "actions", sortable: false },
  ];

  centerList: any = [];
  courseList: any = [];
  printDialog: any = false;
  qualificationList: any = [
    "Below 10th Standard",
    "10th Pass",
    "12th Pass",
    "Graduate",
  ];
  gradeList: any = ["A", "A+", "B", "B+", "C", "C+"];
  admitDatepicker: any = false;
  endDatepicker: any = false;
  certiDatepicker: any = false;
  openAdmit: any = false;
  openEnd: any = false;
  openCerti: any = false;
  emailRules: any = emailRules;
  TelephoneNumberRule: any = TelephoneNumberRule;
  onlyCharacterRule: any = onlyCharacterRule;

  certificateStudent: any = {
    Gender: "Male",
    Coursename: "CERTIFICATE IN COMPUTER CONCEPT ( C.C.C)",
    StudentId: "wqaeEkot",
    Firstname: "Sumeet Rajendrakumar ",
    Contactno: "6353244922",
    Enddate: "07/05/2022",
    Grade: "A",
    Certificatedate: "30/05/2022",
    Centername: "Preet Computers",
    City: "vadodara",
    Lastname: "Patel",
    Email: "info@jssaindia.in",
    Qualification: "12th pass",
    Address: "tarsali",
    State: "gujarat",
    Addmissiondate: "08/02/2022",
  };

  courseSelection(item: any) {
    this.student.Coursename =
      (item.fullName ? item.fullName : item.courseName) +
      " " +
      (item.fullName == null ? "" : `(${item.courseName})`);
  }

  centerSelection(item: any) {
    this.student.Centername = item.centerName;
  }

  getCourseList() {
    this.loading = true;
    setTimeout(() => {
      try {
        this.$fire.firestore
          .collection("Courses")
          .onSnapshot(async (querySnapshot) => {
            this.courseList = [];
            await querySnapshot.forEach((doc) => {
              this.courseList.push({ id: doc.id, ...doc.data() });
            });
          });
        this.loading = false;
      } catch (error: any) {
        this.error = error.code;
      }
    }, 2000);
  }

  getCenterList() {
    this.loading = true;
    setTimeout(() => {
      try {
        this.$fire.firestore
          .collection("Centers")
          .onSnapshot(async (querySnapshot) => {
            this.centerList = [];
            await querySnapshot.forEach((doc) => {
              this.centerList.push({ id: doc.id, ...doc.data() });
            });
          });
        this.loading = false;
      } catch (error: any) {
        this.error = error.code;
      }
    }, 2000);
  }

  getAllStudents() {
    this.loading = true;
    try {
      this.$fire.firestore
        .collection("Students")
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
    await this.getCenterList();
    await this.getCourseList();

    // this.$fire.firestore
    //   .collection("Students")
    //   .onSnapshot(async (querySnapshot) => {
    //     await querySnapshot.forEach((doc) => {
    //       this.$fire.firestore
    //         .collection("Students")
    //         .doc(doc.id)
    //         .set({ isOldCertificate: true }, { merge: true });
    //     });
    //   });
  }

  async addStudent() {
    const valid = (this.$refs as any).addStudentForm.validate();
    if (valid) {
      this.loading = true;
      await setTimeout(() => {
        try {
          if (this.editId != "") {
            this.$fire.firestore
              .collection("Students")
              .doc(this.editId)
              .update(this.student);
            this.snackbarConfig.snackbarText = "student updated.";
            this.snackbarConfig.snackbar = true;
            this.snackbarConfig.color = "success";
          } else {
            this.$fire.firestore.collection("Students").doc().set(this.student);
            this.snackbarConfig.snackbarText = "student added.";
            this.snackbarConfig.snackbar = true;
            this.snackbarConfig.color = "success";
          }
        } catch (error: any) {
          console.log(error);
        }
        this.loading = false;
        this.studentDialog = false;
        (this.$refs as any).addStudentForm.reset();
        this.editForm = false;
      }, 2000);
    }
  }

  editItem(id: any) {
    this.editId = id;
    this.editForm = true;
    this.studentDialog = true;
    this.isExisitingStudent = false;
    this.$fire.firestore
      .collection("Students")
      .doc(id)
      .get()
      .then((doc) => {
        this.student = doc.data();
        if (this.student.IsActive) {
          this.isExisitingStudent = true;
        }
      });
  }
  confirmDelete(id: any) {
    this.editId = id;
    this.confirmDialog = true;
  }
  async deleteItem() {
    if (this.editId) {
      await this.$fire.firestore
        .collection("Students")
        .doc(this.editId)
        .delete()
        .catch((error) => {
          console.log(error);
        });

      this.snackbarConfig.snackbarText = "Student removed.";
      this.snackbarConfig.snackbar = true;
      this.snackbarConfig.color = "error";
      this.confirmDialog = false;
      this.editId = "";
    }
  }

  onCloseForm() {
    const form = (this.$refs as any).addStudentForm;
    this.studentDialog = false;
    this.editForm = false;
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

  OpenStudentDialog() {
    this.isExisitingStudent = false;
    this.studentDialog = true;
    this.student.StudentId = this.randomString(9);
  }
  idLoading: any = false;
  updateStudentId() {
    this.idLoading = true;
    setTimeout(() => {
      this.student.StudentId = this.randomString(9);
      this.idLoading = false;
    }, 2000);
  }

  randomString(len: any) {
    let str = ""; // String result
    for (let i = 0; i < len; i++) {
      // Loop `len` times
      let rand = Math.floor(Math.random() * 62); // random: 0..61
      const charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48); // Get correct charCode
      str += String.fromCharCode(charCode); // add Character to str
    }
    return str;
  }

  printCerti(id: any) {
    this.$fire.firestore
      .collection("Students")
      .doc(id)
      .get()
      .then((doc) => {
        this.certificateStudent = doc.data();
      });
    this.printDialog = true;
  }

  closePrintDialog() {
    this.printDialog = false;
    this.certificateStudent = {};
  }

  async updateStudentCertiType(id: any, currentValue: boolean) {
    // console.log(id, currentValue);
    this.loading = true;
    await setTimeout(() => {
      try {
        this.$fire.firestore
          .collection("Students")
          .doc(id)
          .update({ isOldCertificate: currentValue })
          .then(() => {
            console.log("success");
            this.snackbarConfig.snackbarText = currentValue
              ? "student certificate changed to Old.."
              : "student certificate changed to New..";
            this.snackbarConfig.snackbar = true;
            this.snackbarConfig.color = "success";
          })
          .catch((error: any) => {
            console.log(error);
          });
      } catch (error: any) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }, 2000);
  }

  confirmRemove(id: any) {
    this.editId = id;
    this.confirmRemoveDialog = true;
  }

  async removeItem() {
    this.loading = true;
    await setTimeout(() => {
      try {
        if (this.editId) {
          this.$fire.firestore
            .collection("Students")
            .doc(this.editId)
            .update({
              Enddate: "",
              Grade: "",
              Certificatedate: "",
              IsActive: false,
            })
            .then(() => {
              this.snackbarConfig.snackbarText = "Student updated.";
              this.snackbarConfig.snackbar = true;
              this.snackbarConfig.color = "error";
              this.confirmRemoveDialog = false;
              this.editId = "";
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error: any) {
        console.log(error);
      }
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
.date-picker-style {
  position: absolute;
  top: 22px;
  left: 12px;
  opacity: 0;
}
.v-progress-circular {
  margin: 1rem;
  position: absolute;
  right: 30px;
  top: 2px;
}
.v-dialog {
  background-color: #ffffff;
}
</style>
