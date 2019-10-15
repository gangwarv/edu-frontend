import gql from 'graphql-tag'

export const LOGIN = gql`
    mutation Login($userName:String!, $password: String!){
        login(userName: $userName, password: $password){
            userId,
            userName,
            token,
            expiresIn,
            roleName,
            privileges
        }
    }
`