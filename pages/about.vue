<template>
    <div class="about-page">
        <div class="page-heading">
            <h4 class="body-1 white--text font-weight-bold">About Us</h4>
        </div>        
        <v-container>
            <v-row>
                <v-col cols="12" md="12">
                    <h6 class="subtitle-1 primary--text mb-0">Welcome To Our Educational Environment</h6>
                    <h5 class="body-2 my-5">JSSA is an ISO registered institute for teaching variant computer courses. JSSA avails you different computer courses at lower fee structures. </h5>
                    <p>JSSA will be playing a pivotal role in learning computer courses and vocational courses. The one who is interested in learning new computer courses and gain knowledge about the technical world, JSSA is the correct place. Jan Seva Saksharta Abhiyan run by Jan Seva Saksharta Charitable Trust is an Autonomous institution registered under N.C.T. and willing to register for further standards from Government of India. We are focused at our premises, to avail higher technical education at nominal charges, all over India. At the same time we would like to get success in computer & vocational training revolution which is the main dream of Indiangovernment.</p>
                    <p>Today technology is reaching heights and to be in the pace computer knowledge is must. Nowadays hardly an institute or a firm is working manually; every individual needs some technical help. JSSA will help you in making aware of the computer knowledge-coding and language. It will play a paramount role in nurturing one's career in technical field. Those who are willing to have a bright future in IT world, JSSA help you in raising your achievements. Our motto is to work innovatively with speed and perfection. It also provides you to have great opportunities in growth of business.</p>

                    <p>At present, big institutions run one or more year programs with higher charges. due to which middle class families of our society cannot afford the load of their charges. at our premises we teach computer basic courses like microsoft office and c & c++ in addition we also teach some designing courses like dtp, web designing, auto cad.... and also the spoken english to society. our mission is to give best higher technical education at affordable charges. jan seva saksharta abhiyan is a computer education network for training, servicing and production. especially in the field of computer's educational & vocational training program.</p>
                </v-col>
                <!-- <v-col cols="12">
                    <v-btn color="primary" class="text-capitalize">Check Courses</v-btn>
                    <v-btn color="info" class="text-capitalize ml-sm-0 ml-md-3">Find Nearest Center</v-btn>
                </v-col> -->
            </v-row>
        </v-container>
        <HomeCTA />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';
import HomeCTA from '~/components/HomeCTA.vue';

    @Component({
        head:{
            title:'About Us'
        }
    })
    export default class About extends Vue {
        
    }
</script>

<style scoped>
.page-heading{
    position: relative;
    padding: 80px 0;
    background: url(../static/cta.jpg) no-repeat center center;
    background-size: cover;
    margin-bottom: 30px;
    text-align: center;
}
</style>