import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "@/assets/styles/base.scss"; // Custom CSS
import router from "./router";
import { getProfile } from "./services/user";

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  const TOKEN = localStorage.getItem("auth_token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let isValidated = await getProfile()
    localStorage.setItem("inperson", isValidated.data.data.id)

    console.log({isValidated})
    if (TOKEN && isValidated) {
      next();
    } else {
      window.location.href = "/login";
    }
  }

  if (to.matched.some((record) => record.meta.requiresLanding)) {
    let isValidated = await getProfile()


    console.log({TOKEN, isValidated});
    if (TOKEN && isValidated) {
      console.log(1111);
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
