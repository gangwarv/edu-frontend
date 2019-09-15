<template>
  <div class="box">
    <div class="columns is-multiline">
      <!-- <div class="column is-full"> -->
      <div class="column is-3">
        <c-input v-model="newRole.name" label="Role Name" type="text" />
      </div>
      <div class="column is-3">
        <c-check v-model="newRole.isActive" id="s" label="Active" indeterminate />
      </div>
      <div class="column is-3">
        <c-select
          label="Modules"
          v-model="selectedModule"
          defaultLabel="All"
          :options="[modules, 'name', 'name']"
        ></c-select>
      </div>
      <div class="column is-3"></div>

      <div class="column is-6"></div>

      <div class="column is-6 is-outlined" style="height: 300px; overflow-y: auto">
        <div class="columns is-multiline">
          <div class="column is-6" v-for="p in allPrivileges" :key="p.name">
            <div class="field" >
              <input
                class="is-checkradio is-block"
                :id="p.name"
                type="checkbox"
                :name="p.name"
                checked="checked"
              />
              <label :for="p.name">{{p.name}}</label>
            </div>
          </div>
        </div>
      </div>
      <!---->
      <div class="column is-5 is-hidden">
        <c-select
          label="Selected Privileges"
          multiple
          :options="[selectedPrivileges, 'name', 'name']"
        ></c-select>
      </div>
      <div class="column is-1 is-hidden">
        <a class="button is-primary is-outlined">
          <span class="icon is-small">
            <i class="fa fa-arrow-left"></i>
          </span>
          <span></span>
        </a>
      </div>
      <div class="column is-1 is-hidden">
        <a class="button is-primary is-outlined">
          <span></span>
          <span class="icon is-small">
            <i class="fa fa-arrow-right"></i>
          </span>
        </a>
      </div>
      <div class="column is-5 is-hidden">
        <c-select label="All Privileges" multiple :options="[allPrivileges, 'name', 'name']"></c-select>
      </div>
      <!---->
      <div class="column is-full">
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-text">Cancel</button>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- <div class="column is-full">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Privileges</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tr v-if="$apollo.loading">
          <td colspan="5">Loading...</td>
        </tr>
        <tbody v-else>
          <tr v-for="(item, index) in roles" :key="item._id">
            <td>{{ index }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.privileges }}</td>
            <td>YES</td>
            <td>
              <router-link :to="{ path: '/course', query: { id: item._id} }">edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      </div>-->
    </div>
  </div>
</template>

<script>
import { GET_ROLES } from "@/graphql/role";
export default {
  name: "Roles",
  computed: {
    allPrivileges: function() {
      return this.modules
        .filter(
          s => this.selectedModule == "" || s.name === this.selectedModule
        )
        .map(m => m.privileges)
        .toString()
        .split(",")
        .map(x => ({ name: x }));
    },
    selectedPrivileges: function() {
      return this.newRole.privileges.split(",").map(x => ({ name: x }));
    }
  },
  data: function() {
    return {
      newRole: {
        name: "Admin",
        privileges: "user-read,user-create,faculty-basic",
        isActive: true
      },
      selectedModule: "",
      modules: [
        {
          name: "EDP",
          privileges: ["user-read", "user-create", "role-read", "role-create"]
        },
        {
          name: "Academic",
          privileges: [
            "course-create",
            "acdept-create",
            "attendence-create",
            "attendence-view",
            "faculty-basic",
            "faculty-hod"
          ]
        },
        {
          name: "Admission",
          privileges: [
            "student-register",
            "student-admit",
            "admissions-view",
            "registrations-view"
          ]
        }
      ]
    };
  },
  apollo: {
    roles: GET_ROLES
  }
};
</script>