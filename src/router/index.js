import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import LoginView from "@/views/Login";
import RegisterView from "@/views/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
