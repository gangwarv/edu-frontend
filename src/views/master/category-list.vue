<template>
  <div class="box">
    <PageHeader header-text="Categories List" to="/category" link-text="Add New" />
    <Alert v-model="alertShow" :title="alertTitle" :message="alertMessage" />
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
import { GET_CATEGORIES, REMOVE_CATEGORY } from "@/graphql/categories";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "CategoryList",
  data: function() {
    return {
      columns: [["Id", "id"],["Name", "name"]],// ["Active", "isActive", "boolean"]],
      error: null,
      alertShow: false,
      alertTitle: "",
      alertMessage: ""
    };
  },
  methods: {
    remove({ id }) {
      if (confirm("Are you sure?")) {
        observeHttp.call(
          this,
          this.$apollo.mutate({
            mutation: REMOVE_CATEGORY,
            variables: {
              id
            },
            // update: (store, { data: { deleteAcDept } }) => {
            //   const data = store.readQuery({ query: GET_AC_DEPTS });
            //   data.acDepts = data.acDepts.filter(x => x.id !== deleteAcDept.id);
            //   store.writeQuery({ query: GET_AC_DEPTS, data });
            // }
          }),
        );
      }
    },
    edit({ id }) {
      console.log("edited", id);
      this.$router.push({ path: "category", query: { id } });
    }
  },
  apollo: {
    categories: GET_CATEGORIES
  }
};
</script>