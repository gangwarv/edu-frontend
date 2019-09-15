<template>
  <div class="box">
    <PageHeader header-text="Course List" to="/course" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!courses" />
        <table class="table  is-fullwidth is-bordered is-hoverable is-striped" v-else>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in courses" :key="c._id">
              <td>{{c._id}}</td>
              <td>{{c.name}}</td>
              <td>{{c.departmentName}}</td>
              <td>{{c.isActive | string }}</td>
              <td>
                <router-link :to="{ path: '/course', query: { id: c._id} }">edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_COURSES } from "@/graphql/course";
export default {
  name: "CourseList",
  // data: function() {
  //   return {
  //     courses:[]
  //   };
  // },
  apollo: {
    courses: GET_COURSES
  }
};
</script>