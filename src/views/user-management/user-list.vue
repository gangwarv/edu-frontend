<template>
  <div class="box">
    <PageHeader header-text="User List" to="/user" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <c-table
          :loading="$apollo.queries.users.loading"
          :cols="columns"
          :data="users"
          :buttons="['edit','remove']"
          @edit="edit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_USERS } from "@/graphql/user";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "UserList",
  data() {
    return {
      error: null,
      users: null,
      columns: [
        ["User Id", "id"],
        ["User Type", "userType"],
        ["First Name", "firstName"],
        ["Last Name", "lastName"],
        ["UserName", "userName"],
        ["Mobile", "mobile"]
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