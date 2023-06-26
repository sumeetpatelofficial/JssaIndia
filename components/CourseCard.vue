<template>
  <div class="course-card">
    <h5 class="text-h6">{{ course.courseName }}</h5>
    <p>{{ course.fullName ? course.fullName : 'NA' }}</p>
    <div class="details">
      <p>
        <v-icon color="primary">mdi-seal</v-icon> {{ course.qualification }}
      </p>
      <p><v-icon color="primary">mdi-clock</v-icon> {{ course.duration }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CourseCard extends Vue {
  @Prop() course:any;
}
</script>

<style scoped lang="scss">
    .course-card{
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 15px;
        border: 1px solid #00C2FF;
        border-radius: 4px;
        background-color: rgba($color: #F36705, $alpha: 0.1);
        transition: all ease-in-out 0.3s;
        h5{
            font-weight: 800;
        }
        .details{
            display: flex;
            margin-top: auto;
            p{
                position: relative;
                margin-bottom: 0;
                display: flex;
                align-items: center;
                i{
                    vertical-align: middle;
                    font-size: 20px;
                    margin-right: 5px;
                }
                + p{
                    margin-left: 20px;
                }
            }
        }

        &:hover{
            box-shadow: 0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)!important;
        }
    }
</style>
