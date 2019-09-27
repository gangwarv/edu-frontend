<template>
  <div class="box">
    <PageHeader header-text="Course List" to="/course" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
<<<<<<< HEAD
        <Loader v-if="!courses" />
        <c-table v-else />
        <table class="table is-fullwidth is-bordered is-hoverable is-striped is-narrow" v-if="true">
=======
        <Loader v-if="!courses && !error" />
        <c-table :cols="columns" :data="courses" :buttons="['edit']" @remove="remove" @edit="edit" v-else />
        <table class="table is-hidden is-fullwidth is-bordered is-hoverable is-striped">
>>>>>>> origin/HEAD
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            <tr v-for="c in courses" :key="c._id">
              <td>{{c.id}}</td>
=======
            <tr v-for="c in courses" :key="c.id">
              <td>{{c.code}}</td>
>>>>>>> origin/HEAD
              <td>{{c.name}}</td>
              <td>{{c.departmentName}}</td>
              <td>{{c.isActive | string }}</td>
              <td>
<<<<<<< HEAD
                <div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Action</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <router-link class="dropdown-item" :to="{ path: '/course', query: { id: c.id} }">Edit</router-link>
      <a href="#" class="dropdown-item">
       Delete
      </a>
    </div>
  </div>
</div>
                <!-- <router-link :to="{ path: '/course', query: { id: c.id} }">edit</router-link> -->
=======
                <router-link :to="{ path: '/course', query: { id: c.id} }">edit</router-link>
>>>>>>> origin/HEAD
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_COURSES } from "@/graphql/course";
export default {
  name: "CourseList",
  data: function() {
    return {
      courses: [],
      columns: [
        ["Code", "code"],
        ["Name", "name"],
        ["Department", "departmentName"],
        ["Active", "isActive"]
      ],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      console.log("removed", id);
      // this.$router.push({ path: 'course', query: { id } });
    },
    edit({ id }) {
      console.log("edited", id);
      this.$router.push({ path: "course", query: { id } });
    }
  },
  apollo: {
    courses: {
      query: GET_COURSES,
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  }
};
</script>