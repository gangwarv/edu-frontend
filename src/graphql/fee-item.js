import gql from "graphql-tag";

export const GET_FEEITEMS = gql`
  query GetFeeItems {
    feeItems(isActive: true) {
      id
      name
      typeName
    }
  }
`;

export const GET_ALL_FEEITEMS = gql`
  query GetFeeItems {
    feeItems {
      id
      name
      isActive
      type
      typeName
    }
  }
`;

export const GET_FEEITEM_BY_ID = gql`
  query GetFeeItem($id: String!) {
    feeItem(id: $id) {
      id
      name
      isActive
      type
      typeName
    }
  }
`;

export const UPSERT_FEEITEM = gql`
  mutation AddFeeItem(
    $id: String
    $name: String!
    $isActive: Boolean!
    $type: String!
  ) {
    addFeeItem(id: $id, name: $name, isActive: $isActive, type: $type) {
      id
      name
      isActive
      type
      typeName
    }
  }
`;
export const DELETE_FEEITEM = gql`
  mutation DeleteFeeItem($id: String!) {
    deleteFeeItem(id: $id) {
      id
    }
  }
`;

/// FeeType

export const GET_FEETYPES = gql`
  query GetFeeTypes {
    feeTypes {
      id
      name
    }
  }
`;
