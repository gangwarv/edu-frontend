<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Course Details" to="/courses" link-text="Course List" />
<<<<<<< HEAD
      <Loader v-if="$route.query.id && !course.id" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <c-input v-model="course.name" label="Course Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="Department" rules="required" v-slot="{ errors }">
=======
      <Alert v-model="show" :title="status" :message="message" />
      {{  }}
      <Loader v-if="($route.query.id && !course.id) || !depts.length" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <ValidationProvider name="code" rules="required" v-slot="{ errors }">
            <c-input v-model="course.code" label="Code" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <c-input v-model="course.name" label="Name" type="text" :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="department" rules="required" v-slot="{ errors }">
>>>>>>> origin/HEAD
            <c-select
              label="Department"
              v-model="course.department"
              :options="[depts, 'id', 'name']"
              :errors="errors"
            ></c-select>
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="type" rules="required" v-slot="{ errors }">
            <c-select
              label="Type"
              v-model="course.type"
              :options="[['UG','PG','INT']]"
              :errors="errors"
            ></c-select>
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="duration" rules="required" v-slot="{ errors }">
            <c-select
              label="Duration"
              v-model="course.duration"
              :options="[['2-S','4-S','6-S', '8-S']]"
              :errors="errors"
            ></c-select>
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="course.isActive" id="s" label="Active" indeterminate />
        </div>
        <div class="column is-3"></div>
        <BtnGroup :loading="status==='loading'" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import gql from "graphql-tag";
import { GET_COURSE_BY_ID, UPSERT_COURSE } from "@/graphql/course";
import { GET_AC_DEPT } from "@/graphql/academic-departments";
export default {
  name: "Course",
  data: function() {
    return {
      course: {
<<<<<<< HEAD
        id: undefined,
        code: "XX",
        type: "UG",
=======
        code: "",
        type: "",
>>>>>>> origin/HEAD
        name: "",
        duration: "",
        isActive: true,
        department: null
      },
      show: false,
      status: "",
      message:"",
      depts: []
    };
  },
  methods: {
    onSubmit: function() {
<<<<<<< HEAD
      console.log({...this.course});
      this.$apollo.mutate({
        mutation: UPSERT_COURSE,
        variables:{
          ...this.course
        }
      })
      .then(res=>{
        console.log(res)
      })
=======
      console.log({ ...this.course });
      this.status = "loading";
      this.$apollo
        .mutate({
          mutation: UPSERT_COURSE,
          variables: {
            ...this.course
          }
        })
        .then(res => {
          this.show = true;
          this.status = "Success";
          this.message = "Data saved successfully!"
          console.log("added", res);
        })
        .catch(err => {
          this.show = true;
          this.status = "Failed";
          this.message = err.networkError.result.errors[0].message;
        });
>>>>>>> origin/HEAD
    },
    reset: function() {
      if(this.$route.query.id){
        return this.$router.push('/courses')
      }
      this.course = {
<<<<<<< HEAD
        id: null,
=======
        code: "",
        type: "",
>>>>>>> origin/HEAD
        name: "",
        duration: "",
        isActive: true,
        department: null
      };
      this.$refs.observer.reset();
      // this.$router.push('/course')
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