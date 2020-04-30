<template>
  <div class="box">
    <PageHeader header-text="Course List" to="/course" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.courses.loading"
      :columns="columns"
      :data="courses"
      :buttons="['edit','remove']"
      :actions="['Activate', 'Block', 'Open-Admission', 'Close-Admission']"
      @remove="remove"
      @edit="edit"
      @change="modify"
    />
  </div>
</template>

<script>
import {
  GET_ALL_COURSES,
  REMOVE_COURSE,
  MODIFY_COURSES
} from "@/graphql/course";

export default {
  name: "CourseList",
  data() {
    return {
      columns: [
        "code",
        "name",
        "departmentName",
        "isActive",
        "admissionOpen",
        "admissionLastDate"
      ],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      if (confirm("Are you sure?")) {
        this.$observe(
          this.$apollo.mutate({
            mutation: REMOVE_COURSE,
            variables: {
              id
            },
            update: (store, { data: { deleteCourse } }) => {
              const data = store.readQuery({ query: GET_ALL_COURSES });
              data.courses = data.courses.filter(x => x.id !== deleteCourse.id);
              store.writeQuery({ query: GET_ALL_COURSES, data });
            }
          }),
          "D"
        );
      }
    },
    edit({ id }) {
      this.$router.push({ path: "course", query: { id } });
    },
    modify(e) {
      if (e.type === "open-admission") {
        this.$buefy.dialog.prompt({
          message: `Last Date?`,
          inputAttrs: {
            type: "datetime-local",
            min: new Date().toISOString()
          },
          trapFocus: true,
          onConfirm: value =>
            this.$observe(
              this.$apollo.mutate({
                mutation: MODIFY_COURSES,
                variables: {
                  ids: e.data.map(x => x.id),
                  command: e.type,
                  data: new Date(value).toISOString()
                }
              }),
              "Admission started."
            )
        });
        return;
      }

      this.$observe(
        this.$apollo.mutate({
          mutation: MODIFY_COURSES,
          variables: {
            ids: e.data.map(x => x.id),
            command: e.type
          }
        }),
        "Course(s) status changed successfully."
      );
    }
  },
  apollo: {
    courses: GET_ALL_COURSES
  }
};
</script>