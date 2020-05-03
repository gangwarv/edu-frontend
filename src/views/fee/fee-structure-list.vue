<template>
  <div class="box">
    <PageHeader header-text="Courses Fee Structure" />
    <div class="columns is-multiline">
      <div class="column is-3">
        <c-select label="Session" v-model="fsSession" :options="[sessions, 'id', 'name']"></c-select>
      </div>
      <div class="column is-3">
        <c-select label="Fee Category" v-model="fsCategory" :options="[feeCategories, 'id', 'name']"></c-select>
      </div>
    </div>
    <c-table
      :loading="$apollo.queries.feeStructures.loading"
      :columns="columns"
      :data="feeStructures"
      :buttons="['edit']"
      @edit="edit"
    />
  </div>
</template>

<script>
import { GET_COURSES_FEESTRUCTURE, GET_FEECATEGORIES } from "@/graphql/fee";
import { GET_SESSIONS } from "@/graphql/shared";

export default {
  name: "FeeStructList",
  data: function() {
    return {
      fsSession: "",
      fsCategory: "",
      columns: ["fsSession", "course", "courseName"],
      error: null
    };
  },
  methods: {
    edit({ course, fsSession, fsCategory }) {
      this.$router.push({ path: "feestructure", query: { course, fsSession, fsCategory } });
    }
  },
  apollo: {
    feeStructures: {
      query: GET_COURSES_FEESTRUCTURE,
      variables: { fsSession: "s", fsCategory: "c" }
    },
    sessions: {
      query: GET_SESSIONS,
      result({ data, loading }) {
        if (!loading && data.sessions) this.fsSession = data.sessions[0].id;
      }
    },
    feeCategories: {
      query: GET_FEECATEGORIES,
    //   result({ data, loading }) {
    //     console.log(data, loading);
    //     if (!loading && data.feeCategories) this.fsCategory = data.feeCategories[0].id;
    //   }
    }
  }
};
</script>

