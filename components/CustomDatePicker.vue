<template>
    <v-menu
    v-model="birthDateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
    >
    <template v-slot:activator="{ on }">
        <v-text-field
        outlined
        :label="labelValue"
        v-on="on"
        :value="computedBirthDate"
        hide-details="auto"   
        ></v-text-field>
    </template>
    <v-date-picker
        color="primary"
        :value="value"
        @input="dateValue"
        prepend-inner-icon="mdi-calendar"
    >
    </v-date-picker>
    </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class CustomDatePicker extends Vue {
  //Variable declaration
  @Prop({type:String,default:'Label'}) label="";
  @Prop() value:any;
  birthDateMenu: boolean = false;
  birthDate:any= ""
  date: any = "";
  currentDate: any = new Date().toISOString().substring(0, 10);

  //Format Date for display
  formatDate(date: any) {
    if (!date) return null;
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  get labelValue(){
    return this.label
  }

  //format date for picker to understand format
  formatPickerDate(date: any) {
    if (!date) return null;
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }

  get computedBirthDate() {
    // let result = this.value;
    // if (this.value !== null) {
    //   result = this.value;
    // }
    // if (this.value.indexOf("-") !== -1) {
    //   result = this.formatDate(result);  
    // }    
    return this.value ? this.value : this.value;
  }

//   set computedBirthDate(date: string) {
//     this.value = date;    
//   }

  //Computed Method to get date and clear date if not picked
  getBirthdayDate(value: any) {
    if (value !== "") {
      this.value = value;
      this.value = this.computedBirthDate;
    } else {
      this.value = "";
    }
  }

  dateValue(value:any){
    this.$emit('input', value)
    this.birthDateMenu = false
    // this.getBirthdayDate(currentDate),
  }
}
</script>
