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
          <c-select label="Modules" :required="false" :options="modules" />
        </div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <pre>
           <p v-for="sp in role_privileges" :key="sp">{{ sp }}</p>
          </pre>
        </div>
        <div class="column is-9">
          <div class="columns is-multiline">
            <div class="column is-3" v-for="p in privileges" :key="p">
              <div class="field">
                <input
                  class="is-checkradio is-link"
                  :id="'check_'+p"
                  type="checkbox"
                  :checked="role_privileges.includes(p)"
                  @change="toggle($event, p)"
                />
                <label :for="'check_'+p">{{ p }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <BtnGroup :loading="loading" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { GET_ROLES, GET_ROLE_BY_ID, UPSERT_ROLE } from "@/graphql/role";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "RoleCreate",
  methods: {
    toggle(e, args) {
      let privileges = this.role.privileges
        ? this.role.privileges.split(",")
        : [];

      if (!e.target.checked) privileges = privileges.filter(x => x !== args);
      else privileges.push(args);

      this.role.privileges = privileges.toString();
    },
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

      this.role = {
        name: "",
        privileges: []
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
    },
    role_privileges() {
      return this.role.privileges.split(",");
    }
  },
  data: function() {
    return {
      loading: false,
      alertShow: false,
      alertTitle: "",
      alertMessage: "",
      role: {
        name: "",
        privileges: ""
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
    role: {
      query: GET_ROLE_BY_ID,
      variables: function() {
        return { id: this.$route.query.id };
      },
      skip: function() {
        return !this.$route.query.id;
      }
    }
  }
};
</script>