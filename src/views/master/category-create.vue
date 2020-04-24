<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Cast Category" to="/categories" link-text="Category List" />
      <Loader v-if="$apollo.queries.loading" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <c-input v-model="category.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="category.isActive" id="cat_active" label="Active" />
        </div>
        <div class="column is-6"></div>
        <BtnGroup :loading="loading" @reset="reset" />
      <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { GET_CATEGORY_BY_ID, UPSERT_CATEGORY } from "@/graphql/category";

export default {
  name: "Category",
  data: function() {
    return {
      category: {
        name: "",
        isActive: true
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.$observe(
        this.$apollo.mutate({
          mutation: UPSERT_CATEGORY,
          variables: {
            ...this.category
          }
        })
      ).then(
        ({
          data: {
            addCategory: { id }
          }
        }) => {
          this.category.id = id;
        }
      );
    },
    reset: function() {
      if (this.$route.query.id) {
        return this.$router.push("/categories");
      }
      this.$clear(this.category);
      this.$refs.observer.reset();
    }
  },
  apollo: {
    category: {
      query: GET_CATEGORY_BY_ID,
      manual: true,
      result({ data, loading }) {
        if (!loading) this.category = { ...data.category };
      },
      variables() {
        return {
          id: this.$route.query.id
        };
      },
      skip() {
        return !this.$route.query.id;
      }
    }
  }
};
</script>