import ApolloClient from 'apollo-client'
import Vue from 'vue'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
// import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import store from './store'

import { BatchHttpLink } from "apollo-link-batch-http";
const link_batch = new BatchHttpLink({ uri: 'http://localhost:3000/graphql' });

// const link_http = new HttpLink({
//     uri: //'http://52.66.206.37/graphql/'//https://fgzc4q4su1.execute-api.ap-south-1.amazonaws.com/dev/graphql'//
//     'http://localhost:3000/graphql'
// })
// console.log(link_batch,link_http)

Vue.use(VueApollo)

const link = ApolloLink.from([
    setContext(() => ({
        headers: {
            'authorization': `Bearer ${store.state.auth && store.state.auth.data.token}`
        }
    })),
    link_batch
]);

export const apolloClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
        $query: {
            fetchPolicy: 'cache-and-network' // cache-and-network cache-first
        }
    }
})