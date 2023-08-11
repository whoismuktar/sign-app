<template>
  <div class="contractParties">
    <div class="signOnlineParent">
      <div class="signOnlineWrapper d-flex flex-column">
        <v-btn
          small
          icon
          depressed
          class="closeDigitalSignature white"
          @click="clearAndClose()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div>
          <div class="mb-2 d-flex justify-center">
            <v-btn depressed @click="updateMode('draw')">Draw</v-btn>
            <v-btn depressed @click="updateMode('text')">Text</v-btn>
            <v-btn depressed @click="updateMode('image')">Image</v-btn>


            <div style="max-width: 140px">
              <v-select
                v-model="sigType"
                solo
                label="Choose Type"
                flat
                dense
                hide-detail
                :items="signatureTypes"
                offset-y
              ></v-select>
            </div>
          </div>
        </div>
        <div class="pad-container allChildrenCenter">
          <div v-show="mode === 'draw'" class="signOnline_pad flex-grow-1">
            <canvas id="canvas_signaturePad" class="mb-2"></canvas>
          </div>

          <div v-if="mode === 'text'" class="flex-grow-1">
            <v-text-field
              v-model.trim="sigText"
              label="Enter Text"
              clearable
              hide-details
              class="text-center"
            ></v-text-field>
          </div>

          <div
            v-if="mode === 'image'"
            class="image-pad allChildrenCenter"
            :style="{
              backgroundImage: 'url(' + previewImage + ')',
            }"
          >
            <input
              v-show="!previewImage"
              type="file"
              accept="image/jpeg"
              @change="processImage"
              ref="imagePicker"
            />
          </div>
        </div>

        <div class="text-center mt-10">
          <hr class="mb-5" />
          <v-btn
            id="save-png"
            width="170"
            class="pryBtn"
            :disabled="!sigType"
            @click="getSignatureValue"
          >
            Apply Print
          </v-btn>

          <v-btn
            :ripple="false"
            text
            depressed
            @click="clearSignature"
            class="secBtn ml-6"
          >
            Clear
          </v-btn>

          <v-btn
            v-if="mode === 'image' && previewImage"
            :ripple="false"
            text
            depressed
            icon
            @click="changeImage"
            class="ml-6"
          >
            <v-icon>mdi-restore</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";

export default {
  data() {
    return {
      mode: "draw",
      previewImage: "",
      drawnSignature: "",
      sigText: "",
      sigType: "",
    };
  },
  methods: {
    changeImage() {
      this.$refs.imagePicker.click();
    },
    processImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    updateMode(mode) {
      this.mode = mode;
    },
    getSignatureValue() {
      switch (this.mode) {
        case "draw":
          if (this.drawnSignature.isEmpty()) {
            return alert("Please draw a signature first.");
          }

          this.$emit(
            "getSignatureValue",
            this.drawnSignature.toDataURL("image/png")
          );
          break;

        case "text":
          if (!this.sigText) {
            return alert("Please enter your text first.");
          }
          var canvas = document.createElement("canvas");
          canvas.width = 620;
          canvas.height = 80;
          var ctx = canvas.getContext("2d");
          ctx.font = "30px Arial";
          var text = this.sigText;
          ctx.fillText(text, 10, 50);

          this.$emit("getSignatureValue", canvas.toDataURL());
          break;

        case "image":
          if (!this.previewImage) {
            return alert("Please upload an image first.");
          }
          this.$emit("getSignatureValue", this.previewImage);
          break;
      }
    },
    clearAndClose() {
      this.$emit("closeDialog");
    },
    clearSignature() {
      this.previewImage = "";
      this.sigText = "";
      this.sigType = "";

      if (this.$refs.imagePicker) {
        this.$refs.imagePicker.value = "";
      }
      this.drawnSignature.clear();
    },
    initSignatoryPad() {
      setTimeout(() => {
        // Digital Signature
        var canvas = document.querySelector("#canvas_signaturePad");
        function resizeCanvas() {
          var ratio = Math.max(window.devicePixelRatio || 1, 1);
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext("2d").scale(ratio, ratio);
        }

        window.onresize = resizeCanvas;
        resizeCanvas();

        this.drawnSignature = new SignaturePad(canvas, {});
      }, 500);
    },
    resetSignatureSelection() {
      this.userSignatureHasImage = false;
      this.userSignature = "";

      // Remove emission from appended form
      this.appendToFormData();
    },
  },
  watch: {
    mode() {
      this.clearSignature();
    },
  },
  computed: {
    signatureTypes() {
      const options =
        "Initial|Signature|NotaryStamp|NotaryTraditionalSeal|NotaryDigitalSeal|CompanyStamp|CompanySeal|Photograph|Camera|LeftThumbFinger|LeftPointerFinger|LeftMiddleFinger|LeftRingFinger|LeftPinkyFinger|LeftPinkyFinger|RightThumbFinger|RightPointerFinger|RightMiddleFinger|RightRingFinger|RightPinkyFinger|Text";

      const vals = options.split("|");
      return vals;
    },
    isValueAvailable() {
      return (
        this.drawnSignature.toDataURL("image/png") ||
        this.sigText ||
        this.previewImage
      );
    },
  },
  mounted() {
    this.initSignatoryPad();
    console.log(this.signatureTypes);
  },
};
</script>

<style>
.v-dialog.signOnlineDialog {
  box-shadow: none;
  overflow: unset;
  height: 80%;
}

.signOnlineWrapper {
  position: relative;
  height: 100%;
  padding: 40px;
}

.closeDigitalSignature {
  position: absolute;
  top: 20px;
  right: 14px;
}

.signOnline_pad {
  position: relative;
  min-height: 200px;
  background-color: #fff;
}

.pad-elements-wrapper {
  width: 100%;
}

.pad-elements-wrapper hr {
  background-color: #000000;
  height: 1px;
}

.pad-container {
  height: 300px;
  background-color: #ffffff;
  padding: 20px;
}

.image-pad {
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: center;
}

#canvas_signaturePad {
  width: 100%;
  height: 300px;
  /* height: 100%; */
}

.signOnline_pad .signOnline_clearBtn {
  /* position: absolute;
  bottom: 30px;
  right: 30px; */
  min-width: 0 !important;
  text-transform: capitalize;
}

/* .signOnline_clearBtn  */

.signOnlineParent {
  width: 80%;
  margin: 0 auto;
  background-color: #f2f6f8;
}

.contractSignatory .signOnline_Btn {
  text-transform: capitalize;
  color: #1ca092;
}

.contractParties {
  width: 85%;
  margin: 0 auto;
}

.contractParties .partyName {
  /* width: 85%; */
  text-align: center;
  font-size: 30px;
  line-height: 5;
}

.contractParties .partyName label {
  text-align: center !important;
  width: 85%;
}
.contractParties .partyName input {
  text-align: center !important;
}

.contractParties .name input {
  text-align: center;
  padding: 50px 0 70px 0;
}

.contractSignatory .uploadItem {
  background-color: #fff;
  padding-bottom: 50px;
  width: 100%;
  border-radius: 9px;
  background-position: center;
  background-size: contain;
  box-shadow: none;
  cursor: pointer;
}

.container.contractSignatory {
  padding: 0;
}

.uploadItemParent {
  position: relative;
}

.resetReceiptInvoiceLogoSelection,
.resetSignatureSelection {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
