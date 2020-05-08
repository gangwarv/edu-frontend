<template>
  <div class="box">
    <PageHeader header-text="Fee Group List" to="/feegroup" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.feeGroups.loading"
      :columns="columns"
      :data="feeGroups"
      :buttons="['edit', 'remove']"
      @edit="edit"
      @remove="remove"
    />
  </div>
</template>

<script>
import { GET_FEEGROUPS, DELETE_FEEGROUP } from "@/graphql/fee";

export default {
  name: "FeeGroupList",
  data: function() {
    return {
      columns: ["id", "name"],
      error: null
    };
  },
  methods: {
    edit({ id, name }) {
      this.$router.push({ path: "feegroup", query: { id, name } });
    },
    remove({ id }) {
      if (confirm("Are you sure?"))
        this.$mutate({
          mutation: DELETE_FEEGROUP,
          variables: { id },
          updateQuery: GET_FEEGROUPS,
          message: "d"
        });
    }
  },
  apollo: {
    feeGroups: GET_FEEGROUPS
  }
};
</script>

