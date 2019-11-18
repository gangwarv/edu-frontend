<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Department Details" to="/acdepts" link-text="Department List" />
      <Loader v-if="$apollo.queries.acDept.loading" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <c-input v-model="acDept.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="acDept.isActive" id="acdept_active" label="Active" indeterminate />
        </div>
        <div class="column is-3">
          <!-- <ValidationProvider name="Date" rules="required" v-slot="{ errors }">
            <c-multiselect v-model="acDept.date" :options="['Apple', 'Ant', 'Ball', 'Bowl']" :errors="errors" label="Date" />
          </ValidationProvider> -->
        </div>
        <BtnGroup :loading="loading" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  GET_AC_DEPT_BY_ID,
  UPSERT_AC_DEPT
} from "@/graphql/ac-dept";
import observeHttp from "@/helpers/http-alert-observer";
import resetObject from "@/helpers/reset-object";

export default {
  name: "AcDept",
  data: function() {
    return {
      acDept: {
        name: "",
        isActive: true
      },
      loading: false
    };
  },
  methods: {
    onSubmit: function() {
      observeHttp.call(
        this,
        this.$apollo.mutate({
          mutation: UPSERT_AC_DEPT,
          variables: {
            ...this.acDept
          },
          // update: (store, { data: { addAcDept } }) => {
          //   const data = store.readQuery({ query: GET_AC_DEPTS });
          //   data.acDepts = data.acDepts.filter(x => x.id !== addAcDept.id);
          //   if (!data.acDepts.some(x => x.id === addAcDept.id)) {
          //     data.acDepts.push(addAcDept);
          //   }
          //   store.writeQuery({ query: GET_AC_DEPTS, data });
          // }
        })
      );
    },
    reset: function() {
      if (this.$route.query.id) {
        return this.$router.push("/acdepts");
      }
      resetObject(this.acDept);
      this.$refs.observer.reset();
    }
  },
  apollo: {
    acDept: {
      query: GET_AC_DEPT_BY_ID,
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