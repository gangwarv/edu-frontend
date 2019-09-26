import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
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
            {
                text: "PHD",
                value: "PHD",
                isActive: true
            },
            {
                text: "DIPLOMA",
                value: "UGD",
                isActive: true
            },
            {
                text: "PG DIPLOMA",
                value: "PG",
                isActive: true
            }
        ]
    },
    mutations: {
        increment(state) {
            state.count++
        },
        incrementByNum(state, num) {
            state.count += num
        },
        resetToZero(state) {
            state.count = 0;
        }
    },
    actions: {
        incrementBy: function ({ commit, ...rest }, num) {
            console.log(rest, num)
        }
    }
})

