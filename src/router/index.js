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
import edpRoutes from "./edp";
import admissionRoutes from "./admission";

Vue.use(Router);
// route.name should match
const router = new Router({
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
        ...edpRoutes,
        ...userMgmtRoutes,
        ...masterRoutes,
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
    // check if still authenticated
    if (remainingSeconds > 0) {
      // check if authorized
      if (
        !routePrivilege ||
        privileges.includes("admin") ||
        privileges.includes(routePrivilege)
      ) {
        return next();
      }
      // not authorized
      else {
        //   Dialog.alert({
        //     title:"Unauthorized",
        //     message: "access-denied",
        //     hasIcon: true,
        //     iconPack: "fas",
        //     icon: "exclamation-circle",
        //     type: "is-danger",
        //   });
        alert("access-denied");
        return next(false);
      }
    }
  }
  // if moving one route to another inside the app but isn't authorized to target route
  // if (from.name && from.name !== "login") {
  //   alert("access-denied");
  //   return next(false);
  // }

  next("login");
});

// let reminder;
router.afterEach((to) => {
  if (to.meta.public) return;

  console.log("remainingSeconds", remainingSeconds);

  if (remainingSeconds < 10) {
    apolloClient.mutate({
      mutation: LOGIN,
      variables: { userName: '--renewtoken--', password: '-- --' }
    })
      .then(({ data: { login } }) => {
        store.commit(AUTH_SET, login);
      });
  }
});

export default router;
