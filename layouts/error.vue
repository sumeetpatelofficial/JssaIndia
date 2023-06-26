<template>
  <v-app dark>
    <v-container>
      <v-row align="center" justify="center" style="height: calc(100vh - 80px)">
        <v-col cols="12" md="8" class="text-center">
          <div class="gif">
            <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
          </div>
          <h1 class="text-h2" v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 class="text-h2" v-else>
            {{ otherError }}
          </h1>
          <p>...maybe the page you're looking for is not found or never existed</p>
          <v-btn color="primary" to="/" class="text-capitalize"> Home page </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "error",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
.gif {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
