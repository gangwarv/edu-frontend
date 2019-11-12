import { AUTH_SET, AUTH_REMOVE } from './types'

export default {
    state: {
        auth: JSON.parse(sessionStorage.getItem('e1d2u3e4r5p6')),
        // menus: []
    },
    getters: {
        auth(state) {
            if (!state.auth) {
                return null;
            }
            const { menus, ...rest } = state.auth;
            return rest;
        },
        menus(state) {
            return (state.auth && state.auth.menus) || [];
        },
        topMenus(state, getters) {
            return getters.menus.filter(x => x.position === 'top')
        },
        leftMenus(state, getters) {
            return getters.menus.filter(x => x.position === 'left')
        },
        modules(state, getters) {
            return getters.menus
                .map(x => x.module)
                .filter((m, i, ar) => ar.indexOf(m) === i);
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
        },

    },
    actions: {

    }
}

