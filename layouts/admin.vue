<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
      parmanent
      light
    >
      <!-- <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              John Leider
            </v-list-item-title>
            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
    </v-list> 
      <v-divider></v-divider>-->

      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary" @click="signOut">
            <v-icon left>mdi-logout-variant</v-icon> Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app fixed elevation="2" color="light" class="pa-0">
      <v-icon @click.stop="miniVariant = !miniVariant">mdi-arrow-left</v-icon>
      <v-img
        class="mx-5"
        max-height="50"
        max-width="80"
        :src="require('../static/logo.png')"
      ></v-img>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Admin extends Vue {
  drawer: any = true;
  miniVariant: any = false;
  clipped: any = false;
  items: any = [
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: "mdi-view-dashboard",
    },
    {
      title: "Students",
      to: "/dashboard/students",
      icon: "mdi-account-tie",
    },
    {
      title: "Centers",
      to: "/dashboard/centers",
      icon: "mdi-store",
    },
    {
      title: "Courses",
      to: "/dashboard/courses",
      icon: "mdi-school",
    },
    {
      title: "Generate Certificate",
      to: "/dashboard/certificate",
      icon: "mdi-certificate",
    },
    {
      title: "View Certificate",
      to: "/dashboard/viewcertificate",
      icon: "mdi-certificate",
    },
    {
      title: "Testimonial",
      to: "/dashboard/testimonials",
      icon: "mdi-forum",
    },
    {
      title: "Video",
      to: "/dashboard/videos",
      icon: "mdi-video",
    },
  ];

  signOut() {
    this.$fire.auth
      .signOut()
      .then(() => {
        this.$router.push({ path: "/" });
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
      });
  }
}
</script>

<style scoped></style>
