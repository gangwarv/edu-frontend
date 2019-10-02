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
        <BtnGroup :loading="status==='loading'" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "RoleCreate",
  methods: {
    onSubmit() {},
    reset() {},
  },
  computed: {
    modules() {
      return this.privileges
        .map(x => x.module)
        .filter((m, i, ar) => ar.indexOf(m) === i)
        .map(c=>({value:c}));
    }
  },
  data: function() {
    return {
      status:'',
      alertShow: false,
      alertTitle: "",
      alertMessage: "",
      role: {
        name: "Admin",
        privileges: ["user-view", "user-create", "attendance-view"]
      },
      selectedModule: "",
      privileges: [
        {
          module: "EDP",
          name: "user-view"
        },
        {
          module: "EDP",
          privileges: "user-create"
        },
        {
          module: "EDP",
          privileges: "role-view"
        },
        {
          module: "EDP",
          privileges: "role-create"
        },
        {
          module: "Academic",
          privileges: "course-create"
        },
        {
          module: "Academic",
          privileges: "attendence-view"
        },
        {
          module: "Academic",
          privileges: "attendence-create"
        }
      ]
    };
  }
};
</script>