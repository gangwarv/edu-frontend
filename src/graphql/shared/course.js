import gql from "graphql-tag";

export const GET_COURSES = gql`
  query GetActiveCourses {
    courses(isActive: true) {
      id
      code
      type
      name
      departmentName
    }
  }
`;
export const GET_ALL_COURSES = gql`
  query GetAllCourses {
    courses {
      id
      code
      type
      name
      type
      isActive
      admissionOpen
      admissionLastDate
      duration
      departmentName
      department
      duration
    }
  }
`;
export const GET_COURSE_BY_ID = gql`
  query GetCourse($id: String!) {
    course(id: $id) {
      id
      code
      type
      name
      type
      isActive
      duration
      departmentName
      department
      duration
    }
  }
`;
export const REMOVE_COURSE = gql`
  mutation RemoveCourse($id: String!) {
    deleteCourse(id: $id) {
      id
      code
      name
    }
  }
`;
export const UPSERT_COURSE = gql`
  mutation AddCourse(
    $id: String
    $name: String!
    $code: String!
    $type: String!
    $department: String!
    $duration: String!
    $isActive: Boolean
  ) {
    addCourse(
      course: {
        id: $id
        name: $name
        code: $code
        type: $type
        department: $department
        duration: $duration
        isActive: $isActive
      }
    ) {
      id
      code
      type
      name
      type
      isActive
      duration
      departmentName
      department
      duration
    }
  }
`;

export const MODIFY_COURSES = gql`
  mutation ModifyCourses($ids: [String!]!, $command: String!, $data: String) {
    modifyCourses(ids: $ids, command: $command, data: $data) {
      id
      isActive
      admissionOpen
      admissionLastDate
    }
  }
`;
