<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      v-if="isMobile"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed elevate-on-scroll color="white" class="pa-0">
      <nuxt-link to="/">
        <v-img
          max-height="150"
          max-width="250"
          :src="require('../static/logo.png')"
        ></v-img>
      </nuxt-link>
      <v-spacer />
      <template v-if="!isMobile">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          plain
          rounded
          :ripple="false"
          :exact-active-class="'primary--text'"
          text
        >
          <span class="text-capitalize font-weight-medium">{{
            item.title
          }}</span>
        </v-btn>
        <v-btn
          @click.stop="loginDialog = true"
          color="primary"
          class="ml-3"
          elevation="0"
          ><v-icon left>mdi-account</v-icon>Login</v-btn
        >
      </template>
      <template v-if="isMobile">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <HomeFooter />
    <v-footer :absolute="!fixed" app>
      <span
        >Jssa India &copy; All rights reserved.
        {{ new Date().getFullYear() }}</span
      >
    </v-footer>
    <v-dialog v-model="loginDialog" max-width="400">      
      <v-card>
        <div class="card-header">
          <h5 class="text-h4 font-weight-bold text-uppercase">Login</h5>
          <p class="grey--text">Use Valid credentials to log in.</p>
          <v-btn icon color="grey" @click="loginDialog = false"
            ><v-icon>mdi-window-close</v-icon></v-btn
          >
        </div>
        <v-form v-model="valid" ref="form" class="login-form" lazy-validate>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="email"
                label="E-mail"
                placeholder="mail@abc.com"
                outlined
                required
                hide-details
                append-icon="mdi-gmail"
                @keyup.enter="signIn"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="password"
                label="Password"
                placeholder="*********"
                outlined
                required
                hide-details
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="signIn"
              ></v-text-field>
            </v-col>
          </v-row>                    
          <v-row class="mt-5">            
            <v-col cols="12" md="12" class="text-center">
              <v-btn color="primary" @click="signIn" class="text-capitalize">Login</v-btn>
              <v-btn text @click="loginDialog = false" class="text-capitalize">Cancel</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn plain block @click="signUpDialog = true; loginDialog=false" class="text-capitalize">Don't have an account ? Create Now</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>    
    <v-dialog v-model="signUpDialog" max-width="400">
      <v-card>
        <div class="card-header">
          <h5 class="text-h4 font-weight-bold text-uppercase">Join Us</h5>
          <p class="grey--text">Create you profile.</p>
          <v-btn icon color="grey" @click="signUpDialog = false"
            ><v-icon>mdi-window-close</v-icon></v-btn>
        </div>
        <v-form class="login-form" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="12">
            <v-text-field
              v-model="displayName"          
              validate-on-blur
              label="Your Name"
              outlined
              hide-details
              required
              @keyup.enter="register"
            ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
            <v-text-field
              v-model="email"          
              validate-on-blur
              label="Your Email"
              required
              outlined
              hide-details
              @keyup.enter="register"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="password"          
              :type="showPassword1 ? 'text' : 'password'"
              label="Your Password"
              required
              outlined
              hide-details
              @click:append="showPassword1 = !showPassword1"
              @keyup.enter="register"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="password2"
              :type="showPassword2 ? 'text' : 'password'"
              label="confirm Password"
              required
              outlined
              hide-details
              @click:append="showPassword2 = !showPassword2"
              @keyup.enter="register"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-5">            
            <v-col cols="12" md="12" class="text-center">
              <v-btn :disabled="dialog" color="primary" @click="register">signUp</v-btn>
              <v-btn text @click="signUpDialog = false" class="text-capitalize">Cancel</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn plain block @click="signUpDialog = false; loginDialog=true" class="text-capitalize">Already have an account ? Login</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" hide-overlay persistent width="400">
      <v-card color="success" dark>
        <v-card-text>
          Please wait while we are verifing details
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Toast } from "~/plugins/toast";
import Swal from "sweetalert2";
@Component
export default class userLayout extends Vue {
  clipped: any = false;
  drawer: any = false;
  fixed: any = false;
  loginDialog: any = false;
  signUpDialog: any = false;
  fab: any = false;
  items: any = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "About Us",
      to: "/about",
    },
    {
      title: "Centers",
      to: "/centers",
    },
    {
      title: "Courses",
      to: "/courses",
    },
    {
      title: "Cetificate",
      to: "/certificate",
    },
    {
      title: "Contact",
      to: "/contact",
    },
  ];
  miniVariant: any = false;
  valid: any = false;
  email: any = "";
  password: any = "";
  password2: any = "";
  showPassword: any = false;
  showPassword1: any = false;
  showPassword2: any = false;
  dialog = false;
  displayName:any='';

  get isMobile() {
    return this.$vuetify.breakpoint.mobile;
  }

  onScroll(e: any) {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || e.target.scrollTop || 0;
    this.fab = top > 20;
  }
  toTop() {
    this.$vuetify.goTo(0);
  }

  signIn() {
    if(this.email != '' || this.password != ''){
    this.dialog = true;
    this.$fire.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((result: any) => {
        this.dialog = false;  
        if (result.user) {
          if (this.$router.currentRoute.path === "/") {
            this.$router.push({ path: "/dashboard" });
          }
        } else {
          this.$fire.auth.signOut().then(() => {
            this.$router.push({ path: "/" });
          });
          Toast.fire({
            icon: "info",
            title: "userNotVerified",
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        this.dialog = false;
        if (error.code == "auth/user-not-found") {
          Toast.fire({
            icon: "error",
            title: "User not found, please sign up.",
          });
        } else if (error.code == "auth/wrong-password") {
          Toast.fire({
            icon: "error",
            title: "invalidEmailOrPassword",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "somethingWentWrong",
          });
        }
      });
    }
  }

  async register() {
    if (this.password === this.password2) {
      this.dialog = true;
      try {
        const userCredential = await this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password);
        const user:any = userCredential.user;
        await user.updateProfile({
          displayName: this.displayName
        })
        const userProfile = {
          name: this.displayName,
          isAdmin: false,
          createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp()
        }
        await this.$fire.firestore.collection("users").doc(user.uid).set(userProfile)
        await user.sendEmailVerification();
        this.dialog = false;
        await this.$fire.auth.signOut();
        this.signUpDialog = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign Up Successful",
          text: "User Registered Successful",
          showConfirmButton: true
        });
      } catch(error:any) {
        this.dialog = false;
        if (error.code == "auth/email-already-in-use") {
          Toast.fire({
            icon: "info",
            title: "User Already Exists"
          });
        }
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Password Did Not Match"
      });
    }
  }
}
</script>

<style lang="scss">
.border-bottom {
  border-bottom: 1px solid #f36705;
}

.v-card .card-header,
.v-card .login-form {
  position: relative;
  padding: 20px;
}

.v-card .card-header > .v-btn--icon {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
