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
  query GetFs($fsSession: String!, $fsCategory: String!, $course: String!) {
    feeStructure(
      fsSession: $fsSession
      fsCategory: $fsCategory
      course: $course
    ) {
      id
      fsSession
      course
      year
      fsCategory
      feeItem
      feeAmount
      oddEven
      isOptional
    }
  }
`;
