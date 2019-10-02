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

export const UPSERT_ROLE = gql`
    mutation AddRole($id: String, $name: String!, $privileges: String!){
        addRole(id: $id, name: $name, privileges: $privileges){
            id,
            name,
            privileges
        }
    }
`