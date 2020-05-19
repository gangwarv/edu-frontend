<template>
  <div class="box">
    <PageHeader
      :header-text="'Fee Structure Create (' + query.feeType + ')'"
      to="/feestructures"
      link-text="Fee Structure"
    />
    <Loader v-if="$apollo.queries.sessions.loading" />
    <div v-else>
      <div class="columns is-multiline is-mobile">
        <div class="column is-3">
          <c-select label="Session" v-model="query.fsSession" :options="[sessions, 'id', 'name']"></c-select>
        </div>
        <div class="column is-3">
          <c-select
            label="Fee Category"
            v-model="query.fsCategory"
            :options="[feeCategories, 'id', 'name']"
          ></c-select>
        </div>
        <div class="column is-3">
          <c-select label="Fee Type" v-model="query.feeType" :options="[feeTypes, 'id', 'name']"></c-select>
        </div>
        <div class="column is-3">
          <c-select v-if="isAcademic"
            label="Course"
            v-model="query.course"
            defaultLabel="All"
            :options="[courses, 'id', 'name']"
          ></c-select>
        </div>
        <div class="column is-3">
          <c-select 
            label="Fee Item"
            v-model="query.feeItem"
            defaultLabel="All"
            :options="[feeItems, 'id', 'name']"
          ></c-select>
        </div>
        <div class="column is-6">
          </div>
        <div class="column is-3">
          <btn-search
            :disabled="!queryValid"
            :loading="$apollo.queries.feeStructure.loading"
            @click="$apollo.queries.feeStructure.skip=false;$apollo.queries.feeStructure.refresh()"
          ></btn-search>
        </div>
      </div>
      <b-notification
        v-if="isOther"
        type="is-warning"
        aria-close-label="Close notification"
        role="alert"
      >NOTE: type-2 (Other-Fee) fees will be same for all courses.</b-notification>
      <ValidationObserver v-slot="{ passes }" ref="observer">
        <form @submit.prevent="passes(onSubmit)">
          <Loader v-if="$apollo.queries.feeStructure.loading" />
          <div class="table-container" v-else>
            <table class="table is-fullwidth is-striped is-narrow">
              <tr>
                <td colspan="2">
                  <a class="is-link" :disabled="true" @click="addNew">Add New</a>
                </td>
              </tr>
              <tr>
                <th style="width:10px">#</th>
                <th v-if="isAcademic">FeeType</th>
                <th v-if="isAcademic" style="width:150px">Course</th>
                <th v-if="isAcademic">Year</th>
                <th v-if="isAcademic">Label</th>
                <th>FeeItem</th>
                <th style="width:150px">Amount</th>
                <th>FromDate</th>
                <th>DueDate</th>
                <th></th>
              </tr>
              <tr
                :key="i"
                v-for="(obj,i) in activeFeeStructure"
                class="has-background-light newTr_"
              >
                <td>
                  <span
                    title="Copy & Paste below"
                    style="cursor:pointer"
                    class="icon has-text-link"
                    @click="addNew(i+1, obj)"
                  >
                    <i class="fa fa-copy"></i>
                  </span>
                </td>
                <td v-if="isAcademic">{{ obj.feeType }}</td>
                <td v-if="isAcademic">
                  <v-select
                    :name="`Course ${i}`"
                    rules="required"
                    size="is-small"
                    v-model="obj.course"
                    :options="[courses]"
                    :readonly="isAcademic && !!obj.id"
                    :disabled="isAcademic  && !!obj.id"
                  />
                </td>
                <td v-if="isAcademic">
                  <v-select
                    :name="`Year ${i}`"
                    rules="required"
                    size="is-small"
                    v-model="obj.year"
                    :readonly="isOther"
                    :disabled="isOther"
                    :options="[getYears(obj.course)]"
                  />
                </td>
                <td v-if="isAcademic">
                  <v-input size="is-small" v-model="obj.label" placeholder="Label" />
                </td>
                <td>
                  <v-select
                    :name="`Fee Item ${i}`"
                    rules="required"
                    size="is-small"
                    v-model="obj.feeItem"
                    :options="[feeItems]"
                  />
                </td>
                <td>
                  <v-input
                    :name="`Fee Amount ${i}`"
                    rules="required|min_value:1"
                    size="is-small"
                    v-model="obj.feeAmount"
                    type="number"
                    placeholder="Amount"
                  />
                </td>
                <td>
                  <v-datepicker
                    :name="`From Date ${i}`"
                    :id="'FromDate'+i"
                    rules="required"
                    size="is-small"
                    v-model="obj.fromDate"
                  />
                </td>
                <td>
                  <v-datepicker
                    :name="`Due Date ${i}`"
                    rules="required"
                    size="is-small"
                    v-model="obj.dueDate"
                    :min-date="new Date()"
                  />
                </td>
                <td>
                  <span style="cursor:pointer" class="icon has-text-link" @click="remove(obj)">
                    <i class="fa fa-times"></i>
                  </span>
                </td>
              </tr>
            </table>
            <div style="height:360px">
              <btn-group @reset="reset" :submit-disabled="feeStructure.length == 0" @submit="onSubmit" />
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {
  GET_ALL_FEEITEMS,
  GET_FEESTRUCTURE,
  ADD_FEESTRUCTURE,
  GET_FEECATEGORIES
} from "@/graphql/fee";
import { GET_COURSES, GET_SESSIONS } from "@/graphql/shared";

