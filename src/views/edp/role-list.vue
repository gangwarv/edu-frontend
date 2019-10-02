<template>
  <div class="box">
    <PageHeader header-text="Role List" to="/role" link-text="Add New Role" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!roles && !error" />
        <c-table
          :cols="columns"
          :data="roles"
          :buttons="['edit','remove']"
          @remove="remove"
          @edit="edit"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ROLES } from "@/graphql/role";
export default {
  name: "Roles",
  data() {
    return {
      error: null,
      columns: [["Name", "name"], ["Privileges", "privileges"]]
    };
  },
  methods: {
    edit({ id }) {
      this.$router.push({ path: "role", query: { id } });
    },
    remove() {}
  },
  apollo: {
    roles: GET_ROLES
  }
};
</script>