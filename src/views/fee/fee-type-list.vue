<template>
  <div class="box">
    <PageHeader header-text="Fee Type List" to="/feetype" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.feeTypes.loading"
      :columns="columns"
      :data="feeTypes"
      :buttons="['edit', 'remove']"
      @edit="edit"
      @remove="remove"
    />
  </div>
</template>

<script>
import { GET_FEETYPES, DELETE_FEEITEM } from "@/graphql/fee-item";

export default {
  name: "FeeItemList",
  data: function() {
    return {
      columns: ["id", "name"],
      error: null
    };
  },
  methods: {
    edit({ id, name }) {
      this.$router.push({ path: "feetype", query: { id, name } });
    },
    remove({ id }) {
      if (confirm("Are you sure?"))
        this.$mutate({
          mutation: DELETE_FEEITEM,
          variables: { id },
          update: GET_FEETYPES,
          message: "d"
        });
    }
  },
  apollo: {
    feeTypes: GET_FEETYPES
  }
};
</script>

