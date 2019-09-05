<template>
  <div class="columns is-multiline box">
    <div class="column is-full">
      <h2 class="subtitle">Course Details</h2>
    </div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Code {{ $apollo.queries.courses.loading }}</th>
          <th>Name</th>
          <th>Department</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tr v-if="$apollo.queries.courses.loading">
          <td colspan="5">Loading...</td>
      </tr>
      <tbody v-else>
        <tr v-for="c in courses" :key="c._id">
          <td>{{c._id}}</td>
          <td>{{c.name}}</td>
          <td>{{c.departmentName}}</td>
          <td>{{c.isActive}}</td>
          <td><a href="#">edit</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { GET_COURSES } from '@/graphql/courses'
export default {
  name: "CourseList",
  data: function() {
    return {
      courses:[]
    };
  },
  apollo:{
      courses: GET_COURSES
  }
};
</script>