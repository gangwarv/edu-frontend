import gql from 'graphql-tag'

export const GET_USERS = gql`
    query GetUsers{
        users{
            _id,
            userName,
            role {
                name,
                privileges
            }
        }
    }
`

export const ADD_USER = gql`
    mutation AddUser($userName: String!, $password: String!, $role: String!){
        addUser(userName: $userName, password: $password, role: $role){
            _id,
            userName,
            role {
                name,
                privileges
            }
        }
    }
`