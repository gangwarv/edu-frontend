import gql from 'graphql-tag'

export const GET_USERS = gql`
    query GetUsers{
        users{
            id,
            firstName,
            lastName,
            userName,
            userType,
            isActive,
            role,
            roleName,
            privileges
        }
    }
`
export const GET_USER_BY_ID = gql`
    query GetUser($id: String!){
        user(id: $id){
            id,
            firstName,
            lastName,
            userName,
            userType,
            isActive,
            role,
            roleName,
            privileges
        }
    }
`

export const UPSERT_USER = gql`
    mutation AddUser($id: String, $firstName: String!, $lastName: String!, $userName: String!, $password: String, $role: String!, $userType: String!, $isActive: Boolean){
        addUser(user:{id: $id, firstName: $firstName, lastName: $lastName, userName: $userName, password: $password, role: $role, userType: $userType}){
            id,
            firstName,
            lastName,
            userName,
            userType,
            isActive,
            role,
            roleName,
            privileges
        }
    }
`