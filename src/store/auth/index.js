import { AUTH_SET, AUTH_REMOVE } from './types'

export default {
    state: {
        auth: JSON.parse(sessionStorage.getItem('e1d2u3e4r5p6')),
        menus: [
            {
                text: "Hello",
                path: "/hello",
                module: "Home",
                position: 'left'
            },
            {
                text: "Academic Departments",
                path: "/acdepts",
                module: "EDP",
                position: 'left'
            },
            {
                text: "Courses",
                path: "/courses",
                module: "Master",
                position: 'left'
            },
            {
                text: "Categories",
                path: "/categories",
                module: "Master",
                position: 'left'
            },
            {
                text: "Users",
                path: "/users",
                module: "EDP",
                position: 'left'
            },
            {
                text: "Roles",
                path: "/roles",
                module: "EDP",
                position: 'left'
            },
            {
                text: "Profile",
                path: "/profile",
                module: "EDP",
                position: 'top'
            }
        ]
    },
    getters: {
        auth(state) {
            return state.auth
        },
        topMenus(state){
            return state.menus.filter(x=>x.position==='top')
        },
        leftMenus(state){
            return state.menus.filter(x=>x.position==='left')
        }
    },
    mutations: {
        [AUTH_SET](state, authData) {
            delete authData.__typename;
            const auth = {
              ...authData,
              validFrom: new Date(authData.validFrom),
              expiringIn: new Date(authData.expiresIn)
            };
            state.auth = auth;
            sessionStorage.setItem("e1d2u3e4r5p6", JSON.stringify(auth));
        },
        [AUTH_REMOVE](state) {
            state.auth = null;
            sessionStorage.removeItem("e1d2u3e4r5p6");
        }
    },
    actions: {
        
    }
}

