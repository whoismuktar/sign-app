<template>
  <div class="uploader text-center">
    <v-file-input
      v-model="files"
      :multiple="multiple"
      truncate-length="15"
    ></v-file-input>

    <v-btn @click="uploadFiles" :disabled="files.length < 1">Upload</v-btn>
  </div>
</template>

<script>
import { uploadDoc } from "@/services/user";
import { getBase64 } from "@/helpers";

export default {
  props: {
    multiple: {
      type: Boolean,
    },
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    async uploadFiles() {
      try {
        const files = this.files;
        const filesinBase64 = [];
        for (let i = 0; i < files.length; i++) {
          filesinBase64.push(await getBase64(files[i]));
        }

        await uploadDoc(filesinBase64);
        // TODO Notification
      } catch (error) {
        console.log({ error });
        // TODO Notification
      }
    },
  },
};
</script>

<style></style>
