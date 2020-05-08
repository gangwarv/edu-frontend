import gql from "graphql-tag";

export const GET_FEEITEMS = gql`
  query GetFeeItems {
    feeItems(isActive: true) {
      id
      name
    }
  }
`;

export const GET_ALL_FEEITEMS = gql`
  query GetFeeItems {
    feeItems {
      id
      name
      isActive
      group
      groupName
    }
  }
`;

export const GET_FEEITEM_BY_ID = gql`
  query GetFeeItem($id: String!) {
    feeItem(id: $id) {
      id
      name
      isActive
      group
      groupName
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
    addFeeItem(id: $id, name: $name, isActive: $isActive, group: $type) {
      id
      name
      isActive
      group
      groupName
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

export const GET_FEEGROUPS = gql`
  query GetFeeGroups {
    feeGroups {
      id
      name
    }
  }
`;
export const DELETE_FEEGROUP = gql`
  mutation DeleteFeeGroup($id: String!) {
    deleteFeeGroup(id: $id) {
      id
      name
    }
  }
`;
export const UPSERT_FEEGROUP = gql`
  mutation AddFeeGroup($id: String, $name: String!) {
    addFeeGroup(id: $id, name: $name) {
      id
      name
    }
  }
`;
