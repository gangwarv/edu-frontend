import gql from 'graphql-tag'

export const GET_AC_DEPT = gql`
    query GetAcDepts($isActive: Boolean) {
        acDepts(isActive: $isActive) {
            _id,
            name
        }
    }
`