<template>
  <div class="box">
    <PageHeader
      :header-text="'Fee Structure Create (' + query.feeType + ')'"
      to="/feestructures"
      link-text="Fee Structure"
    />
    <Loader v-if="$apollo.queries.sessions.loading" />
    <div v-else>
      <ValidationObserver ref="searchObserver">
        <form>
          <div class="columns is-multiline is-mobile">
            <!-----STOP----->
            <div class="column is-4">
              <c-select
                horizontal
                label="Session"
                v-model="query.fsSession"
                :options="[sessions, 'id', 'name']"
              ></c-select>
            </div>
            <div class="column is-4">
              <c-select
                horizontal
                label="Category"
                v-model="query.fsCategory"
                :options="[feeCategories, 'id', 'name']"
                @change="$apollo.queries.feeStructure.skip=false;$apollo.queries.feeStructure.refresh();"
              ></c-select>
            </div>
            <div class="column is-4">
              <c-select
                horizontal
                label="Fee Type"
                v-model="query.feeType"
                :options="[feeTypes, 'id', 'name']"
              ></c-select>
            </div>
            <div class="column is-4">
              <c-select
                horizontal
                v-if="isAcademic"
                label="Course"
                v-model="query.course"
                defaultLabel="All"
                :options="[courses, 'id', 'name']"
              ></c-select>
            </div>
            <div class="column is-4">
              <c-select
                horizontal
                v-if="isAcademic"
                label="Year"
                v-model="query.year"
                defaultLabel="All"
                :options="[getYears(query.course), 'id', 'name']"
              ></c-select>
            </div>
            <div class="column is-4">
              <c-select
                horizontal
                label="Fee Item"
                v-model="query.feeItem"
                defaultLabel="All"
                :options="[feeItems, 'id', 'name']"
              ></c-select>
            </div>
            <div class="column is-4">
              <btn-search
                :disabled="!queryValid"
                :loading="$apollo.queries.feeStructure.loading"
                @click="$apollo.queries.feeStructure.skip=false;$apollo.queries.feeStructure.refresh();"
              ></btn-search>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <div class="field" v-if="$hasRole('fee-structure-crud')">
        <b-switch v-model="editMode">Edit Mode</b-switch>
      </div>
      <Loader v-if="$apollo.queries.feeStructure.loading" />
      <ValidationObserver v-else-if="editMode" v-slot="{ passes }" ref="observer">
        <form @submit.prevent="passes(onSubmit)">
          <div class="table-container">
            <table class="table is-fullwidth is-striped is-narrow">
              <tr>
                <td colspan="2">
                  <button
                    class="button is-small is-white"
                    :disabled="editIndex > -1"
                    @click="addNew"
                  >Add New</button>
                </td>
              </tr>
              <tr>
                <th style="width:40px">#</th>
                <th v-if="isAcademic" style="width:250px">Course</th>
                <th v-if="isAcademic" style="width:100px">Year</th>
                <th v-if="isAcademic">Label</th>
                <th>FeeItem</th>
                <th style="width:150px">Amount</th>
                <th>FromDate</th>
                <th>DueDate</th>
                <th style="width:76px"></th>
              </tr>
              <template v-for="(obj,i) in activeFeeStructure" class="has-background-light newTr_">
                <tr :key="i" v-if="i === editIndex">
                  <td></td>
                  <td v-if="isAcademic">
                    <v-select
                      :name="`Course ${i}`"
                      rules="required"
                      size="is-small"
                      v-model="obj.course"
                      :options="[courses]"
                      :readonly="isAcademic && !!query.course"
                      :disabled="isAcademic  && !!query.course"
                    />
                  </td>
                  <td v-if="isAcademic">
                    <v-select
                      :name="`Year ${i}`"
                      rules="required"
                      size="is-small"
                      v-model="obj.year"
                      :readonly="isOther && !!obj.year"
                      :disabled="isOther && !!obj.year"
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
                    <span style="cursor:pointer" class="icon has-text-link" @click="validateRow">
                      <i class="fa fa-save"></i>
                    </span>

                    <span style="cursor:pointer" class="icon has-text-link" @click="remove(obj)">
                      <i class="fa fa-times"></i>
                    </span>
                  </td>
                </tr>
                <tr :key="i" v-else>
                  <td>
                    <span
                      v-if="editIndex==-1"
                      title="Copy & Paste below"
                      style="cursor:pointer"
                      class="icon has-text-link"
                      @click="addNew(i+1, obj)"
                    >
                      <i class="fa fa-copy"></i>
                    </span>
                  </td>
                  <td v-if="isAcademic">{{ courses.find(c=>c.id==obj.course).name }}</td>
                  <td v-if="isAcademic">{{ obj.year }}</td>
                  <td v-if="isAcademic">{{ obj.label }}</td>
                  <td>{{ feeItems.find(c => c.id == obj.feeItem).name }}</td>
                  <td>{{ obj.feeAmount }}</td>
                  <td>{{ obj.fromDate | date }}</td>
                  <td>{{ obj.dueDate | date }}</td>
                  <td>
                    <span
                      v-if="editIndex==-1"
                      style="cursor:pointer"
                      class="icon has-text-link"
                      @click="editIndex = i"
                    >
                      <i class="fa fa-edit"></i>
                    </span>
                    <span
                      v-if="editIndex==-1"
                      style="cursor:pointer"
                      class="icon has-text-link"
                      @click="remove(obj)"
                    >
                      <i class="fa fa-times"></i>
                    </span>
                  </td>
                </tr>
              </template>
              <tfoot>
                <tr>
                  <td :colspan="colSpan">
                    <btn-group
                      css-class="is-pulled-right"
                      @reset="reset"
                      :submit-disabled="feeStructure.length == 0 || editIndex > -1"
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
            <!-- {{ JSON.stringify($refs.observer.flags) }} -->
            <!-- <div style="height:360px">
              <btn-group
                @reset="reset"
                :submit-disabled="feeStructure.length == 0 || editIndex > -1"
              />
            </div>-->
          </div>
        </form>
      </ValidationObserver>
      <c-table
        v-else-if="!editMode"
        :loading="$apollo.queries.feeStructure.loading"
        :columns="columns"
        :data="feeStructurePersisted"
      />
      <b-notification
        v-if="isOther"
        type="is-warning"
        aria-close-label="Close notification"
        role="alert"
      >NOTE: type-2 (Other-Fee) fees will be same for all courses.</b-notification>
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
  name: "FeeStructure",
  mounted() {
    if (this.$route.query.course)
      this.$apollo.queries.feeStructure.skip = false;
  },
  data: function() {
    return {
      editMode: true,
      editIndex: -1,
      query: {
        fsSession: null,
        fsCategory: null,
        course: null,
        feeType: null,
        feeItem: null,
        year: null,
        ...this.$route.query
      },
      feeStructure: [],
      feeStructurePersisted: []
    };
  },
  methods: {
    async validateRow() {
      let isValid = await this.$refs.observer.validate();
      if (isValid) this.editIndex = -1;
    },
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
        label: null,
        year: null,
        // addition
        isDeleted: false,
        ...this.query,
        course: this.query.feeType == "type-2" ? null : this.query.course
      };
      if (obj) {
        newObj = { ...obj, id: null };
      } else this.editIndex = 0;
      this.feeStructure.splice(i, 0, newObj);
    },
    remove(obj) {
      // console.log("observer", this.$refs.observer.flags);
      if (!obj.id) this.feeStructure.splice(this.feeStructure.indexOf(obj), 1);
      else obj.isDeleted = true;
      // only current row can be deleted, if so reset editIndex to none.
      this.editIndex = -1;
    },
    reset() {
      this.$refs.observer.reset();
      this.editIndex = -1;
      this.feeStructure = this.feeStructurePersisted.map(x => ({ ...x }));
    },
    getYears(e) {
      if (!e) {
        return [];
      }
      let duration = this.courses.find(x => x.id === e).duration.split("-");
      let years = parseInt(duration[0]);
      years = duration[1] === "Y" ? years : years / 2;

      return [{ id: "0", name: "Pre-Admission" }].concat(
        this.years.slice(0, years)
      );
    },
    setFeeStructure(fs) {
      this.feeStructure = fs.map(x => ({
        ...x,
        isDeleted: false
      }));
      // deep copy
      this.feeStructurePersisted = this.feeStructure.map(x => ({ ...x }));
      this.editIndex = -1;
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
            let {
              id,
              fsSession,
              fsCategory,
              feeType,
              course,
              year,
              feeItem,
              feeAmount,
              fromDate,
              dueDate,
              isDeleted
            } = x;
            if (feeType === "type-2") course = null;
            return {
              id,
              fsSession,
              fsCategory,
              feeType,
              course,
              year,
              feeItem,
              feeAmount,
              fromDate,
              dueDate,
              isDeleted
            };
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
            this.$apollo.queries.feeStructure.skip = true;
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
    colSpan() {
      return this.isAcademic ? 9 : 6;
    },
    years() {
      return this.$store.getters.years;
    },
    activeFeeStructure() {
      return this.feeStructure.filter(x => !x.isDeleted);
    },
    feeTypes() {
      return this.$store.getters.feeTypes;
    },
    columns() {
      if (this.query.feeType === "type-1")
        return [
          "courseName",
          "year",
          "Label",
          "feeItemName",
          "feeAmount",
          "fromDate",
          "dueDate"
        ];
      else return ["feeItemName", "feeAmount", "fromDate", "dueDate"];
    }
  },
  filters: {
    date(date) {
      try {
        let d = new Date(date);
        d.setMinutes(d.getMinutes() + -1 * d.getTimezoneOffset());
        return d
          .toISOString()
          .replace("T", " ")
          .substr(0, 10);
      } catch (e) {
        return "";
      }
    }
  }
};
</script>
