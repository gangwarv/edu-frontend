import Router from "vue-router";
import Vue from "vue";
import store from "../store";
// import { DialogProgrammatic as Dialog } from "buefy";
import { apolloClient } from "../apollo";
import { LOGIN } from "@/graphql/auth";
import { AUTH_SET } from "@/store/auth/types";

const HelloWorld = () => import("@/views/HelloWorld");
const Home = () => import("@/views/Home");
const Login = () => import("@/views/Login");
const Dash = () => import("@/components/layout/dash");
const NotFound = () => import("@/views/404");

// routes
import masterRoutes from "./master";
import userMgmtRoutes from "./user-management";
import admissionRoutes from "./admission";
import feeRoutes from "./fee";

Vue.use(Router);
// route.name should match
const router = new Router({
  // base:'/publish/',
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { public: true },
    },
    {
      path: "/",
      component: Dash,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "hello",
          component: HelloWorld,
          name: "Hello",
        },
        ...admissionRoutes,
        ...userMgmtRoutes,
        ...masterRoutes,
        ...feeRoutes
      ],
    },
    {
      path: "*",
      name: "notfound",
      component: NotFound,
      meta: { public: true },
    },
  ],
  mode: "history",
  linkExactActiveClass: "is-active",
});

let remainingSeconds;
router.beforeEach((to, from, next) => {
  if (to.meta.public) return next();

  const routePrivilege = to.meta.privilege;

  if (store.state.auth) {
    const { expiringIn } = store.state.auth.data;
    remainingSeconds = Math.floor((new Date(expiringIn) - new Date()) / 1000);
    const privileges = store.state.auth.data.privileges.split(",");
    // check if session is valid
    if (remainingSeconds > 1) {
      // check if authorized --else
      if (
        !routePrivilege ||
        privileges.includes("admin") ||
        privileges.includes(routePrivilege)
      ) {
        return next();
      }
      // not authorized
      else {
        alert("access-denied. Needed privilege is "+ routePrivilege);
        return next(false);
      }
    }
  }
  let path = "";
  if (to.path !== "/") path = "?path=" + escape (to.fullPath);

  next("/login" + path);
});

router.afterEach((to) => {
  if (to.meta.public) return;

  console.log("remainingSeconds", remainingSeconds);

  if (remainingSeconds < 60) {
    if (confirm("Session expiring in 30 seconds? Stay Logged In.")) {
      apolloClient
        .mutate({
          mutation: LOGIN,
          variables: { userName: "--renewtoken--", password: "-- --" },
        })
        .then(({ data: { login } }) => {
          store.commit(AUTH_SET, login);
        });
    }
  }
});

export default router;
