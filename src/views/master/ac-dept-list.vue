<template>
  <div class="box">
    <PageHeader header-text="Department List" to="/acdept" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <c-table
          :loading="$apollo.queries.acDepts.loading"
          :cols="columns"
          :data="acDepts"
          :buttons="['edit','remove']"
          @remove="remove"
          @edit="edit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL_AC_DEPTS, REMOVE_AC_DEPT } from "@/graphql/ac-dept";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "AcDeptList",
  data: function() {
    return {
      columns: [["Name", "name"], ["Active", "isActive", "boolean"]],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      if (confirm("Are you sure?")) {
        observeHttp.call(
          this,
          this.$apollo.mutate({
            mutation: REMOVE_AC_DEPT,
            variables: {
              id
            },
            update: (store, { data: { deleteAcDept } }) => {
              const data = store.readQuery({ query: GET_ALL_AC_DEPTS });
              data.acDepts = data.acDepts.filter(x => x.id !== deleteAcDept.id);
              store.writeQuery({ query: GET_ALL_AC_DEPTS, data });
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
    acDepts: GET_ALL_AC_DEPTS
  }
};
</script>