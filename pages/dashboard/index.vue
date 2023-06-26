<template>
    <div>
        <v-row>
            <v-col cols="12" md="3">
                <v-sheet color="indigo lighten-5" rounded elevation="2" class="dashboard-tile">
                    <h4 class="text-h3 font-weight-bold indigo--text">1352</h4>
                    <h6 class="text-h6 indigo--text">Total Students</h6>
                    <v-icon color="indigo">mdi-account-tie</v-icon>
                </v-sheet>
            </v-col>
            <v-col cols="12" md="3">
                <v-sheet color="deep-purple lighten-5" rounded elevation="2" class="dashboard-tile">
                    <h4 class="text-h3 font-weight-bold deep-purple--text">21</h4>
                    <h6 class="text-h6 deep-purple--text">Courses</h6>
                    <v-icon color="deep-purple">mdi-school</v-icon>
                </v-sheet>
            </v-col>
            <v-col cols="12" md="3">
                <v-sheet color="teal lighten-5" rounded elevation="2" class="dashboard-tile">
                    <h4 class="text-h3 font-weight-bold teal--text">10</h4>
                    <h6 class="text-h6 teal--text">Centers</h6>
                    <v-icon color="teal">mdi-store</v-icon>
                </v-sheet>
            </v-col>
            <v-col cols="12" md="3">
                <v-sheet color="orange lighten-5" rounded elevation="2" class="dashboard-tile">
                    <h4 class="text-h3 font-weight-bold orange--text">10</h4>
                    <h6 class="text-h6 orange--text">Testimonials</h6>
                    <v-icon color="orange">mdi-forum</v-icon>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class Index extends Vue {
        
    }
</script>

<style scoped lang="scss">
    .dashboard-tile{
        position: relative;
        padding: 25px 20px;
        i{
            position: absolute;
            top: 50%;
            right: 15px;
            font-size: 86px;
            transform: translateY(-50%);
        }
    }
</style>