import { AUTH_SET, AUTH_REMOVE, AUTH_START_REFRESH, AUTH_STOP_REFRESH } from './types'

export default {
    state: {
        auth: JSON.parse(sessionStorage.getItem('e1d2u3e4r5p6')),
        refresh: false,
    },
    getters: {
        auth(state) {
            return state.auth
        },
        refresh(state) {
            return state.refresh;
        }
    },
    mutations: {
        [AUTH_SET](state, auth) {
            state.auth = auth;
            sessionStorage.setItem("e1d2u3e4r5p6", JSON.stringify(auth));
        },
        [AUTH_REMOVE](state) {
            state.auth = null;
            sessionStorage.removeItem("e1d2u3e4r5p6");
        },
        [AUTH_START_REFRESH](state) {
            state.refresh = true;
        },
        [AUTH_STOP_REFRESH](state) {
            state.refresh = false;
        }
    },
    actions: {
        
    }
}

