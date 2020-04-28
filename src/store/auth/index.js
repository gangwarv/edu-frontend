import { AUTH_SET, AUTH_REMOVE } from "./types";

export default {
  state: {
    auth: JSON.parse(sessionStorage.getItem("e1d2u3e4r5p6")),
    // menus: []
  },
  getters: {
    auth(state) {
      if (!state.auth) {
        return null;
      }
      return state.auth.userData;
    },
    menus(state) {
      return (state.auth && state.auth.menus) || [];
    },
    topMenus(state, getters) {
      return getters.menus.filter((x) => x.position === "top");
    },
    leftMenus(state, getters) {
      return getters.menus.filter((x) => x.position === "left");
    },
    modules(state, getters) {
      return getters.menus
        .map((x) => x.module)
        .filter((m, i, ar) => ar.indexOf(m) === i)
        .map((module) => ({
          name: module,
          menus: getters.leftMenus.filter((lm) => lm.module === module),
        }));
    },
  },
  mutations: {
    [AUTH_SET](state, { data: data, menus }) {
      const auth = {
        menus,
        data: {
          ...data,
          expiringIn: new Date(data.expiresIn),
        },
      };
      state.auth = auth;
      sessionStorage.setItem("e1d2u3e4r5p6", JSON.stringify(auth));
    },
    [AUTH_REMOVE](state) {
      state.auth = null;
      sessionStorage.removeItem("e1d2u3e4r5p6");
    },
  },
  actions: {},
};
