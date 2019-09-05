<template>
<div>
  <h1>Courses</h1>
  {{ JSON.stringify(courses) }}
</div>
</template>

<script>
import { GET_COURSES } from '@/graphql/courses'
export default {
  name: "StudentRegister",
  apollo: {
    courses: {
      query: GET_COURSES
      // pollInterval: 1000, // ms
    }
  }
};
</script>