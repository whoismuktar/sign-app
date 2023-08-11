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
          backgroundImage: 'url(' + imagePdfDataUrl.src + ')',
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

        <span
          class="printFile2"
          :style="{ top: `${position.y}px`, left: `${position.x}px` }"
          @mousedown="startDrag"
          @mousemove="drag"
          @mouseup="stopDrag"
          >123456789</span
        >
        <div class="printFile">1</div>

        <div
          v-if="imagePdfDataUrl.src"
          :width="imagePdfDataUrl.width"
          :height="imagePdfDataUrl.height"
          id="imagePdfDataUrl"
          :style="{ backgroundImage: imagePdfDataUrl.src }"
          :src="imagePdfDataUrl.src"
          alt="document preview"
        ></div>
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
      isDragging: false,
      position: { x: 0, y: 0 },
      startPos: { x: 0, y: 0 },
      parentDimensions: { width: 0, height: 0 },
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.startPos.x = event.clientX - this.position.x;
      this.startPos.y = event.clientY - this.position.y;
      this.getParentDimensions();
    },
    drag(event) {
      if (this.isDragging) {
        const newX = event.clientX - this.startPos.x;
        const newY = event.clientY - this.startPos.y;
        this.position.x = Math.min(
          Math.max(newX, 0),
          this.parentDimensions.width
        );
        this.position.y = Math.min(
          Math.max(newY, 0),
          this.parentDimensions.height
        );
      }
    },
    stopDrag() {
      this.isDragging = false;
    },
    getParentDimensions() {
      const box = this.$refs.box;
      this.parentDimensions.width = box.clientWidth;
      this.parentDimensions.height = box.clientHeight;
    },
    onPrintDrag(e) {
      console.log({ e });
      console.log([this.$refs.box]);
      console.log(this.boxBoundPosition);
    },
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
    boxBoundPosition() {
      const box = this.$refs.box;
      const rect = box.getBoundingClientRect();

      return {
        x: rect.left,
        y: rect.top,
      };
    },
    tempFile() {
      return "data:image/png;base64,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";
    },
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
  background-size: contain;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */

  position: relative;
  overflow: hidden;

  #previewCanvas {
    visibility: hidden;
  }

  // img#imagePdfDataUrl {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  // }

  .printFile2 {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #3498db;
    color: #fff;
    text-align: center;
    line-height: 100px;
    cursor: grab;
  }
}
</style>
