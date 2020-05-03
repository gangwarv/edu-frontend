<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Fee Item" to="/feeitems" link-text="Fee Item List" />
      <Loader v-if="$apollo.queries.loading" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <c-input v-model="obj.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="Fee Type" rules="required" v-slot="{ errors }">
            <c-select
              label="FeeType"
              v-model="obj.type"
              :options="[feeTypes, 'id', 'name']"
              :errors="errors"
            >
            <router-link class="button" to="/feetype">+</router-link>
            </c-select>
          </ValidationProvider>
          <div class="field">

          </div>
        </div>
        <div class="column is-3">
          <c-check v-model="obj.isActive" id="cat_active" label="Active" />
        </div>
        <div class="column is-3"></div>
        <BtnGroup :loading="loading" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  GET_FEEITEM_BY_ID,
  UPSERT_FEEITEM,
  GET_FEETYPES
} from "@/graphql/fee";

export default {
  name: "FeeItemCreate",
  data: function() {
    return {
      obj: {
        id: "",
        name: "",
        isActive: true,
        type: null
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.$mutate({
        mutation: UPSERT_FEEITEM,
        variables: {
          ...this.obj
        }
      });
    },
    reset: function() {
      if (this.$route.query.id) {
        return this.$router.push("/feeitems");
      }
      this.$refs.observer.reset();
      this.$clear(this.obj);
    }
  },
  apollo: {
    feeItem: {
      query: GET_FEEITEM_BY_ID,
      manual: true,
      result({ data, loading }) {
        if (!loading) this.obj = { ...data.feeItem };
      },
      variables() {
        return {
          id: this.$route.query.id
        };
      },
      skip() {
        return !this.$route.query.id;
      }
    },
    feeTypes: GET_FEETYPES
  }
};
</script>