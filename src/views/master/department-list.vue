<template>
  <div class="box">
    <PageHeader header-text="Department List" to="/acdept" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.departments.loading"
      :columns="columns"
      :data="departments"
      :buttons="['edit','remove']"
      @remove="remove"
      @edit="edit"
    />
  </div>
</template>

<script>
import { GET_ALL_DEPARTMENTS, REMOVE_DEPARTMENT } from "@/graphql/department";

export default {
  name: "AcDeptList",
  data: function() {
    return {
      columns: ["id", "name", "isActive"],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      if (confirm("Are you sure?")) {
        this.$observe(
          this.$apollo.mutate({
            mutation: REMOVE_DEPARTMENT,
            variables: {
              id
            },
            update: (store, { data: { deleteDepartment } }) => {
              const data = store.readQuery({ query: GET_ALL_DEPARTMENTS });
              data.departments = data.departments.filter(
                x => x.id !== deleteDepartment.id
              );
              store.writeQuery({ query: GET_ALL_DEPARTMENTS, data });
            }
          }),
          "D"
        );
      }
    },
    edit({ id }) {
      this.$router.push({ path: "acdept", query: { id } });
    }
  },
  apollo: {
    departments: GET_ALL_DEPARTMENTS
  }
};
</script>