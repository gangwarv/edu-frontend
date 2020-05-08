<template>
  <div class="box">
    <PageHeader header-text="Fee Item List" to="/feeitem" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.feeItems.loading"
      :columns="columns"
      :data="feeItems"
      :buttons="['edit', 'remove']"
      @edit="edit"
      @remove="remove"
    />
  </div>
</template>

<script>
import { GET_ALL_FEEITEMS, DELETE_FEEITEM } from "@/graphql/fee";

export default {
  name: "FeeItemList",
  data: function() {
    return {
      columns: ["id", "name", "groupName", "isActive"],
      error: null
    };
  },
  methods: {
    edit({ id }) {
      this.$router.push({ path: "feeitem", query: { id } });
    },
    remove({ id }) {
      if (confirm("Are you sure?"))
        this.$mutate({
          mutation: DELETE_FEEITEM,
          variables: { id },
          updateQuery: GET_ALL_FEEITEMS,
          message: "d"
        });
    }
  },
  apollo: {
    feeItems: GET_ALL_FEEITEMS
  }
};
</script>

