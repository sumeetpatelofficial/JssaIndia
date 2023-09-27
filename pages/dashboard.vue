<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  scrollToTop: true,
  layout: "admin",
})
export default class dashboard extends Vue {
  authenticated: boolean = false;
  error: any = "";
  get userInfo() {
    return this.$store.state.userInfo;
  }

  beforeMount() {
    this.$fire.auth.onAuthStateChanged(
      (user) => {
        this.authenticated = !!user;
        var userType = null;
        const loggedInUserId = user?.uid;
        try {
          this.$fire.firestore
            .collection("users")
            .doc(loggedInUserId)
            .get()
            .then((querySnapshot) => {
              const userData = querySnapshot.data();
              userType = userData?.type;
            });
        } catch (error: any) {
          this.error = error.code;
        }

        if (!this.authenticated) {
          this.$router.replace({ path: "/" });
        }
      },
      (error: any) => {
        this.authenticated = false;
        this.$router.replace({ path: "/" });
      }
    );
  }
}
</script>

<style scoped></style>
