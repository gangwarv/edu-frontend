<template>
  <div class="box">
    <PageHeader header-text="User List" to="/user" link-text="Add New" />
    <Alert v-model="alertShow" :title="alertTitle" :message="alertMessage" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!users" />
        <c-table :cols="columns" :data="users" :buttons="['edit','remove']" @edit="edit" v-else />
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
      alertShow: false,
      alertTitle: "",
      alertMessage: "",
      users:null,
      columns: [["UserName", "userName"],["Role", "roleName"],["Privileges","privileges"]]
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