import gql from "graphql-tag";

export const GET_SESSIONS = gql`
    query GetSessions{
        sessions(top: 10){
            id
            name
        }
    }
`;

export const GET_ALL_SESSIONS = gql`
    query GetSessions{
        sessions(top: 10){
            id
            name
            year
        }
    }
`;

export const GET_SESSION_BY_ID = gql`
    query GetSession($id: String!){
        session(id: $id){
            id
            name
            year
        }
    }
`;

export const UPSERT_SESSION = gql`
  mutation AddSession($id: String!, $year: Int!) {
    addSession(id: $id, name: $id, year: $year) {
      id
      name
      year
    }
  }
`;
