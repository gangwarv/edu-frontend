<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Fee Group" to="/feegroups" link-text="Fee Groups List" />
      <Loader v-if="false" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <c-input v-model="obj.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-9"></div>
        <BtnGroup :loading="loading" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  UPSERT_FEEGROUP
} from "@/graphql/fee";

export default {
  name: "FeeGroupCreate",
  data: function() {
    return {
      obj: {
       ...this.$route.query
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.$mutate({
        mutation: UPSERT_FEEGROUP,
        variables: {
          ...this.obj
        }
      });
    },
    reset: function() {
      if (this.$route.query.id) {
        return this.$router.push("/feegroups");
      }
      this.$refs.observer.reset();
      this.$clear(this.obj);
    }
  }
};
</script>