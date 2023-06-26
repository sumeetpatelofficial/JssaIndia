<template>
  <div class="contact">
    <div class="page-heading">
      <h4 class="body-1 white--text font-weight-bold">Contact Us</h4>
    </div>
    <v-container>
      <v-form class="py-5">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <h6 class="subtitle-1 primary--text mb-0">Write us an email</h6>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="contact.name"
              label="Name"
              placeholder="John Doe"
              outlined
              required
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="contact.email"
              label="E-mail"
              placeholder="mail@abc.com"
              outlined
              required
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="contact.phone"
              label="Phone"
              placeholder="123 456 7890"
              outlined
              required
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="contact.subject"
              label="Subject"
              placeholder="subject interested"
              outlined
              required
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <v-textarea
              v-model="contact.message"
              label="Message"
              placeholder="your message"
              outlined
              required
              hide-details
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="8">
            <v-btn color="primary" class="text-capitalize">Submit Form</v-btn>
            <v-btn text class="text-capitalize ml-3">Reset</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <HomeCTA />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  head: {
    title: "Contact Us",
  },
})
export default class Contact extends Vue {
  contact: any = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };
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
