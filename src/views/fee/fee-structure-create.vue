<template>
  <div class="box">
    <PageHeader
      :header-text="'Fee Structure Create (' + query.feeType + ')'"
      to="/feestructures"
      link-text="Fee Structure"
    />
    <div v-if="!$apollo.loading">
      <div class="columns is-multiline is-mobile">
        <div class="column is-3">
          <strong>Session:</strong>
        </div>
        <div class="column is-3">
          <b-tag size="is-medium">{{ query.fsSession }}</b-tag>
        </div>
        <div class="column is-3">
          <strong>Category:</strong>
        </div>
        <div class="column is-3">
          <b-tag size="is-medium">{{ query.fsCategory }}</b-tag>
        </div>
      </div>
      <!-- <ValidationObserver v-slot="{ passes }" ref="observer">
        <form @submit.prevent="passes(onSubmit)">
          <div class="columns is-multiline">
            <div class="column is-3" v-if="isAcademic || isOther">
              <ValidationProvider name="Course" rules="required" v-slot="{ errors }">
                <c-select
                  v-model="obj.course"
                  :options="[courses, 'id', 'name']"
                  defaultLabel="All"
                  @change="courseChange"
                  label="Course"
                  :errors="errors"
                />
              </ValidationProvider>
            </div>
            <div class="column is-3" v-if="isAcademic">
              <ValidationProvider name="Year" rules="required" v-slot="{ errors }">
                <c-select
                  label="Year"
                  v-model="obj.year"
                  defaultLabel="Select"
                  :options="[years, 'id', 'name']"
                  :errors="errors"
                />
              </ValidationProvider>
            </div>
            <div class="column is-3" v-if="isAcademic">
              <c-input label="Assign a Label" v-model="obj.label" placeholder="Label"></c-input>
            </div>
            <div class="column is-3">
              <ValidationProvider name="Fee Item" rules="required" v-slot="{ errors }">
                <c-select
                  label="Fee Item"
                  v-model="obj.feeItem"
                  :options="[feeItems, 'id', 'name']"
                  :errors="errors"
                />
              </ValidationProvider>
            </div>
            <div class="column is-3">
              <ValidationProvider name="Fee Amount" rules="required" v-slot="{ errors }">
                <c-input
                  label="Fee Amount"
                  v-model="obj.amount"
                  type="number"
                  placeholder="Amount"
                  :errors="errors"
                />
              </ValidationProvider>
            </div>
            <div class="column is-3">
              <ValidationProvider name="From Date" rules="required" v-slot="{ errors }">
                <c-datepicker
                  label="From Date"
                  v-model="obj.fromDate"
                  :min-date="new Date()"
                  :errors="errors"
                />
              </ValidationProvider>
            </div>
            <div class="column is-3">
              <ValidationProvider name="Due Date" rules="required" v-slot="{ errors }">
                <c-datepicker
                  label="Due Date"
                  v-model="obj.dueDate"
                  :min-date="new Date()"
                  :errors="errors"
                />
              </ValidationProvider>
            </div>
            <div class="column is-3" v-if="isAcademic">
              All fee is not Academic by default optional (true)
              <c-check label="IsOptional" v-model="obj.isOptional"></c-check>
            </div>
          </div>
          <div class="columns">
            <div class="column is-3 is-offset-9">
              <BtnGroup
                @reset="reset"
                @submit="onAddOrUpdate"
                css-class="is-pulled-right"
                :btn-submit="obj.id ? 'Update' : 'Add'"
              />
            </div>
          </div>
        </form>
      </ValidationObserver>-->
    </div>
    <hr />
    <ValidationObserver v-slot="{ passes }" ref="observer">
      <form @submit.prevent="passes(onSubmit)">
        <div class="table-container">
          <table class="table is-fullwidth is-striped is-narrow" v-if="!$apollo.loading">
            <tr>
              <td colspan="2">
                <a class="is-link" @click="addNew">Add New</a>
              </td>
            </tr>
            <tr>
              <th style="width:10px">#</th>
              <th v-if="isAcademic || isOther">Course</th>
              <th v-if="isAcademic">Year</th>
              <th v-if="isAcademic">Label</th>
              <th>FeeItem</th>
              <th style="width:150px">Amount</th>
              <th>FromDate</th>
              <th>DueDate</th>
              <th v-if="isAcademic">isOptional</th>
              <th>x</th>
            </tr>
            <tr
              :key="obj.id"
              v-for="(obj,i) in activeFeeStructure"
              class="has-background-light newTr"
            >
              <td>{{ i+1 }}</td>
              <td v-if="isAcademic || isOther">
                <v-select
                  :name="`Course ${i}`"
                  rules="required"
                  size="is-small"
                  v-model="obj.course"
                  :options="[courses]"
                  :readonly="isAcademic"
                  :disabled="isAcademic"
                />
              </td>
              <td v-if="isAcademic">
                <v-select
                  :name="`Year ${i}`"
                  rules="required"
                  size="is-small"
                  v-model="obj.year"
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
                  rules="required"
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
                  rules=""
                  size="is-small"
                  v-model="obj.fromDate"
                  :min-date="new Date()"
                />
              </td>
              <td>
                <v-datepicker
                  :name="`Due Date ${i}`"
                  rules=""
                  size="is-small"
                  v-model="obj.dueDate"
                  :min-date="new Date()"
                />
              </td>
              <td v-if="isAcademic">
                <v-check v-model="obj.isOptional" />
              </td>
              <td>
                <span style="cursor:pointer" class="icon has-text-link" @click="remove(obj)">
                  <i class="fa fa-times"></i>
                </span>
              </td>
            </tr>
          </table>
          <div style="height:360px">
            <btn-group @reset="reset" @submit="onSubmit" />
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  GET_ALL_FEEITEMS,
  GET_FEESTRUCTURE,
  ADD_FEESTRUCTURE
} from "@/graphql/fee";
import { GET_COURSES } from "@/graphql/shared";

