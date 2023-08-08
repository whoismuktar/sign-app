<template>
  <div class="fullscreen-view allChildrenCenter">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "fullscreen",
  props: {
    color: {
      type: String
    }
  }
}

</script>
<style scoped lang="scss">
.fullscreen-view {
  width: 100%;
  height: 100vh;
  min-height: 100%;
  background-color: $pry-color;
}
</style>