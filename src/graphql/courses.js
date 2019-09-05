import gql from 'graphql-tag'

export const GET_COURSES = gql`
    query GetCourses{
        courses{
            _id,
            name,
            departmentName
        }
    }
`