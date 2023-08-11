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

        <img
          v-if="printFile.src"
          :src="printFile.src"
          class="print-file"
          :style="{ top: `${position.y}px`, left: `${position.x}px` }"
          @mousedown="startDrag"
          @mousemove="drag"
          @mouseup="stopDrag"
          alt=""
          ref="printFile"
        />
        <!-- TODO add alt on all images -->

        <input />
      </div>
    </div>

    <div class="text-center mt-10">
      <v-btn :disabled="!printFile.src" class="pryBtn" @click="signAndSubmit"
        >Sign and Submit</v-btn
      >
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import {
  createPrint,
  createResourceTool,
  getSingleDoc,
  selfSignDocument,
} from "@/services/documents";
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
      printFile: {},
      printId: "",
    };
  },
  methods: {
    async signAndSubmit() {
      this.postPrint()
        .then((printRes) => {
          console.log({ printRes });

          return this.postResourceTool();
        })
        .then((resourceRes) => {
          console.log({ resourceRes });

          this.initSelfSign();

          // TODO toast
        })
        .catch((err) => {
          console.log({ err });
        });

      // TODO toast
    },
    async postPrint() {
      console.log("start post post print");
      const data = {
        file: this.printFile.src,
        type: this.printFile.type,
        category: this.printFile.category,
        value: "",
      };

      return createPrint(data).then((res) => {
        console.log({ res });
        this.printId = res.data.data[this.printFile.type][0].id;
        return res;
      });
    },
    async postResourceTool() {
      console.log("start post resource");
      const data = {
        document_upload_id: this.docUploadId,
        user_id: this.userId,
        append_print_id: this.printId,
        tool_name: this.printId,
        tool_class: this.$refs.printFile.className,
        tool_height: `${this.$refs.printFile.offsetHeight}`,
        tool_width: `${this.$refs.printFile.offsetWidth}`,
        tool_pos_top: `${this.$refs.printFile.getBoundingClientRect().top}`,
        tool_pos_left: `${this.$refs.printFile.getBoundingClientRect().left}`,
        type: "",
        category: "",
        value: "",
      };

      return createResourceTool(data).then((res) => {
        return res;
      });
    },
    async initSelfSign() {
      console.log("start self sign");

      selfSignDocument(this.docId)
        .then((res) => {
          console.log({ res });
        })
        .catch((err) => {
          console.log({ err });
        });
    },
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
      this.printFile = val;
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
    userId() {
      return localStorage.getItem("inperson")
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
    printFileRef() {
      return this.$refs.printFile;
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

  .print-file {
    position: absolute;
    cursor: grab;
    width: 200px;
    height: auto;
    object-fit: contain;
  }
}
</style>
