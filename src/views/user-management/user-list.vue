<template>
  <div class="box">
    <PageHeader header-text="User List" to="/user" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.users.loading"
      :columns="columns"
      :data="users"
      :buttons="['edit','remove']"
      @edit="edit"
    />
  </div>
</template>

<script>
import { GET_USERS } from "@/graphql/user";

export default {
  name: "UserList",
  data() {
    return {
      error: null,
      columns: [
        "id",
        "userName",
        "roleName",
        "firstName",
        "lastName",
        "userType",
        "mobile",
        "updatedAt"
      ]
    };
  },
  methods: {
    edit({ id }) {
      this.$router.push({ path: "user", query: { id } });
    }
  },
  apollo: {
    users: GET_USERS
  }
};
</script>