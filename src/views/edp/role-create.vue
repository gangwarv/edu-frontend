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
          <c-select label="Modules" :options="modules" />
        </div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <pre>
           <p v-for="sp in role.privileges" :key="sp">{{ sp }}</p>
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
                  :checked="role.privileges.includes(p)"
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
import { GET_ROLES, UPSERT_ROLE } from "@/graphql/role";
import observeHttp from "@/helpers/http-alert-observer";

export default {
  name: "RoleCreate",
  methods: {
    toggle(e, args) {
      const privileges = this.role.privileges;

      if (!e.target.checked) privileges.splice(privileges.indexOf(args), 1);
      else privileges.push(args);

      this.role.privileges = privileges;
    },
    onSubmit() {
      observeHttp.call(this,
        this.$apollo
          .mutate({
            mutation: UPSERT_ROLE,
            variables: {
              ...this.role,
              privileges: this.role.privileges.toString()
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
        privileges: []
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
    roles: {
      query: GET_ROLES,
      manual: true,
      skip: function() {
        return !this.$route.query.id;
      },
      result({ data, loading }) {
        if (!loading) {
          const role = data.roles.find(x => x.id === this.$route.query.id);
          this.role = {
            id: role.id,
            name: role.name,
            privileges: role.privileges.split(",")
          };
        }
      }
    }
  }
};
</script>