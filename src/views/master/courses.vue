<template>
  <div class="box">
    <PageHeader header-text="Course List" to="/course" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!courses && !error" />
        <c-table :cols="columns" :data="courses" :buttons="['edit']" @remove="remove" @edit="edit" v-else />
        <table class="table is-hidden is-fullwidth is-bordered is-hoverable is-striped">
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
            <tr v-for="c in courses" :key="c.id">
              <td>{{c.code}}</td>
              <td>{{c.name}}</td>
              <td>{{c.departmentName}}</td>
              <td>{{c.isActive | string }}</td>
              <td>
                <router-link :to="{ path: '/course', query: { id: c.id} }">edit</router-link>
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
  data: function() {
    return {
      courses: [],
      columns: [
        ["Code", "code"],
        ["Name", "name"],
        ["Department", "departmentName"],
        ["Active", "isActive"]
      ],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      console.log("removed", id);
      // this.$router.push({ path: 'course', query: { id } });
    },
    edit({ id }) {
      console.log("edited", id);
      this.$router.push({ path: "course", query: { id } });
    }
  },
  apollo: {
    courses: {
      query: GET_COURSES,
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  }
};
</script>