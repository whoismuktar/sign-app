import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "@/views/Profile";
import LoginView from "@/views/Login";
import RegisterView from "@/views/Register";
import Documents from "@/views/documents";
import DisplayDoc from "@/views/documents/DisplayDoc";
import SignDoc from "@/views/documents/SignDoc";
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
    path: "/docs",
    alias: "/documents",
    name: "documents",
    component: Documents,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/:docId",
    name: "displayDoc",
    component: DisplayDoc,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/docs/:docId/sign",
    name: "signDoc",
    component: SignDoc,
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
