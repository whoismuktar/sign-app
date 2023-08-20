// console.log = () => {} 

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "@/assets/styles/base.scss"; // Custom CSS
import router from "./router";

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  const TOKEN = localStorage.getItem("auth_token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (TOKEN) {
      next();
    } else {
      window.location.href = "/login";
    }
  }

  if (to.matched.some((record) => record.meta.requiresLanding)) {
    if (TOKEN) {
      window.location.href = "/profile";
    } else {
      next();
    }
  }

  next();
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
