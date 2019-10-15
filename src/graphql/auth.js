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

// export const ADD_ROLE = gql`
//     mutation AddRole($name: String!, $privileges: String!){
//         addRole(name: $name, privileges: $privileges){
//             _id,
//             name,
//             privileges
//         }
//     }
// `