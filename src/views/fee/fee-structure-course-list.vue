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
            :loading="$apollo.queries.courseFeeStructure.loading"
            @click="$apollo.queries.courseFeeStructure.refresh()"
          ></btn-search>
        </div>
      </div>
      <c-table
        :loading="$apollo.queries.courseFeeStructure.loading"
        :columns="columns"
        :data="feeStructures"
        @edit="edit"
        :buttons="['edit']"
      >
        <template slot="detail" slot-scope="{ row: {feeDetails} }">
          <!-- <span>{{JSON.stringify(props)}}</span>JJj -->
          <table class="table" v-if="feeDetails.length">
            <tr>
              <th>Year</th>
              <th>Label</th>
              <th>Fee Item</th>
              <th>Amount</th>
            </tr>
            <tr :key="item.id" v-for="item in feeDetails">
              <td>{{ item.year == "0" ? 'pre-admission' :  item.year+'-Year' }}</td>
              <td>{{ item.label }}</td>
              <td>{{ item.feeItemName }}</td>
              <td>{{ item.feeAmount }}</td>
            </tr>
          </table>
          <span v-else>No record found</span>
        </template>
      </c-table>
    </div>
  </div>
</template>

<script>
import { GET_COURSES_FEESTRUCTURE, GET_FEECATEGORIES } from "@/graphql/fee";
import { GET_SESSIONS } from "@/graphql/shared";

export default {
  name: "CourseFeeStructure",
  data: function() {
    return {
      fsSession: "",
      fsCategory: "",
      columns: ["fsSession", "code", "courseName", "feeDefined"],
      error: null,
      feeStructures: null
    };
  },
  methods: {
    edit({ id, fsSession, fsCategory }) {
      this.$router.push({
        path: "fs-create",
        query: { course: id, fsSession, fsCategory, feeType: "type-1" }
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
      //console.log(query)
      this.$router.push({
        name: "feestructure",
        query
      });
    }
  },
  apollo: {
    courseFeeStructure: {
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
          this.feeStructures = data.courseFeeStructure.map(x => ({
            ...x,
            feeDefined: x.feeDetails.length > 0,
            feeDetails: x.feeDetails.sort((a,b)=>a.year>b.year? 1:-1)
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

