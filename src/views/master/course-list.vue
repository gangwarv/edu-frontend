<template>
  <div class="box">
    <PageHeader header-text="Course List" to="/course" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!courses" />
        <c-table
          :loading="$apollo.queries.courses.loading"
          :cols="columns"
          :data="courses"
          :buttons="['edit']"
          @remove="remove"
          @edit="edit"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL_COURSES } from "@/graphql/course";
export default {
  name: "CourseList",
  data: function() {
    return {
      courses: [],
      columns: [
        ["Code", "code"],
        ["Name", "name"],
        ["Department", "departmentName"],
        ["Active", "isActive", "boolean"]
      ],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      console.log("removed", id);
    },
    edit({ id }) {
      console.log("edited", id);
      this.$router.push({ path: "course", query: { id } });
    }
  },
  apollo: {
    courses: GET_ALL_COURSES
  }
};
</script>