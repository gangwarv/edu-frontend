<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Course Details" to="/courses" link-text="Course List" />
      <Alert v-model="alertShow" :title="alertTitle" :message="alertMessage" />
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
            <c-select label="Type" v-model="course.type" :options="[types]" :errors="errors"></c-select>
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <ValidationProvider name="duration" rules="required" v-slot="{ errors }">
            <c-select
              label="Duration"
              v-model="course.duration"
              :options="[durations]"
              :errors="errors"
            ></c-select>
          </ValidationProvider>
        </div>
        <div class="column is-3">
          <c-check v-model="course.isActive" id="s" label="Active" indeterminate />
        </div>
        <div class="column is-3"></div>
        <BtnGroup :loading="loading" @reset="reset" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import gql from "graphql-tag";
import observeHttp from "@/helpers/http-alert-observer";
import { GET_COURSES, getCourseById, UPSERT_COURSE } from "@/graphql/course";
import { getAcDepts } from "@/graphql/ac-dept";

export default {
  name: "Course",
  data: function() {
    return {
      course: {
        code: "",
        type: "",
        name: "",
        duration: "",
        isActive: true,
        department: null
      },
      loading: false,
      alertShow: false,
      alertTitle: "",
      alertMessage: "",
      depts: []
    };
  },
  methods: {
    onSubmit: function() {
      observeHttp.call(
        this,
        this.$apollo.mutate({
          mutation: UPSERT_COURSE,
          variables: {
            ...this.course
          },
          update: (store, { data: { addCourse } }) => {
            const data = store.readQuery({ query: GET_COURSES });
            data.courses = data.courses.filter(x => x.id !== addCourse.id);
            if (!data.courses.some(x => x.id === addCourse.id)) {
              data.courses.push(addCourse);
            }
            store.writeQuery({ query: GET_COURSES, data });
          }
        })
      );
    },
    reset: function() {
      if (this.$route.query.id) {
        return this.$router.back(); //push("/courses");
      }
      this.course = {
        code: "",
        type: "",
        name: "",
        duration: "",
        isActive: true,
        department: null
      };
      this.$refs.observer.reset();
    }
  },
  apollo: {
    course: getCourseById.bind(
      this,
      function() {
        return { id: this.$route.query.id };
      },
      function() {
        return !this.$route.query.id;
      }
    ),
    acDepts: getAcDepts.bind(this, true)
  },
  computed: {
    types() {
      return this.$store.getters.courseTypes;
    },
    durations() {
      return this.$store.getters.courseDurations;
    }
  }
};
</script>