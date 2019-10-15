import gql from 'graphql-tag'

export const GET_ROLES = gql`
    query GetRoles{
        roles{
            id,
            name,
            privileges
        }
    }
`

<<<<<<< HEAD
export const ADD_ROLE = gql`
    mutation AddRole($name: String!, $privileges: String!){
        addRole(name: $name, privileges: $privileges){
=======
export const UPSERT_ROLE = gql`
    mutation AddRole($id: String, $name: String!, $privileges: String!){
        addRole(id: $id, name: $name, privileges: $privileges){
            id,
            name,
            privileges
        }
    }
`

export const DELETE_ROLE = gql`
    mutation AddRole($id: String!){
        deleteRole(id: $id){
>>>>>>> master
            id,
            name,
            privileges
        }
    }
`