<template>
  <div class="doc-card-wrapper">
    <div class="doc-card" @click="viewDoc = true">
      <v-icon aria-hidden="false"> mdi-file </v-icon>
    </div>

    <v-dialog
      v-model="viewDoc"
      transition="slide-x-reverse-transition"
      fullscreen
      content-class="doc-card-modal"
      overlay-color="#000000"
    >
      <!-- overlay-color="rgba(0,0,0,0.5)" -->
      <div class="modal-decoy" @click="closeDoc"></div>
      <div class="doc-preview">HELLO</div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewDoc: false,
    };
  },
  methods: {
    closeDoc() {
      this.viewDoc = false
    },
  },
  props: {
    document: Object,
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
  width: 50%;
  position: absolute;
  right: 0;
  padding: 40px;
}
</style>
