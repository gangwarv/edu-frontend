<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Course Details" to="/courses" link-text="Course List" />
      <Loader v-if="$apollo.queries.course.loading" />
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
              :options="[departments, 'id', 'name']"
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
import { GET_COURSE_BY_ID, UPSERT_COURSE } from "@/graphql/course";
import { GET_ALL_DEPARTMENTS } from "@/graphql/department";

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
      depts: []
    };
  },
  methods: {
    onSubmit() {
      this.$observe(this.$apollo.mutate({
          mutation: UPSERT_COURSE,
          variables: {
            ...this.course
          }
        })
      );
    },
    reset() {
      if (this.$route.query.id) {
        return this.$router.back();
      }
      this.$clear(this.course);
      this.$refs.observer.reset();
    }
  },
  apollo: {
    course: {
      query: GET_COURSE_BY_ID,
      variables() {
        return { id: this.$route.query.id };
      },
      skip() {
        return !this.$route.query.id;
      }
    },
    departments: GET_ALL_DEPARTMENTS
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