<template>
  <div class="box">
    <PageHeader header-text="Fee Structure Create" to="/feestructures" link-text="Fee Structure" />
    <c-table
      :loading="$apollo.queries.feeStructure.loading"
      :columns="columns"
      :data="feeStructure"
      :buttons="['edit', 'remove']"
    />
  </div>
</template>

<script>
import { GET_ALL_FEEITEMS } from "@/graphql/fee";
import { GET_FEESTRUCTURE } from "@/graphql/fee";

export default {
  name: "FeeStructCreate",
  data: function() {
    return {
      columns: ["id", "course", "feeItem", "year"],
      error: null
    };
  },
  methods: {},
  apollo: {
    feeStructure: {
      query: GET_FEESTRUCTURE,
      variables() {
        return { ...this.$route.query };
      }
    },
    feeItems: GET_ALL_FEEITEMS
  }
};
</script>

