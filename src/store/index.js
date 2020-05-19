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
        name: "UG",
        id: "UG",
        isActive: true,
      },
      {
        name: "PG",
        id: "PG",
        isActive: true,
      },
      {
        name: "INT",
        id: "INT",
        isActive: true,
      },
      {
        name: "DIPLOMA",
        id: "UGD",
        isActive: false,
      },
      {
        name: "PG DIPLOMA",
        id: "PGD",
        isActive: false,
      },
      {
        name: "DOCTORATE",
        id: "PHD",
        isActive: false,
      },
    ],
    courseDurations: [
      {
        name: "1-Year",
        id: "1-Y",
        isActive: false,
      },
      {
        name: "2-Year",
        id: "2-Y",
        isActive: false,
      },
      {
        name: "3-Year",
        id: "3-Y",
        isActive: true,
      },
      {
        name: "4-Year",
        id: "4-Y",
        isActive: false,
      },
      {
        name: "5-Year",
        id: "5-Y",
        isActive: true,
      },
      {
        name: "4-Semester",
        id: "4-S",
        isActive: true,
      },
      {
        name: "6-Semester",
        id: "6-S",
        isActive: true,
      },
      {
        name: "8-Semester",
        id: "8-S",
        isActive: true,
      },
      {
        name: "10-Semester",
        id: "10-S",
        isActive: false,
      },
    ],
    genders: [
      {
        name: "Male",
        id: "Male",
        isActive: true,
      },
      {
        name: "Female",
        id: "Female",
        isActive: true,
      },
      {
        name: "Other",
        id: "Other",
        isActive: true,
      },
    ],
    years: [
      {
        name: "1-Year",
        id: "1",
        isActive: true,
      },
      {
        name: "2-Year",
        id: "2",
        isActive: true,
      },
      {
        name: "3-Year",
        id: "3",
        isActive: true,
      },
      {
        name: "4-Year",
        id: "4",
        isActive: true,
      },
      {
        name: "5-Year",
        id: "5",
        isActive: true,
      },
    ],
    feeTypes:[
      {
        name: "type-1 (Course-Fee)",
        id: "type-1",
        isActive: true,
      },
      {
        name: "type-2 (Other-Fee)",
        id: "type-2",
        isActive: true,
      },
    ]
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
    modules(state, getters) {
      return getters.menus
        .map((x) => x.module)
        .filter((m, i, ar) => ar.indexOf(m) === i)
        .map((module) => ({
          name: module,
          menus: getters.menus.filter(
            (lm) => lm.module === module && lm.position == "left"
          ),
        }))
        .filter((x) => x.menus.length);
    },
    courseTypes(state) {
      return state.courseTypes.filter((x) => x.isActive);
    },
    courseDurations(state) {
      return state.courseDurations.filter((x) => x.isActive);
    },
    years(state) {
      return state.years;
    },
    feeTypes(state){
      return state.feeTypes;
    }
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
