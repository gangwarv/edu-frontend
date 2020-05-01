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
import { GET_ALL_FEEITEMS, DELETE_FEEITEM } from "@/graphql/fee-item";

export default {
  name: "FeeItemList",
  data: function() {
    return {
      columns: ["id", "name", "typeName", "isActive"],
      error: null
    };
  },
  methods: {
    edit({ id }) {
      this.$router.push({ path: "feeitem", query: { id } });
    },
    remove({ id }) {
      if (confirm("Are you sure?"))
        this.$observe(
          this.$apollo.mutate({
            mutation: DELETE_FEEITEM,
            variables: { id },
            update: this.customUpdate(GET_ALL_FEEITEMS)
          }),
          "D"
        );
    },
    customUpdate(query) {
      return function(store, { data }) {
        console.log("imple");
        const deletedObjKey = Object.keys(data)[0];
        console.log('deletedobj', data)
        const id = data[deletedObjKey].id;
        data = store.readQuery({ query });
        const collectionArrayKey = Object.keys(data);
        console.log('collection', data)
        data[collectionArrayKey] = data[collectionArrayKey].filter(
          x => x.id !== id
        );
        store.writeQuery({ query, data });
      };
    }
  },
  apollo: {
    feeItems: GET_ALL_FEEITEMS
  }
};
</script>

