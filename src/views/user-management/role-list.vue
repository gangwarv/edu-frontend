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
      if (confirm("Are you sure?"))
        this.$observe(
          this.$apollo.mutate({
            mutation: DELETE_ROLE,
            variables: { id },
            update: (store, { data: { deleteRole } }) => {
              const data = store.readQuery({ query: GET_ROLES });
              data.roles = data.roles.filter(x => x.id !== deleteRole.id);
              store.writeQuery({ query: GET_ROLES, data });
            }
          }),
          "D"
        );
    }
  },
  apollo: {
    roles: GET_ROLES
  }
};
</script>