export default {
  name: "FeeStructCreate",
  data: function() {
    const { fsSession, fsCategory, course } = this.$route.query;
    let feeTypes = ["academic", "non-academic", "other"];
    return {
      query: { fsSession, fsCategory, course, feeType: feeTypes[0] },
      feeStructure: [],
      feeStructurePersisted: []
    };
  },
  methods: {
    addNew() {
      this.feeStructure.unshift({
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
        ...this.query
      });
    },
    remove(obj) {
      if (!obj.id)
        return this.feeStructure.splice(this.feeStructure.indexOf(obj), 1);

      obj.isDeleted = true;
      obj.label = "true";
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
      console.log("submit", rows, this.feeStructure);
      this.$mutate({
        mutation: ADD_FEESTRUCTURE,
        variables:{
            fs: JSON.stringify(this.feeStructure,null,5)
          }
      });
    }
  },
  apollo: {
    feeStructure: {
      query: GET_FEESTRUCTURE,
      variables() {
        return { ...this.$route.query };
      },
      manual: true,
      result({ loading, data }) {
        if (!loading) {
          this.feeStructure = data.feeStructure.map(x => ({
            ...x,
            isDeleted: false
          }));
          this.feeStructurePersisted = this.feeStructure.map(x => ({ ...x }));
        }
      }
    },
    feeItems: {
      query: GET_ALL_FEEITEMS
      // result({ loading, data }) {
      //   if (!loading)
      //     console.log(data.feeItems, this.feeStructure, this.courses);
      // }
    },
    courses: GET_COURSES
  },
  computed: {
    isNonAcademic() {
      return this.query.feeType === "non-academic";
    },
    isAcademic() {
      return this.query.feeType === "academic";
    },
    isOther() {
      return this.query.feeType === "other";
    },
    years() {
      return this.$store.getters.years;
    },
    activeFeeStructure() {
      return this.feeStructure.filter(x => !x.isDeleted);
    }
  }
};
</script>
<style scoped>
.newTr {
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