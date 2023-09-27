<template>
  <v-sheet color="white" rounded elevation="2">
    <div class="page-body">
      <v-container>
        <ViewCerti />
      </v-container>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewCerti from "@/components/ViewCerti.vue";
@Component({
  components: {
    ViewCerti,
  },
})
export default class ViewCertificate extends Vue {}
</script>

<style scoped></style>
