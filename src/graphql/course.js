import gql from 'graphql-tag'

export const GET_COURSES = gql`
    query GetCourses{
        courses{
            _id,
            name,
            isActive,
            departmentName,
            department
        }
    }
`
export const GET_COURSE_BY_ID = gql`
    query GetCourse($id: String!){
        course(_id: $id){
            _id,
            name,
            isActive,
            departmentName,
            department
        }
    }
`
// export const GET_COURSES = gql`
//     mutation AddCourse($name:String, $type:String, $isActive:Boolean, $department:String){
//         addCourse(course:$name){
//             _id,
//             name,
//             isActive,
//             departmentName,
//             department
//         }
//     }
// `