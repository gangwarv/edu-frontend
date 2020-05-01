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
      confirm("Are you sure?") &&
        this.$mutate({
          mutation: REMOVE_DEPARTMENT,
          variables: { id },
          update: GET_ALL_DEPARTMENTS,
          message: "d"
        });
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