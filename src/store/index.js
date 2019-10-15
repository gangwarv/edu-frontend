import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 10,
        auth: JSON.parse(sessionStorage.getItem('e1d2u3e4r5p6')),
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
        ],
        menus: [
            {
                text: "Hello",
                path: "/hello",
                module: "Home"
            },
            // {
            //     text: "Register",
            //     path: "/register",
            //     module: "Home"
            // },
            {
                text: "Academic Departments",
                path: "/acdepts",
                module: "EDP"
            },
            {
                text: "Courses",
                path: "/courses",
                module: "Master"
            },
            {
                text: "Users",
                path: "/users",
                module: "EDP"
            },
            {
                text: "Roles",
                path: "/roles",
                module: "EDP"
            },
            // {
            //     text: "Profile",
            //     path: "/profile",
            //     module: "My Account"
            // }
        ]
    },
    getters: {
        courseTypes(state, getters) {
            return state.courseTypes.filter(x => x.isActive);
        },
        courseDurations(state, getters) {
            return state.courseDurations.filter(x => x.isActive);
        },
        leftMenus(state) {
            return state.menus.filter(x =>x)
        },
        menus(state) {
            return state.menus;
        },
        modules(state){
            return state.menus
            .map(x => x.module)
            .filter((m, i, ar) => ar.indexOf(m) === i);
        }
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
        },
        setAuth(state, auth){
            state.auth = auth;
            sessionStorage.setItem("e1d2u3e4r5p6", JSON.stringify(auth));
        },
        removeAuth(state){
            state.auth = null;
            sessionStorage.removeItem("e1d2u3e4r5p6");
        }
    },
    actions: {
        incrementBy: function ({ commit, ...rest }, num) {
            console.log(rest, num)
        }
    }
})

