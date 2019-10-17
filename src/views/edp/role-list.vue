<template>
  <div class="box">
    <PageHeader header-text="Role List" to="/role" link-text="Add New Role" />
    <Alert v-model="alertShow" :title="alertTitle" :message="alertMessage" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <c-table
          :loading="$apollo.queries.roles.loading"
          :cols="columns"
          :data="roles"
          :buttons="['edit','remove']"
          @remove="remove"
          @edit="edit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ROLES, DELETE_ROLE } from "@/graphql/role";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "RoleList",
  data() {
    return {
      error: null,
      alertShow: false,
      alertTitle: "",
      alertMessage: "",
      columns: [["Name", "name"], ["Privileges", "privileges"]]
    };
  },
  methods: {
    edit({ id }) {
      this.$router.push({ path: "role", query: { id } });
    },
    remove({ id }) {
      if (confirm("Are you sure?"))
        observeHttp.call(
          this,
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