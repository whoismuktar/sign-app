<template>
  <div id="app">
    <Nav v-if="isAuthenticated" />
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
  computed: {
    isAuthenticated(){
      return localStorage.getItem("auth_token")
    }
  }
};
</script>