export default {
  name: "FeeStructCreate",
  data: function() {
    return {
      query: {
        fsSession: null,
        fsCategory: null,
        course: null,
        feeType: null,
        feeItem: null
      },
      feeStructure: [],
      feeStructurePersisted: []
    };
  },
  methods: {
    addNew(i = 0, obj) {
      let newObj = {
        id: null,
        feeType: null,
        fsCategory: null,
        fsSession: null,
        feeAmount: null,
        feeItem: null,
        fromDate: new Date(),
        dueDate: null,
        isOptional: false,
        label: null,
        year: null,
        course: null,
        // addition
        isDeleted: false,
        localId: Math.random().toString(),
        ...this.query
      };
      if (obj) {
        newObj = { ...obj, id: null };
      }
      this.feeStructure.splice(i, 0, newObj);
    },
    remove(obj) {
      if (!obj.id) this.feeStructure.splice(this.feeStructure.indexOf(obj), 1);
      else obj.isDeleted = true;
    },
    reset() {
      this.$refs.observer.reset();
      this.feeStructure = this.feeStructurePersisted.map(x => ({ ...x }));
    },
    getYears(e) {
      if (!e) {
        return [];
      }
      let duration = this.courses.find(x => x.id === e).duration.split("-");
      let years = parseInt(duration[0]);
      years = duration[1] === "Y" ? years : years / 2;

      return this.years.slice(0, years);
    },
    setFeeStructure(fs) {
      this.feeStructure = fs.map(x => ({
        ...x,
        localId: Math.random().toString(),
        isDeleted: false
      }));
      // deep copy
      this.feeStructurePersisted = this.feeStructure.map(x => ({ ...x }));
    },
    onSubmit() {
      const rows = this.activeFeeStructure.map(
        x => x.course + x.year + x.label + x.feeItem
      );
      let dup = rows.filter((x, i, a) => i == a.lastIndexOf(x));
      let dupComb = dup
        .map(d =>
          rows.reduce((acc, s, i) => {
            if (d === s) acc.push(i);
            return acc;
          }, [])
        )
        .filter(l => l.length > 1);
      if (dupComb.length) {
        const msg = dupComb
          .map(x => `(${x.map(i => i + 1).toString()})`)
          .join(" & ");
        alert("Please check these combination of rows. " + msg);
        return;
      }
      this.$mutate({
        mutation: ADD_FEESTRUCTURE,
        variables: {
          fs: this.feeStructure.map(x => {
            delete x.__typename;
            delete x.localId;
            return x;
          })
        }
      }).then(this.setFeeStructure);
    }
  },
  apollo: {
    feeStructure: {
      query: GET_FEESTRUCTURE,
      variables() {
        return { ...this.query };
      },
      manual: true,
      result({ loading, data }) {
        if (!loading) {
          {
            this.setFeeStructure(data.feeStructure);
          }
        }
      },
      skip: true
    },
    sessions: {
      query: GET_SESSIONS,
      result({ data, loading }) {
        if (!loading && data.sessions)
          this.query.fsSession = data.sessions[0].id;
      }
    },
    feeCategories: {
      query: GET_FEECATEGORIES,
      result({ data, loading }) {
        if (!loading && data.feeCategories)
          this.query.fsCategory = data.feeCategories[0].id;
      }
    }, ///////////////////////End
    feeItems: {
      query: GET_ALL_FEEITEMS
    },
    courses: GET_COURSES
  },
  computed: {
    queryValid() {
      const { fsSession, fsCategory, feeType } = this.query;
      return !!(fsSession && fsCategory && feeType);
    },
    isAcademic() {
      return this.query.feeType === "type-1";
    },
    isOther() {
      return this.query.feeType === "type-2";
    },
    years() {
      return this.$store.getters.years;
    },
    activeFeeStructure() {
      // console.log({...this.feeStructure})
      return this.feeStructure.filter(x => !x.isDeleted);
    },
    feeTypes() {
      return this.$store.getters.feeTypes;
    }
  }
};
</script>
<style scoped>
table tr:nth-child(3) {
  animation: slide-up 0.4s ease;
}
.newTrs {
  animation: slide-up 0.4s ease;
}
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>