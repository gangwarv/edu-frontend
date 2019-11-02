import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...auth.state,
        courseTypes: [
            {
                text: "UG",
                value: "UG",
                isActive: true
            },
            {
                text: "PG",
                value: "PG",
                isActive: true
            },
            {
                text: "INT",
                value: "INT",
                isActive: true
            },
            // {
            //     text: "PHD",
            //     value: "PHD",
            //     isActive: false
            // },
            {
                text: "DIPLOMA",
                value: "UGD",
                isActive: false
            },
            {
                text: "PG DIPLOMA",
                value: "PGD",
                isActive: false
            },
            {
                text: "DOCTORATE",
                value: "PHD",
                isActive: false
            }
        ],
        courseDurations: [
            {
                text: "1-Year",
                value: "1-Y",
                isActive: false
            },
            {
                text: "2-Year",
                value: "2-Y",
                isActive: false
            },
            {
                text: "3-Year",
                value: "3-Y",
                isActive: true
            },
            {
                text: "4-Year",
                value: "4-Y",
                isActive: false
            },
            {
                text: "5-Year",
                value: "5-Y",
                isActive: true
            },
            {
                text: "4-Semester",
                value: "4-S",
                isActive: true
            },
            {
                text: "6-Semester",
                value: "6-S",
                isActive: true
            },
            {
                text: "8-Semester",
                value: "8-S",
                isActive: true
            },
            {
                text: "10-Semester",
                value: "10-S",
                isActive: false
            },
        ],
        genders: [
            {
                text: "Male",
                value: "Male",
                isActive: true
            },
            {
                text: "Female",
                value: "Female",
                isActive: true
            },
            {
                text: "Other",
                value: "Other",
                isActive: true
            }
        ]
    },
    getters: {
        ...auth.getters,
        courseTypes(state, getters) {
            return state.courseTypes.filter(x => x.isActive);
        },
        courseDurations(state, getters) {
            return state.courseDurations.filter(x => x.isActive);
        },
        modules(state) {
            return state.menus
                .map(x => x.module)
                .filter((m, i, ar) => ar.indexOf(m) === i);
        }
    },
    mutations: {
        ...auth.mutations
    },
    actions: {
        incrementBy: function ({ commit, ...rest }, num) {
            console.log(rest, num)
        }
    }
})

