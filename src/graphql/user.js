import gql from 'graphql-tag'

export const GET_USERS = gql`
    query GetUsers{
        users{
            id,
            firstName,
            lastName,
            userName,
            userType,
            email,
            mobile,
            isActive,
            role,
            roleName,
            privileges,
            updatedAt
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
            email,
            mobile,
            isActive,
            role,
            roleName,
            privileges
        }
    }
`

export const UPSERT_USER = gql`
    mutation AddUser($id: String, $firstName: String!, $lastName: String!, $userName: String!, $password: String,
     $role: String!, $userType: String!, $isActive: Boolean!, $mobile: String!, $email: String){
        addUser(user:{id: $id, firstName: $firstName, lastName: $lastName, userName: $userName, password: $password,
         role: $role, userType: $userType, isActive: $isActive, mobile: $mobile, email: $email}){
            id,
            firstName,
            lastName,
            userName,
            userType,
            email,
            mobile,
            isActive,
            role,
            roleName,
            privileges
        }
    }
`