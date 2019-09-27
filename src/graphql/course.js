import gql from 'graphql-tag'

export const GET_COURSES = gql`
    query GetCourses{
        courses{
            id,
            code,
<<<<<<< HEAD
=======
            type,
>>>>>>> origin/HEAD
            name,
            type,
            isActive,
            departmentName,
<<<<<<< HEAD
            department,
=======
>>>>>>> origin/HEAD
            duration
        }
    }
`
export const GET_COURSE_BY_ID = gql`
    query GetCourse($id: String!){
        course(id: $id){
            id,
            code,
<<<<<<< HEAD
=======
            type,
>>>>>>> origin/HEAD
            name,
            type,
            isActive,
            isLateral,
            duration,
            departmentName,
            department,
            duration
        }
    }
`
export const UPSERT_COURSE = gql`
<<<<<<< HEAD
    mutation AddCourse($id:String, $name:String!, $type:String!, $code:String!, $department:String!, $duration:String!, $isActive:Boolean){
        addCourse(course:{id:$id,name:$name, code:$code, type:$type, department:$department, duration:$duration, isActive:$isActive}){
            id,
            code,
            name,
            type,
            isActive,
            departmentName,
            department,
=======
    mutation AddCourse($id:String, $name:String!, $code: String!, $type:String!, $department:String!, $duration:String!, $isActive:Boolean){
        addCourse(course: {id:$id,name:$name,code:$code,type:$type,department:$department,duration:$duration,isActive:$isActive}){
            id,
            code,
            type,
            name,
            isActive,
            departmentName,
>>>>>>> origin/HEAD
            duration
        }
    }
`