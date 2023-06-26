<template>
  <div class="footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="12" xl="8" sm="12">
          <div class="footer-card">
            <nuxt-link to="/" class="mb-5">
              <v-img
                contain
                max-height="80"
                max-width="120"
                :src="require('../static/logo.png')"
              ></v-img>
            </nuxt-link>
            <p>
              Jan Seva Saksharta Abhiyan run by Jan Seva Saksharta Charitable
              Trust is an Autonomous institution registered under N.C.T. and
              willing to register for further standards from Government of
              India. We are focused at our premises, to avail higher technical
              education at nominal charges, all over India.
            </p>
            <div class="quick-links">
            <h6 class="text-h5">Quick Links</h6>
              <nuxt-link 
                :to="to"
                v-for="{title, to}, i in items"
                :key="i"
                :exact-active-class="'primary--text'"
                class="black--text">{{ title }}</nuxt-link>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="12" xl="4" sm="12">
            <div class="footer-card">
                <h6 class="text-h5">Contact Us</h6>
                <div class="contact-block">
                    <v-icon color="primary">mdi-map-marker</v-icon>
                    <h6 class="text-h6">Address</h6>
                    <p class="mb-0">S-7, Nandanvan Complex SusenTarsali Road,Tarsali,Vadodara-390009.</p>
                </div>
                <div class="contact-block">
                    <v-icon color="primary">mdi-phone</v-icon>
                    <h6 class="text-h6">Call Us</h6>
                    <a href="tel:919824524328" class="black--text">+91-9824524328</a>
                </div>
                <div class="contact-block">
                    <v-icon color="primary">mdi-gmail</v-icon>
                    <h6 class="text-h6">Email</h6>
                    <a href="mailto:info.jssaindia@gmail.com" class="black--text">info.jssaindia@gmail.com</a>
                </div>
            </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HomeFooter extends Vue {
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
}
</script>

<style scoped lang="scss">
.footer {
  position: relative;
  margin: 0 0 50px;
  .footer-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 4px;
    background-color: rgba($color: #f36705, $alpha: 0.1);
    .quick-links{
        position: relative;
        margin-top: 30px;
        a{
            position: relative;
            text-decoration: none;
            opacity: 0.6;
            display: inline-block;
            margin-top: 8px;
            +a{
                margin-left: 15px;                
            }
        }
    }
  }

  .contact-block{
    position: relative;
    margin: 15px 0;
    padding-left: 30px;
    i{
        position: absolute;
        top: 3px;
        left: 0;
    }
    a{
        position: relative;
        text-decoration: none;
    }
  }
}
</style>
