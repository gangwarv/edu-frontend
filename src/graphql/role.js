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
export const GET_ROLE_BY_ID = gql`
    query GetRole($id: String!){
        role(id: $id){
            id,
            name,
            privileges
        }
    }
`

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
            id,
            name,
            privileges
        }
    }
`