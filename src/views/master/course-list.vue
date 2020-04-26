<template>
  <div class="box">
    <PageHeader header-text="Course List" to="/course" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!courses" />
        <c-table
          :loading="$apollo.queries.courses.loading"
          :columns="columns"
          :data="courses"
          :buttons="['edit','remove']"
          @remove="remove"
          @edit="edit"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL_COURSES, REMOVE_COURSE } from "@/graphql/course";

export default {
  name: "CourseList",
  data() {
    return {
      columns: ["code", "name", "departmentName", "isActive"],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      if (confirm("Are you sure?")) {
        this.$observe(this.$apollo.mutate({
            mutation: REMOVE_COURSE,
            variables: {
              id
            },
            //update: (store, { data }) => {
              // const data = store.readQuery({ query: GET_ALL_COURSES });
              // data.courses = data.courses.filter(x => x.id !== deleteCourse.id);
              // store.writeQuery({ query: GET_ALL_COURSES, data });
            //}
          }),
          "D"
        );
      }
    },
    edit({ id }) {
      this.$router.push({ path: "course", query: { id } });
    }
  },
  apollo: {
    courses: GET_ALL_COURSES
  }
};
</script>