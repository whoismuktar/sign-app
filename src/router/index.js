import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "@/views/Profile";
import LoginView from "@/views/Login";
import RegisterView from "@/views/Register";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    alias: "/login",
    component: LoginView,
    meta: {
      requiresLanding: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresLanding: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
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
