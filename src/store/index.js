import Vue from "vue";
import Vuex from "vuex";

import { AUTH_SET, AUTH_REMOVE } from "./auth/types";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // auth,
  },
  state: {
    auth: JSON.parse(sessionStorage.getItem("e1d2u3e4r5p6")),
    courseTypes: [
      {
        text: "UG",
        value: "UG",
        isActive: true,
      },
      {
        text: "PG",
        value: "PG",
        isActive: true,
      },
      {
        text: "INT",
        value: "INT",
        isActive: true,
      },
      // {
      //     text: "PHD",
      //     value: "PHD",
      //     isActive: false
      // },
      {
        text: "DIPLOMA",
        value: "UGD",
        isActive: false,
      },
      {
        text: "PG DIPLOMA",
        value: "PGD",
        isActive: false,
      },
      {
        text: "DOCTORATE",
        value: "PHD",
        isActive: false,
      },
    ],
    courseDurations: [
      {
        text: "1-Year",
        value: "1-Y",
        isActive: false,
      },
      {
        text: "2-Year",
        value: "2-Y",
        isActive: false,
      },
      {
        text: "3-Year",
        value: "3-Y",
        isActive: true,
      },
      {
        text: "4-Year",
        value: "4-Y",
        isActive: false,
      },
      {
        text: "5-Year",
        value: "5-Y",
        isActive: true,
      },
      {
        text: "4-Semester",
        value: "4-S",
        isActive: true,
      },
      {
        text: "6-Semester",
        value: "6-S",
        isActive: true,
      },
      {
        text: "8-Semester",
        value: "8-S",
        isActive: true,
      },
      {
        text: "10-Semester",
        value: "10-S",
        isActive: false,
      },
    ],
    genders: [
      {
        text: "Male",
        value: "Male",
        isActive: true,
      },
      {
        text: "Female",
        value: "Female",
        isActive: true,
      },
      {
        text: "Other",
        value: "Other",
        isActive: true,
      },
    ],
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
    // leftMenus(state, getters) {
    //   return getters.menus.filter((x) => x.position === "left");
    // },
    modules(state, getters) {
      return getters.menus
        .map((x) => x.module)
        .filter((m, i, ar) => ar.indexOf(m) === i)
        .map((module) => ({
          name: module,
          menus: getters.menus.filter((lm) => lm.module === module && lm.position == 'left'),
        }))
        .filter(x=>x.menus.length);
    },
    courseTypes(state) {
      return state.courseTypes.filter((x) => x.isActive);
    },
    courseDurations(state) {
      return state.courseDurations.filter((x) => x.isActive);
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
});
