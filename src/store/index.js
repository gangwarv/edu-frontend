import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0
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

