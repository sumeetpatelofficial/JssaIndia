<template>
    <v-row>
        <v-col cols="12" md="4" v-for="video, i in videolist" :key="i">
            <div class="iframe-container">
                <iframe :src="video.videoURL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class HomeVideos extends Vue {
        error: any = "";
        videolist: any = [];
        loading: any = false;
        mounted() {
            this.loading = true;
            try {
            this.$fire.firestore
                .collection("Videos")
                .where('isActive','==',true)
                .onSnapshot(async (querySnapshot) => {
                this.videolist = [];
                await querySnapshot.forEach((doc) => {
                    this.videolist.push({ id: doc.id, ...doc.data() });
                    this.loading = false;
                });
                });
            } catch (error: any) {
            this.error = error.code;
            }
        }
    }
</script>

<style scoped>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%; /* 16:9*/
  position: relative;
}

.iframe-container iframe {
   border: 0;
   height: 100%;
   left: 0;
   position: absolute;
   top: 0;
   width: 100%;
}
</style>