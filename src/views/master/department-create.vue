<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Department Details" to="/acdepts" link-text="Department List" />
      <Loader v-if="$apollo.queries.department.loading" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <c-input v-model="department.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="department.isActive" id="acdept_active" label="Active" indeterminate />
        </div>
        <div class="column is-3">
        </div>
        <BtnGroup :loading="loading" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { GET_DEPARTMENT_BY_ID, UPSERT_DEPARTMENT } from "@/graphql/department";

export default {
  name: "AcDept",
  data: function() {
    return {
      department: {
        name: "",
        isActive: true
      },
      loading: false
    };
  },
  methods: {
    onSubmit: function() {
      this.$observe(
        this.$apollo.mutate({
          mutation: UPSERT_DEPARTMENT,
          variables: {
            ...this.department
          }
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
      this.$clear(this.department);
      this.$refs.observer.reset();
    }
  },
  apollo: {
    department: {
      query: GET_DEPARTMENT_BY_ID,
      manual: true,
      result({ data, loading }) {
        if (!loading) this.department = { ...data.department };
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