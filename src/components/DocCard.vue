<template>
  <div class="doc-card-wrapper">
    <div class="doc-card" @click="viewDoc">
      <v-icon aria-hidden="false"> mdi-file </v-icon>
    </div>

    <v-dialog
      v-model="viewDocActive"
      transition="slide-x-reverse-transition"
      fullscreen
      content-class="doc-card-modal"
    >
      <div class="modal-decoy" @click="closeDoc"></div>
      <div class="doc-preview">
        <div class="doc-thumbnails">
          <div
            v-for="(thumbnail, index) in documentUploads"
            :key="index"
            class="thumbnail allChildrenCenter pa-4 mb-4"
          >
            <span>
              {{ index + 1 }}
            </span>
          </div>
        </div>

        <div class="doc-view-wrapper">
          <vue-pdf-app
            v-if="selectedDoc.id"
            :pdf="selectedDoc.file_url"
          ></vue-pdf-app>
        </div>
        <!-- {{ firstDoc.file_url }} -->
        <!-- {{ selectedDoc.file_url }} -->
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { getSingleDoc } from "@/services/documents";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

export default {
  props: {
    document: Object,
  },
  components: {
    VuePdfApp,
  },
  data() {
    return {
      viewDocActive: false,
      selectedDoc: "",
      fetchedDocument: {},
    };
  },
  methods: {
    async viewDoc() {
      // TODO Loader
      try {
        const res = await getSingleDoc(this.document.id);
        this.fetchedDocument = res.data.data;
        this.selectedDoc = this.fetchedDocument.documentUploads[0] || {};

        this.viewDocActive = true;
      } catch (error) {
        console.log({ error });
      }
    },
    closeDoc() {
      this.viewDocActive = false;
    },
  },
  computed: {
    documentUploads() {
      return this.fetchedDocument.documentUploads || [];
    },
    firstDoc() {
      return this.documentUploads[0] || {};
    },
  },
};
</script>

<style scoped lang="scss">
.doc-card-wrapper {
  .doc-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 70px 50px;
    margin-bottom: 10px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgba($color: $secondary-color, $alpha: 1);
  }
}
.doc-preview {
  background-color: #ffffff;
  height: 100vh;
  width: 80%;
  position: absolute;
  right: 0;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .doc-thumbnails {
    width: 10%;
    .thumbnail {
      background-color: #eaeaea;
      cursor: pointer;
    }
  }
  .doc-view-wrapper {
    flex: 1;
  }
}
</style>
