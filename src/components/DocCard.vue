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

      <div class="doc-preview-wrapper">
        <div class="doc-preview-cta text-center mb-3">
          <v-btn class="pryBtn" :to="`/docs/${document.id}/sign`">
            Sign Document
          </v-btn>
        </div>
        <div class="doc-preview-content">
          <div class="doc-thumbnails">
            <div v-for="(doc, index) in documentUploads" :key="index">
              <div
                :class="[
                  `thumbnail allChildrenCenter pa-4 mb-2 ${
                    doc.file_url === selectedDoc.file_url && 'thumbnail--active'
                  }`,
                ]"
                @click="updateSelected(doc)"
              >
                <span>
                  {{ index + 1 }}
                </span>
              </div>

              <div
                v-if="doc.file_url === selectedDoc.file_url"
                class="doc-preview-cta d-flex justify-space-between mb-3"
              >
                <v-btn small class="secBtn" :to="`/docs/${document.id}`">
                  View
                </v-btn>
                <v-btn small class="pryBtn" :to="`/docs/${document.id}/sign`">
                  Sign
                </v-btn>
              </div>
            </div>
          </div>

          <div class="doc-view-wrapper">
            <vue-pdf-app
              v-if="selectedDoc.file_url"
              :pdf="selectedDoc.file_url"
            ></vue-pdf-app>
            <!-- TODO remove unneeded action icons -->
          </div>
        </div>
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

        console.log();

        this.viewDocActive = true;
      } catch (error) {
        console.log({ error });
      }
    },
    closeDoc() {
      this.viewDocActive = false;
    },
    updateSelected(doc) {
      this.selectedDoc = doc;
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
  &-wrapper {
    background-color: #ffffff;
    height: 100vh;
    width: 80%;
    position: absolute;
    right: 0;
    padding: 40px;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    height: 90%;

    .doc-thumbnails {
      width: 10%;
      .thumbnail {
        background-color: #eaeaea;
        cursor: pointer;

        &--active {
          border: 2px solid;
        }
      }
    }
    .doc-view-wrapper {
      flex: 1;
    }
  }
}
</style>
