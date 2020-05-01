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
        this.$mutate({
          mutation: REMOVE_CATEGORY,
          variables: { id },
          update: GET_CATEGORIES,
          message: "d"
        });
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