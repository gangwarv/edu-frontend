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

export default {
  name: "CategoryList",
  data: function() {
    return {
      columns: [
        ["Id", "id"],
        ["Name", "name"],
        ["Active", "isActive", "boolean"]
      ],
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