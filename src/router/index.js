import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import LoginView from "@/views/Login";
import RegisterView from "@/views/Register";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
