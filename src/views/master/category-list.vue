<template>
  <div class="box">
    <PageHeader header-text="Categories List" to="/category" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <c-table
          :loading="$apollo.queries.categories.loading"
          :cols="columns"
          :data="categories"
          :buttons="['edit','remove']"
          @remove="remove"
          @edit="edit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_CATEGORIES, REMOVE_CATEGORY } from "@/graphql/category";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "CategoryList",
  data: function() {
    return {
      columns: [["Id", "id"],["Name", "name"],["Active", "isActive", "boolean"]],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      confirm("Are you sure?") && observeHttp.call(
          this,
          this.$apollo.mutate({
            mutation: REMOVE_CATEGORY,
            variables: {
              id
            },
            update: (store, { data: { deleteCategory } }) => {
              const data = store.readQuery({ query: GET_CATEGORIES });
              data.categories = data.categories.filter(x => x.id !== deleteCategory.id);
              store.writeQuery({ query: GET_CATEGORIES, data });
            }
          }),
        );
    },
    edit({ id }) {
      console.log("edited", id);
      this.$router.push({ path: "category", query: { id } });
    }
  },
  apollo: {
    categories: {
      query: GET_CATEGORIES,
      fetchPolicy: 'network-only'
    }
  }
};
</script>