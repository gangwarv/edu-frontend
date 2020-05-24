import gql from "graphql-tag";

export const GET_COURSES_FEESTRUCTURE = gql`
  query GetList($fsSession: String!, $fsCategory: String!) {
    courseFeeStructure(fsSession: $fsSession, fsCategory: $fsCategory) {
      fsSession
      fsCategory
      id
      code
      courseName
      feeDetails {
        id
        year
        feeItem
        feeItemName
        feeAmount
        label
        dueDate
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
    $year: String
    $feeItem: String
  ) {
    feeStructure(
      fsSession: $fsSession
      fsCategory: $fsCategory
      feeType: $feeType
      course: $course
      year: $year
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
      fromDate
      dueDate
      courseName
      feeItemName
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
      fromDate
      dueDate
    }
  }
`;
