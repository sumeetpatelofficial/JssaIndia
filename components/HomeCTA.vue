<template>
    <div class="cta">
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" class="text-center">
                    <h6 class="subtitle-1 primary--text mb-0">our achievement</h6>
                    <h4 class="body-1 white--text">We are fortunate to educate over </h4>
                    <h4 class="text-h2 white--text my-3">500+ students</h4>
                    <div class="py-3">
                        <v-btn color="primary" class="text-capitalize mx-3" to="/courses">Check Courses</v-btn>
                        <v-btn color="white" class="text-capitalize mx-3" to="/contact">Contact Us</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    @Component
    export default class HomeCTA extends Vue {
        
    }
</script>

<style scoped lang="scss">
    .cta{
        position: relative;
        padding: 80px 0;
        background: url(../static/cta.jpg) no-repeat center center;
        background-size: cover;
    }
</style>