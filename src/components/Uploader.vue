<template>
  <div class="uploader text-center">
    <v-file-input
      v-model="files"
      :multiple="multiple"
      truncate-length="15"
    ></v-file-input>

    <v-btn @click="uploadFiles" :disabled="files.length < 1">Upload</v-btn>

    <v-snackbar v-model="toast.status" top centered :color="toast.color">
      {{ toast.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { uploadDoc } from "@/services/documents";
import { getBase64 } from "@/helpers";

export default {
  props: {
    multiple: {
      type: Boolean,
    },
  },
  data() {
    return {
      toast: {
        status: false,
        message: "",
        color: "success",
      },
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

        this.$$router.push("/docs")

        this.toast.status = true;
        this.toast.message = "Signed and submitted successfully";
        this.toast.color = "success";
      } catch (error) {
        console.log({ error });

        this.toast.status = true;
        this.toast.message = "Error uploading";
        this.toast.color = "red";
      }
    },
  },
};
</script>

<style></style>
