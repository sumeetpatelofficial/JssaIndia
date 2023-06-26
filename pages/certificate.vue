<template>
    <div class="certicate">
        <div class="page-heading">
            <h4 class="body-1 white--text font-weight-bold">Find You Certificate</h4>
        </div>
        <v-container>            
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-form class="login-form">
                        <v-text-field
                            label="Student Id"
                            placeholder="Enter Student Id"
                            outlined
                            required
                            append-icon="mdi-magnify"                            
                            @click:append="search"
                            persistent-hint
                            hint="Add your student id and hit magnify icon."
                        ></v-text-field>                        
                    </v-form>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <div class="certificate-area">

                    </div>
                </v-col>
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
            title:'Certificate'
        }
    })
    export default class Certificate extends Vue {
        search(){
            console.log('clicked')
        }
    }
</script>

<style scoped lang="scss">
    .page-heading{
        position: relative;
        padding: 80px 0;
        background: url(../static/cta.jpg) no-repeat center center;
        background-size: cover;
        margin-bottom: 30px;
        text-align: center;
    }
    .certificate-area{
        position: relative;
        height: 500px;
        border: 1px solid lightgray;
        border-radius: 4px;
        margin-bottom: 30px;
    }
</style>