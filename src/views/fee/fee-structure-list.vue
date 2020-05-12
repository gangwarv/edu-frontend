<template>
  <div class="box">
    <PageHeader header-text="Courses Fee Structure" />

    <div>
      <Loader v-if="$apollo.queries.sessions.loading" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <c-select label="Session" v-model="fsSession" :options="[sessions, 'id', 'name']"></c-select>
        </div>
        <div class="column is-3">
          <c-select
            label="Fee Category"
            v-model="fsCategory"
            :options="[feeCategories, 'id', 'name']"
          ></c-select>
        </div>

        <div class="column is-6">
          <btn-search
            :loading="$apollo.queries.feeStructures.loading"
            @click="$apollo.queries.feeStructures.refresh()"
          ></btn-search>
        </div>
        <!-- <div class="column is-12">
          <a
            @click="$emit('click')"
          >
            <span>Search</span>
          </a>
        </div>-->
      </div>
      <c-table
        :loading="$apollo.queries.feeStructures.loading"
        :columns="columns"
        :data="feeStructures"
        @edit="edit"
        :actions="[{text:'Edit-Academic-Fee', eventName:'academic'},{text:'Edit-Non-Academic-Fee', eventName:'non-academic'},{text:'Edit-Other-Fee', eventName:'other'}]"
        @change="change"
      />
    </div>
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
      columns: ["fsSession", "course", "courseName", "academicCount"],
      error: null,
      feeStructures: null
    };
  },
  methods: {
    edit({ course, fsSession, fsCategory }) {
      this.$router.push({
        path: "feestructure",
        query: { course, fsSession, fsCategory, feeType: "academic" }
      });
    },
    change({ type, data, count }) {
      // console.log({ type, data });
      const { fsSession, fsCategory } = this;
      let query = { fsSession, fsCategory, feeType: type };

      if (type == "academic")
        if (count != 1) return alert("please select ONLY-ONE course.");
        else
          query = {
            ...query,
            course: data[0].course
          };
      else if (type !== "academic")
        if (count != -1) return alert("please select ALL course.");
      // push
      // console.log(query)

      this.$router.push({
        path: "feestructure",
        query
      });
    }
  },
  apollo: {
    feeStructures: {
      query: GET_COURSES_FEESTRUCTURE,
      variables() {
        return { fsSession: this.fsSession, fsCategory: this.fsCategory };
      },
      skip() {
        return !(
          (this.fsSession && this.fsCategory)
          // this.$apollo.queries.sessions.loading ||
          // this.$apollo.queries.feeCategories.loading
        );
      },
      manual: true,
      result({ loading, data }) {
        if (!loading)
          this.feeStructures = data.feeStructures.map(x => ({
            ...x,
            academicCount: x.academic.count,
            nonAcademicCount: x.nonAcademic.count,
            otherCount: x.other.count
          }));
      }
    },
    sessions: {
      query: GET_SESSIONS,
      result({ data, loading }) {
        if (!loading && data.sessions) this.fsSession = data.sessions[0].id;
      }
    },
    feeCategories: {
      query: GET_FEECATEGORIES,
      result({ data, loading }) {
        if (!loading && data.feeCategories)
          this.fsCategory = data.feeCategories[0].id;
      }
    }
  }
};
</script>

