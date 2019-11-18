import ApolloClient from 'apollo-client'
import Vue from 'vue'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import store from './store'

Vue.use(VueApollo)

const link = ApolloLink.from([
    setContext(() => ({
        headers: {
            'authorization': `Bearer ${store.state.auth && store.state.auth.token}`
        }
    })),
    new HttpLink({
        uri: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/graphql' : 'https://agile-plateau-01519.herokuapp.com/graphql'
    })
]);

export const apolloClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
        $query: {
            fetchPolicy: 'cache-and-network'
        }
    },
    // errorHandler(err) {
    //     console.log('gloabl', err.message)
    // }
})