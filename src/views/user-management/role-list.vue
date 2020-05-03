<template>
  <div class="box">
    <PageHeader header-text="Role List" to="/role" link-text="Add New Role" />
    <c-table
      :loading="$apollo.queries.roles.loading"
      :columns="columns"
      :data="roles"
      :buttons="['edit','remove']"
      @remove="remove"
      @edit="edit"
    />
  </div>
</template>

<script>
import { GET_ROLES, DELETE_ROLE } from "@/graphql/role";

export default {
  name: "RoleList",
  data() {
    return {
      error: null,
      columns: ["name", "privileges"]
    };
  },
  methods: {
    edit({ id }) {
      this.$router.push({ path: "role", query: { id } });
    },
    remove({ id }) {
      confirm("Are you sure?") &&
        this.$mutate({
          mutation: DELETE_ROLE,
          variables: { id },
          updateQuery: GET_ROLES,
          message: "d"
        });
    }
  },
  apollo: {
    roles: GET_ROLES
  }
};
</script>