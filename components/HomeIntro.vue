<template>
    <v-container>
  <v-row class="feature">
    <v-col cols="12" sm="12" md="4" lg="4" v-for="{title, imagePath, content}, i in featureList" :key="i">
      <v-card elevation="2" class="text-center feature-card">
        <div class="feature-image">
            <img :src="require(`../static/${imagePath}.png`)" :alt="title" />
        </div>
        <h5 class="text-h5 primary_dark--text mt-4">{{ title }}</h5>
        <p class="mb-0 mt-4 grey--text">
          {{ content }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HomeIntro extends Vue {
    featureList:any=[
        {
            imagePath:'mission',
            title:'Our Mission',
            content:'The JSSA India gives you the opportunity to learn various computer courses at low fees Structure also gives you the certificate under which you have completed the certification under ISO standards.'
        },
        {
            imagePath:'vision',
            title:'Our Vision',
            content:'The JSSA is offering various courses to fulfil need of every individual who wanted to learn some computer related courses. If you would like to have more details on course please Visit through other menus.'
        },
        {
            imagePath:'opportunity',
            title:'Opportunity',
            content:'Today education is reaching heights and to be in the pace computer knowledge is must. JSSA is also offering If you are looking for exciting business opportunity, JSSA education centre is right choice.'
        },
    ]
}
</script>

<style lang="scss" scoped>
.feature{
    position: relative;
    padding: 50px 0;
    .feature-card{
        position: relative;
        padding:30px;
        .feature-image{
            width: 60px;
            height: 60px;
            display: block;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
}
</style>
