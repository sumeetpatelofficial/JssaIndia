<template>
    <div class="about">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="5">
                    <v-row>
                        <v-col cols="12" md="6" align-self="end">
                            <v-img class="box-elevation" contain :src="require('../static/about1.jpg')"></v-img>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-img class="box-elevation" contain :src="require('../static/about2.jpg')"></v-img>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-img class="box-elevation" contain :src="require('../static/about3.jpg')"></v-img>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="12" md="7" align-self="end" class="pl-md-10 pl-sm-0">
                    <h6 class="subtitle-1 primary--text mb-0">about us</h6>
                    <h5 class="body-2 my-5">We are Autonomous institution registered under N.C.T. JSSA is an ISO registered institute for teaching variant computer courses.</h5>
                    <p>JSSA avails you different computer courses at lower fee structures. JSSA will be playing a pivotal role in learning computer courses and vocational courses. The one who is interested in learning new computer courses and gain knowledge about the technical world, JSSA is the correct place.</p>
                    <p class="mb-0">Jan Seva Saksharta Abhiyan run by Jan Seva Saksharta Charitable Trust is an Autonomous institution registered under N.C.T. and willing to register for further standards from Government of India. We are focused at our premises, to avail higher technical education at nominal charges, all over India. At the same time we would like to get success in computer & vocational training revolution which is the main dream of Indian government.</p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    @Component
    export default class HomeAbout extends Vue {
        
    }
</script>

<style scoped>
    .about{
        position: relative;
        padding: 80px 0 50px;
    }

    .box-elevation{
        box-shadow: 0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)!important;
    }
</style>