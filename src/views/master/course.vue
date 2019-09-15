<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Course Details" to="/courses" link-text="Course List" />
      <Loader v-if="$route.query.id && !course._id" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
            <c-input v-model="course.name" label="Course Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="username" rules="required" v-slot="{ errors }">
            <c-select
              label="Department"
              v-model="course.department"
              :options="[depts, '_id', 'name']"
              :errors="errors"
            ></c-select>
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="course.isActive" id="s" label="Active" indeterminate />
        </div>
        <div class="column is-3"></div>
        <BtnGroup @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import gql from "graphql-tag";
import { GET_COURSE_BY_ID } from "@/graphql/course";
import { GET_AC_DEPT } from "@/graphql/academic-departments";
export default {
  name: "Course",
  data: function() {
    return {
      course: {
        _id: null,
        name: "",
        isActive: true,
        department: null
      },
      depts: []
    };
  },
  methods: {
    onSubmit: function() {
      console.log(this.course);
    },
    reset: function() {
      this.course = {
        _id: null,
        name: "",
        isActive: false,
        department: null
      };
      this.$refs.observer.reset();
    }
  },
  apollo: {
    course: {
      query: GET_COURSE_BY_ID,
      variables() {
        return {
          id: this.$route.query.id
        };
      },
      skip() {
        return !this.$route.query.id;
      }
    },
    acDepts: {
      query: GET_AC_DEPT,
      variables: {
        isActive: true
      },
      manual: true,
      result({ data, loading }) {
        if (!loading) {
          this.depts = data.acDepts;
        }
      }
    }
  }
};
</script>