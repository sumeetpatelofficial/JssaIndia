<template>
    <nuxt-child />
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({    
    scrollToTop: true,
    layout:'admin'
})
export default class dashboard extends Vue {
  authenticated: boolean = false;
  get userInfo() {
    return this.$store.state.userInfo;
  }

  beforeMount() {
    this.$fire.auth.onAuthStateChanged(
      (user) => { 
        this.authenticated = !!user;
        if (!this.authenticated) {this.$router.replace({ path: "/" })};
      },
      (error:any) => {
        this.authenticated = false;
        this.$router.replace({ path: "/" });
      }
    );
  }
}
</script>

<style scoped></style>
