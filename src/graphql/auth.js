import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      data {
        token
        userId
        userName
        expiresIn
        roleName
        privileges
      }
      menus {
        text
        path
        module
        privilege
        position
      }
    }
  }
`;
