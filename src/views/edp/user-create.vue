<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Configure Role" to="/roles" link-text="View All Roles" />
      <Alert v-model="alertShow" :title="alertTitle" :message="alertMessage" />
      <Loader v-if="false && ($route.query.id && !role.id)" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <c-input v-model="role.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="role" rules="required" v-slot="{ errors }">
            <c-select v-model="user.name" label="Role" :options="roles" :errors="errors" />
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
import { GET_ROLES, UPSERT_USER } from "@/graphql/user";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "UserCreate",
  methods: {
    onSubmit() {
      observeHttp.call(
        this,
        this.$apollo.mutate({
          mutation: UPSERT_ROLE,
          variables: {
            ...this.role,
            privileges: this.role.privileges.toString()
          },
          update: (store, { data: { addRole } }) => {
            const data = store.readQuery({ query: GET_ROLES });
            data.roles = data.roles.filter(x => x.id !== addRole.id);
            if (!data.roles.some(x => x.id === addRole.id)) {
              data.roles.push(addRole);
            }
            store.writeQuery({ query: GET_ROLES, data });
          }
        })
      );
    },
    reset() {
      if (this.$route.query.id) {
        return this.$router.back();
      }

      this.user = {
        userName: "",
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
        userName: "",
        role: "",
        isActive: true
      },
      selectedModule: "",
      appmodules: [
        {
          module: "EDP",
          name: "user-view"
        },
        {
          module: "EDP",
          name: "user-create"
        },
        {
          module: "EDP",
          name: "role-view"
        },
        {
          module: "EDP",
          name: "role-create"
        },
        {
          module: "Academic",
          name: "course-create"
        },
        {
          module: "Academic",
          name: "attendence-view"
        },
        {
          module: "Academic",
          name: "attendence-create"
        }
      ]
    };
  },
  apollo: {
    roles: GET_ROLES
  }
};
</script>