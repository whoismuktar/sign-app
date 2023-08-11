<template>
  <div id="app">
    <Nav />
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>
