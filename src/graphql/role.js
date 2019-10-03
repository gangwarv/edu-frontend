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

export const ADD_ROLE = gql`
    mutation AddRole($name: String!, $privileges: String!){
        addRole(name: $name, privileges: $privileges){
            id,
            name,
            privileges
        }
    }
`