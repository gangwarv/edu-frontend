<template>
  <div class="box">
    <PageHeader header-text="User List" to="/user" link-text="Add New" />
    <div class="columns is-multiline ">
      <div class="column is-full" style="overflow-x:auto">
        <c-table v-if="users"
          :loading="$apollo.queries.users.loading"
          :columns="columns"
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

export default {
  name: "UserList",
  data() {
    return {
      error: null,
      columns: ["id", "userType", "firstName", "lastName", "userName", "mobile"],
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