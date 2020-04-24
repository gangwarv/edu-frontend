import gql from "graphql-tag";

export const GET_DEPARTMENTS = gql`
  query GetDepartments($isActive: true) {
    departments(isActive: $isActive) {
      id
      name
    }
  }
`;
export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments {
    departments {
      id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_DEPARTMENT_BY_ID = gql`
  query GetDepartment($id: String!) {
    department(id: $id) {
      id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const UPSERT_DEPARTMENT = gql`
  mutation AddDepartment($id: String, $name: String!, $isActive: Boolean!) {
    addDepartment(dept: { id: $id, name: $name, isActive: $isActive }) {
      id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const REMOVE_DEPARTMENT = gql`
  mutation RemoveDepartment($id: String!) {
    deleteDepartment(id: $id) {
      id
      name
    }
  }
`;

// export const getAcDepts = function(isActive) {
//   return {
//     query: GET_ALL_DEPARTMENTS,
//     manual: true,
//     result({ data, loading }) {
//       if (!loading) {
//         this.depts = data.acDepts.filter(
//           (x) => isActive || x.isActive === true
//         );
//       }
//     },
//   };
// };
