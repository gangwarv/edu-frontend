import gql from "graphql-tag";

export const GET_COURSES_FEESTRUCTURE = gql`
  query GetList($fsSession: String!, $fsCategory: String!) {
    feeStructures(fsSession: $fsSession, fsCategory: $fsCategory) {
      fsSession
      course
      courseName
      fsCategory
      academic {
        sum
        count
      }
      nonAcademic {
        sum
        count
      }
      other {
        sum
        count
      }
    }
  }
`;

export const GET_FEECATEGORIES = gql`
  query GetFeeCat {
    feeCategories {
      id
      name
    }
  }
`;

// fee strct get
export const GET_FEESTRUCTURE = gql`
  query GetFeeStructure(
    $fsSession: String!
    $fsCategory: String!
    $feeType: String!
    $course: String
    $feeItem: String
  ) {
    feeStructure(
      fsSession: $fsSession
      fsCategory: $fsCategory
      feeType: $feeType
      course: $course
      feeItem: $feeItem
    ) {
      id
      fsSession
      fsCategory
      feeType
      course
      year
      feeItem
      feeAmount
      label
      isOptional
      fromDate
      dueDate
    }
  }
`;
export const ADD_FEESTRUCTURE = gql`
  mutation AddFeeStructure($fs: [FeeStructureInput!]!) {
    addFeeStructure(fs: $fs) {
      id
      fsSession
      fsCategory
      feeType
      course
      year
      feeItem
      feeAmount
      label
      isOptional
      fromDate
      dueDate
    }
  }
`;
