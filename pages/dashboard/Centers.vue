<template>
  <v-sheet color="white" rounded elevation="2">
    <div class="page-body">
      <v-data-table
        :headers="headers"
        :items="centerList"
        item-key="id"
        :items-per-page="5"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Our Centers</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.stop="centerDialog = true"
              class="text-capitalize"
              >Add Center</v-btn
            >
          </v-toolbar>
        </template>
        <template #item="{ item }">
          <tr>
            <td>{{ item.centerName }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.area }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
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
    <v-dialog v-model="centerDialog" max-width="500px">
      <v-card :loading="loading">
        <v-card-title>
          <span class="text-h5">{{ editForm ? "Edit Center Detail" : "Add New Center"}}</span>
        </v-card-title>
        <v-form
          ref="addCenterForm"
          v-model="formValid"
          class="login-form"
          lazy-validate
        >
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="center.centerName"
                label="Center Name"
                placeholder=""
                outlined
                required
                :rules="onlyCharacterRule"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="center.address"
                label="Center Address"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="center.area"
                label="Center Area"
                placeholder=""
                outlined
                required
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="center.email"
                label="Center Email"
                placeholder=""
                outlined
                required
                hide-details="auto"
                :rules="emailRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="center.phone"
                label="Contact"
                placeholder="+91-123 456 7890"
                outlined
                required
                :rules="TelephoneNumberRule"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col cols="12" md="12" class="text-center">
              <v-btn
                color="primary"
                @click.stop.prevent="addCenter"
                class="text-capitalize"
                >{{editForm ? 'Update':'Add Center'}}</v-btn
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

    <v-dialog
      v-model="confirmDialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon color="error" class="vertical-middle">mdi-delete</v-icon> <span class="error--text">Confirm Delete</span>
        </v-card-title>

        <v-card-text class="text-h6">
          Are you sure you want to remove this data.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="confirmDialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="error darken-1"
            text
            @click="deleteItem"
          >
            Yes, I Confirm
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  emailRules,
  onlyCharacterRule,
  TelephoneNumberRule,
} from "~/validationRules";
@Component
export default class Centers extends Vue {
  formValid: any = true;
  error: any = "";
  centerList: any = [];
  loading: any = false;
  centerDialog: any = false;
  editForm: any = false; 
  editId:any='';
  center: any = {
    centerName: "",
    address: "",
    area: "",
    email: "",
    phone: "",
  };
  confirmDialog:any=false;
  onlyCharacterRule = onlyCharacterRule;
  emailRules = emailRules;
  TelephoneNumberRule = TelephoneNumberRule;

  snackbarConfig: any = {
    snackbar: false,
    snackbarText: "abc",
    color: "success",
  };
  headers: any = [
    { text: "Center Name", value: "centerName" },
    { text: "Address", value: "address" },
    { text: "Area", value: "area" },
    { text: "Email", value: "email" },
    { text: "Contact", value: "phone" },
    { text: "Actions", value: "actions", sortable: false },
  ];

    // addCenterData(){
    //   this.centerData.forEach((arrayItem:any) => {
    //     this.$fire.firestore.collection("Centers").doc().set(arrayItem);
    //   });
    // }


  mounted() {
    this.editId='';
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

  async addCenter() {
    const valid = (this.$refs as any).addCenterForm.validate();
    if (valid) {
      this.loading = true;
      await setTimeout(() => {
        try {
          if(this.editId != ''){            
            this.$fire.firestore.collection("Centers").doc(this.editId).update(this.center);  
            this.snackbarConfig.snackbarText = "center updated.";          
            this.snackbarConfig.snackbar = true;
            this.snackbarConfig.color = "success";  
          }
          else{
            this.$fire.firestore.collection("Centers").doc().set(this.center);
            this.snackbarConfig.snackbarText = "center added.";          
            this.snackbarConfig.snackbar = true;
            this.snackbarConfig.color = "success";  
          }                                          
        } catch (error: any) {
          console.log(error);
        }
        this.loading = false;
        this.centerDialog=false;
        (this.$refs as any).addCenterForm.reset();
        this.editForm = false;
      }, 2000);
    }
  }

  editItem(id: any) {
    this.editId = id;    
    this.editForm = true;
    this.centerDialog = true;
    this.$fire.firestore
      .collection("Centers")
      .doc(id)
      .get()
      .then((doc) => {
        this.center = doc.data();
      });
  }

  confirmDelete(id: any){    
    this.editId = id;
    this.confirmDialog = true;
  }

  async deleteItem() {
    if(this.editId){
      await this.$fire.firestore
        .collection("Centers")
        .doc(this.editId)
        .delete()
        .catch((error) => {
          console.log(error);
        });
      
      this.snackbarConfig.snackbarText = "Center removed.";          
      this.snackbarConfig.snackbar = true;
      this.snackbarConfig.color = "error"; 
      this.confirmDialog = false;
      this.editId = '';
    } 
  }

  onCloseForm() {
    const form = (this.$refs as any).addCenterForm;
    this.centerDialog = false;
    this.editForm = false
    form.reset();
  }
}
</script>

<style scoped></style>
