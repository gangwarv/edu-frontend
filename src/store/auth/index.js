import { AUTH_SET, AUTH_REMOVE } from './types'

export default {
    state: {
        auth: JSON.parse(sessionStorage.getItem('e1d2u3e4r5p6')),
        refresh: false,
    },
    getters: {
        auth(state) {
            return state.auth
        }
    },
    mutations: {
        [AUTH_SET](state, authData) {
            delete authData.__typename;
            const auth = {
              ...authData,
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

