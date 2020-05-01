<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Configure Role" to="/roles" link-text="View All Roles" />
      <Loader v-if="$apollo.queries.role.loading" />
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
                <b-checkbox
                  :value="role_privileges.includes(p)"
                  @change.native="toggle($event, p)"
                >{{ p }}</b-checkbox>
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
import { GET_ROLE_BY_ID, UPSERT_ROLE } from "@/graphql/role";

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
      this.$observe(this.$apollo.mutate({
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
      this.$clear(this.role);
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
      role: {
        name: "",
        privileges: ""
      },
      selectedModule: "",
      appmodules: [
        {
          module: "EDP",
          name: "admin"
        },
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
          module: "EDP",
          name: "category-view"
        },
        {
          module: "EDP",
          name: "category-create"
        },
        {
          module: "EDP",
          name: "category-delete"
        },
        {
          module: "Master",
          name: "course-view"
        },
        {
          module: "Academic",
          name: "course-create"
        },
        {
          module: "Master",
          name: "course-delete"
        },
        {
          module: "Fee Management",
          name: "fee-structure-crud"
        }
      ]
    };
  },
  apollo: {
    role: {
      query: GET_ROLE_BY_ID,
      manual: true,
      result({ data, loading }) {
        if (!loading) this.role = { ...data.role };
      },
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