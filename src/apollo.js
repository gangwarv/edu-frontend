import ApolloClient from 'apollo-client'
import Vue from 'vue'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import store from './store'

import store from './store'

Vue.use(VueApollo)

const httpLink = new HttpLink({
    // URL to graphql server, you should use an absolute URL here
    uri: 'http://localhost:3000/graphql',
    headers: {
<<<<<<< HEAD
        'authorization':  store.state.auth && store.state.auth.token
=======
        'authorization': `Bearer ${store.state.auth && store.state.auth.token}`
>>>>>>> origin/HEAD
    }
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler(err) {
        console.log('gloabl', err.message)
    }
})