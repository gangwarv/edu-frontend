<template>
  <div class="box">
    <PageHeader header-text="Categories List" to="/category" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.categories.loading"
      :columns="columns"
      :data="categories"
      :buttons="['edit','remove']"
      @remove="remove"
      @edit="edit"
    />
  </div>
</template>

<script>
import { GET_CATEGORIES, REMOVE_CATEGORY } from "@/graphql/category";

export default {
  name: "CategoryList",
  data: function() {
    return {
      // columns: [
      //   ["Id", "id"],
      //   ["Name", "name"],
      //   ["Active", "isActive", "boolean"]
      // ],
      columns: ["id", "name", "isActive"],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      confirm("Are you sure?") &&
        this.$observe(
          this.$apollo.mutate({
            mutation: REMOVE_CATEGORY,
            variables: {
              id
            },
            update: (store, { data: { deleteCategory } }) => {
              const data = store.readQuery({ query: GET_CATEGORIES });
              data.categories = data.categories.filter(
                x => x.id !== deleteCategory.id
              );
              store.writeQuery({ query: GET_CATEGORIES, data });
            }
          })
        );
    },
    edit({ id }) {
      this.$router.push({ path: "category", query: { id } });
    }
  },
  apollo: {
    categories: {
      query: GET_CATEGORIES
    }
  }
};
</script>