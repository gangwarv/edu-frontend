<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Department Details" to="/acdepts" link-text="Department List" />
      <Alert v-model="show" :title="status" :message="message" />
      <Loader v-if="$route.query.id && !acDept.id" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <c-input v-model="acDept.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="acDept.isActive" id="acdept_active" label="Active" indeterminate />
        </div>
        <div class="column is-3"></div>
        <BtnGroup :loading="status==='loading'" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { GET_AC_DEPT_BY_ID, UPSERT_AC_DEPT } from "@/graphql/ac-dept";
export default {
  name: "AcDept",
  data: function() {
    return {
      acDept: {
        name: "",
        isActive: true
      },
      show: false,
      status: "",
      message: ""
    };
  },
  methods: {
    onSubmit: function() {
      this.status = "loading";
      this.$apollo
        .mutate({
          mutation: UPSERT_AC_DEPT,
          variables: {
            ...this.acDept
          }
        })
        .then(res => {
          this.show = true;
          this.status = "Success";
          this.message = "Data saved successfully!";
        })
        .catch(err => {
          this.show = true;
          this.status = "Failed";
          this.message = err.networkError.result.errors[0].message;
        });
    },
    reset: function() {
      if (this.$route.query.id) {
        return this.$router.push("/acdepts");
      }
      this.acDept= {
        name: "",
        isActive: true
      };
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