<template>
  <div class="sign-doc">
    <div class="toolbar text-center">
      <v-btn depressed @click="signaturePadActive = true">Add Signatory</v-btn>
    </div>

    <v-dialog
      v-model="signaturePadActive"
      persistent
      content-class="signOnlineDialog"
    >
      <append-signature
        v-if="signaturePadActive"
        @closeDialog="handleCloseDialog"
        @getSignatureValue="handleSignatureValue"
        ref="appendSignature"
      />
    </v-dialog>

    <div class="playground">
      <div
        class="sign-box"
        :style="{
          width: `${imagePdfDataUrl.width || 300}px`,
          height: `${imagePdfDataUrl.height || 300}px`,
        }"
        ref="box"
      >
        <vue-pdf-app
          :config="{
            toolbar: false,
          }"
          ref="pdfApp"
          theme="dark"
          page-scale="page-fit"
          :pdf="docUploadItem?.file_url"
          id="previewCanvas"
          @open="openPDFHandler"
        ></vue-pdf-app>

        <img
          v-if="imagePdfDataUrl.src"
          :width="imagePdfDataUrl.width"
          :height="imagePdfDataUrl.height"
          id="imagePdfDataUrl"
          type="image"
          :src="imagePdfDataUrl.src"
          alt="document preview"
        />
        <!-- TODO add alt on all images -->

        <input />
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { getSingleDoc } from "@/services/documents";
import appendSignature from "@/components/AppendSignature";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

export default {
  components: {
    appendSignature,
    VuePdfApp,
  },
  data() {
    return {
      base64Image: null,
      docInBase64: "",
      fetchedDocument: null,
      signaturePadActive: false,
      imagePdfDataUrl: { width: 0, height: 0, src: "" },
    };
  },
  methods: {
    async openPDFHandler(pdfApp) {
      this.info = [];
      const info = await pdfApp.pdfDocument
        .getMetadata()
        .catch(console.error.bind(console));

      if (!info) return;

      const props = Object.keys(info.info);
      props.forEach((prop) => {
        const obj = {
          name: prop,
          value: info.info[prop],
        };
        this.info.push(obj);
      });

      setTimeout(() => {
        let pdfCanvas = document.querySelector("#previewCanvas canvas");

        this.imagePdfDataUrl.src = pdfCanvas?.toDataURL("img/png");

        this.imagePdfDataUrl.width = pdfCanvas?.offsetWidth;
        this.imagePdfDataUrl.height = pdfCanvas?.offsetHeight;

        this.$refs.pdfApp.$el.style.width = 0;
        this.$refs.pdfApp.$el.style.height = 0;
      }, 500);
    },
    handleSignatureValue(val) {
      console.log({ val });
    },
    handleCloseDialog() {
      this.signaturePadActive = false;
      this.$refs.appendSignature.clearSignature();
    },
    async fetchDoc() {
      // TODO Loader
      try {
        const res = await getSingleDoc(this.docId);
        this.fetchedDocument = res.data.data;
      } catch (error) {
        console.log({ error });
      }
    },
    async convertToBase64() {
      try {
        const div = this.$refs.box;
        const canvas = await html2canvas(div, {
          useCORS: true,
          backgroundColor: null,
          scale: 2,
          dpi: 300,
          letterRendering: true,
        });
        const base64Image = canvas.toDataURL();
        this.base64Image = base64Image;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    docId() {
      return this.$route.params.docId;
    },
    docUploadId() {
      return this.$route.params.docUploadId;
    },
    documentUploads() {
      return this.fetchedDocument?.documentUploads || [];
    },
    docUploadItem() {
      return this.documentUploads.find((doc) => doc.id === this.docUploadId);
    },
  },
  mounted() {
    this.fetchDoc();
    this.convertToBase64();
  },
};
</script>

<style scoped lang="scss">
.sign-box {
  margin: 0 auto;
  margin-top: 40px;
  border: 1px solid;
  max-height: 500px;

  #previewCanvas {
    visibility: hidden;
  }

  img#imagePdfDataUrl {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
