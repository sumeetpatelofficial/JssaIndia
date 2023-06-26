<template>
    <div>
        <div class="page-heading">
            <h4 class="body-1 white--text font-weight-bold">Our Courses</h4>
        </div>        
        <v-container>
            <v-row>
                <v-col cols="12" md="12">
                    <HomeService heading="brighten your future" />
                </v-col>
            </v-row>
        </v-container>
        <HomeCTA />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';
import HomeCTA from '~/components/HomeCTA.vue';
import HomeService from '~/components/HomeService.vue';

    @Component({
        head:{
            title:'Courses'
        }
    })
    export default class Courses extends Vue {
        
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