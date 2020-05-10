import gql from "graphql-tag";

export const GET_COURSES_FEESTRUCTURE = gql`
  query GetList($fsSession: String!, $fsCategory: String!) {
    feeStructures(fsSession: $fsSession, fsCategory: $fsCategory) {
      id
      fsSession
      course
      courseName
      fsCategory
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
  ) {
    feeStructure(
      fsSession: $fsSession
      fsCategory: $fsCategory
      feeType: $feeType
      course: $course
    ) {
      id
      fsSession
      course
      year
      fsCategory
      feeItem
      feeAmount
      label
      isOptional
    }
  }
`;
export const ADD_FEESTRUCTURE = gql`
  mutation AddFeeStructure($fs:String!) {
    addFeeStructure(
      fs:$fs
    ) {
      id
      fsSession
      course
      year
      fsCategory
      feeItem
      feeAmount
      label
      isOptional
    }
  }
`;
