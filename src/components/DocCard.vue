<template>
  <div class="doc-card">
    <v-icon aria-hidden="false"> mdi-file </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    document: Object,
  },
};
</script>

<style scoped lang="scss">
.doc-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 70px 50px;
  margin-bottom: 10px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgba($color: $secondary-color, $alpha: 1.0);
}
</style>
