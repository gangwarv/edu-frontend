import gql from 'graphql-tag'

export const GET_AC_DEPTS = gql`
    query GetAcDepts($isActive: Boolean){
        acDepts(isActive: $isActive){
            id,
            name,
            isActive,
            createdAt,
            updatedAt
        }
    }
`
// export const GET_ACTIVE_AC_DEPTS = gql`
//     query GetActiveAcDepts{
//         acDepts(isActive: true){
//             id,
//             name,
//             isActive,
//             createdAt,
//             updatedAt
//         }
//     }
// `
export const GET_AC_DEPT_BY_ID = gql`
    query GetAcDept($id: String!){
        acDept(id: $id){
            id,
            name,
            isActive,
            createdAt,
            updatedAt
        }
    }
`
export const UPSERT_AC_DEPT = gql`
    mutation AddAcDept($id:String, $name:String!, $isActive:Boolean!){
        addAcDept(dept:{id:$id,name:$name,isActive:$isActive}){
            id,
            name,
            isActive,
            createdAt,
            updatedAt
        }
    }
`
export const REMOVE_AC_DEPT = gql`
    mutation RemoveAcDept($id:String!){
        deleteAcDept(id: $id){
            id,
            name
        }
    }
`

export const getAcDepts = function depts(isActive) {
    return {
      query: GET_AC_DEPTS,
      manual: true,
      result({ data, loading }) {
        if (!loading) {
          this.depts = data.acDepts.filter(x => x.isActive === isActive || isActive === undefined);
        }
      }
    };
  }

//   export const  