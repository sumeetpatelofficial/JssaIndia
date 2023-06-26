<template>
    <v-sheet color="white" rounded elevation="2">
      <div class="page-body">
        <v-data-table
          :headers="headers"
          :items="videoList"
          item-key="id"
          :items-per-page="5"
          :loading="loading"
          loading-text="Loading... Please wait"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Videos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click.stop="videoDialog = true"
                class="text-capitalize"
                >Add Video</v-btn
              >
            </v-toolbar>
          </template>
          <template #item="{ item }">
            <tr>
              <td>{{ item.videoURL }}</td>
              <td width="100"><v-switch v-model="item.isActive"></v-switch></td>
              <td width="100">
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
      <v-dialog v-model="videoDialog" max-width="500px">
        <v-card :loading="loading">
          <v-card-title>
            <span class="text-h5">{{ editForm ? "Edit Video Detail" : "Add New Video"}}</span>
          </v-card-title>
          <v-form
            ref="addVideoForm"
            v-model="formValid"
            class="login-form"
            lazy-validate
          >
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="video.videoURL"
                  label="Video"
                  placeholder=""
                  outlined
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-checkbox
                v-model="video.isActive"
                :label="video.isActive ? 'visible':'hide'"
              ></v-checkbox>
              </v-col>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="12" md="12" class="text-center">
                <v-btn
                  color="primary"
                  @click.stop.prevent="addTestimonial"
                  class="text-capitalize"
                  >{{editForm ? 'Update':'Add Video'}}</v-btn
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
  export default class Videos extends Vue {
    formValid: any = true;
    error: any = "";
    videoList: any = [];
    loading: any = false;
    videoDialog: any = false;
    editForm: any = false; 
    editId:any='';
    video: any = {
        videoURL:'',
        isActive:'',        
        timestamp:''
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
      { text: "Video", value: "videoURL" },
      { text: "Active", value: "isActive" },
      { text: "Actions", value: "actions", sortable: false },
    ];
  
    mounted() {
      this.editId='';
      this.loading = true;
      try {
        this.$fire.firestore
          .collection("Videos")
          .onSnapshot(async (querySnapshot) => {
            this.videoList = [];
            await querySnapshot.forEach((doc) => {
              this.videoList.push({ id: doc.id, ...doc.data() });
              this.loading = false;
            });
          });        
      } catch (error: any) {
        this.error = error.code;
      }
    }
  
    async addTestimonial() {
      const valid = (this.$refs as any).addVideoForm.validate();
      if (valid) {
        this.loading = true;
        await setTimeout(() => {
          try {
            if(this.editId != ''){            
              this.$fire.firestore.collection("Videos").doc(this.editId).update(this.video);  
              this.snackbarConfig.snackbarText = "video updated.";          
              this.snackbarConfig.snackbar = true;
              this.snackbarConfig.color = "success";  
            }
            else{
              this.$fire.firestore.collection("Videos").doc().set(this.video);
              this.snackbarConfig.snackbarText = "video added.";          
              this.snackbarConfig.snackbar = true;
              this.snackbarConfig.color = "success";  
            }                                          
          } catch (error: any) {
            console.log(error);
          }
          this.loading = false;
          this.videoDialog=false;
          (this.$refs as any).addVideoForm.reset();
          this.editForm = false;
        }, 2000);
      }
    }
  
    editItem(id: any) {
      this.editId = id;    
      this.editForm = true;
      this.videoDialog = true;
      this.$fire.firestore
        .collection("Videos")
        .doc(id)
        .get()
        .then((doc) => {
          this.video = doc.data();
        });
    }
  
    confirmDelete(id: any){    
      this.editId = id;
      this.confirmDialog = true;
    }
  
    async deleteItem() {
      if(this.editId){
        await this.$fire.firestore
          .collection("Videos")
          .doc(this.editId)
          .delete()
          .catch((error) => {
            console.log(error);
          });
        
        this.snackbarConfig.snackbarText = "Video removed.";          
        this.snackbarConfig.snackbar = true;
        this.snackbarConfig.color = "error"; 
        this.confirmDialog = false;
        this.editId = '';
      } 
    }
  
    onCloseForm() {
      const form = (this.$refs as any).addVideoForm;
      this.videoDialog = false;
      this.editForm = false
      form.reset();
    }
  }
  </script>
  
  <style scoped></style>
  