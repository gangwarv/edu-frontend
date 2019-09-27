<template>
<div>
  <h1>Courses</h1>
  <p class="is-family-sans-serif">
    This is is-family-sans-serif
  </p>
  <p class="is-family-monospace">
    This is is-family-monospace
  </p>
  <p class="is-family-primary">
    This is is-family-primary
  </p>
  <p class="is-family-secondary">
    This is is-family-secondary
  </p>
  <!-- {{ JSON.stringify(courses) }} -->
</div>
</template>

<script>
import { GET_COURSES } from '@/graphql/course'
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