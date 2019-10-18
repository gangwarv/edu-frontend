<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Configure Role" to="/users" link-text="All Users" />
      <Alert v-model="alertShow" :title="alertTitle" :message="alertMessage" />
      <Loader v-if="($route.query.id && !user.id)" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="firstName" rules="required" v-slot="{ errors }">
            <c-input v-model="user.firstName" label="First Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="lastName" rules="required" v-slot="{ errors }">
            <c-input v-model="user.lastName" label="Last Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="role" rules="required" v-slot="{ errors }">
            <c-select
              v-model="user.role"
              label="Role"
              :options="[roles, 'id', 'name']"
              :errors="errors"
            />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="user.isActive" id="user_active" label="Active" indeterminate />
        </div>
        <div class="column is-3">
          <ValidationProvider name="username" rules="required" v-slot="{ errors }">
            <c-input v-model="user.userName" label="User Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="password" :rules="!user.id?'required|min:3|max:15':'min:3|max:15'" v-slot="{ errors }">
            <c-input v-model="user.password" label="Password" :required="!user.id" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="userType" rules="required" v-slot="{ errors }">
            <c-select
              v-model="user.userType"
              label="User Type"
              :options="[['Individual', 'Employee', 'Student']]"
              :errors="errors"
            />
          </ValidationProvider>
        </div>
         <div class="column is-3">
            <c-input v-model="user.userRef" label="UserRef" :required="false" type="text" />
        </div>
        <div class="column is-3">
          <ValidationProvider name="mobile" rules="digits:10" v-slot="{ errors }">
            <c-input v-model="user.mobile" label="Mobile" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="email" rules="email" v-slot="{ errors }">
            <c-input v-model="user.email" label="Email" :required="false" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
      </div>
      <div class="columns">
        <BtnGroup :loading="loading" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { GET_ROLES } from "@/graphql/role";
import { GET_USERS, GET_USER_BY_ID, UPSERT_USER } from "@/graphql/user";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "UserCreate",
  methods: {
    onSubmit() {
      observeHttp.call(
        this,
        this.$apollo.mutate({
          mutation: UPSERT_USER,
          variables: this.user
        })
      );
    },
    reset() {
      if (this.$route.query.id) {
        return this.$router.back();
      }

      this.user = {
         firstName: "",
        lastName: "",
        userName: "",
        password: "",
        userType: "",
        userRef: "",
        mobile: "",
        email: "",
        role: "",
        isActive: true
      };
      this.$refs.observer.reset();
    }
  },
  computed: {
    modules() {
      return this.appmodules
        .map(x => x.module)
        .filter((m, i, ar) => ar.indexOf(m) === i)
        .map(c => ({ value: c }));
    },
    privileges() {
      return this.appmodules.map(x => x.name);
    }
  },
  data: function() {
    return {
      loading: false,
      alertShow: false,
      alertTitle: "",
      alertMessage: "",
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        userType: "",
        userRef: "",
        mobile: "",
        email: "",
        role: "",
        isActive: true
      }
    };
  },
  apollo: {
    roles: GET_ROLES,
    user: {
      query: GET_USER_BY_ID,
      variables() {
        return { id: this.$route.query.id };
      },
      skip() {
        return !this.$route.query.id;
      }
    }
  }
};
</script>