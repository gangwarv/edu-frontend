<template>
  <div class="box">
    <PageHeader header-text="Department List" to="/acdept" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <c-table
          :loading="$apollo.queries.departments.loading"
          :cols="columns"
          :data="departments"
          :buttons="['edit','remove']"
          @remove="remove"
          @edit="edit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL_DEPARTMENTS, REMOVE_DEPARTMENT } from "@/graphql/department";

export default {
  name: "AcDeptList",
  data: function() {
    return {
      columns: [
        ["Name", "name"],
        ["Active", "isActive", "boolean"]
      ],
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
            }
            // update: (store, { data: { addAcDept } }) => {
            //   const data = store.readQuery({ query: GET_AC_DEPTS });
            //   data.acDepts = data.acDepts.filter(x => x.id !== addAcDept.id);
            //   if (!data.acDepts.some(x => x.id === addAcDept.id)) {
            //     data.acDepts.push(addAcDept);
            //   }
            //   store.writeQuery({ query: GET_AC_DEPTS, data });
            // }
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