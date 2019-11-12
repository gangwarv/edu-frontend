import gql from 'graphql-tag'

export const LOGIN = gql`
    mutation Login($userName:String!, $password: String!){
        login(userName: $userName, password: $password){
            userId,
            userName,
            token,
            menus{
                text,
                path,
                module,
                privilege,
                position
            },
            validFrom,
            expiresIn,
            roleName,
            privileges
        }
    }
`