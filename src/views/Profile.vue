<template>
  <div class="profile-view pa-16">
    <h1 class="text-center">MY PROFILE</h1>

    <v-row justify="center">
      <v-col cols="4">
        <uploader multiple />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Uploader from "@/components/Uploader";
export default {
  components: { Uploader },
  methods: {
    getFiles(val) {
      console.log({val});
    },
  },
};
</script>

<style></style>
