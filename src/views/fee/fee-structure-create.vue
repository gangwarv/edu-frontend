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
        <div class="column is-3">{{ query.fsSession }}</div>
        <div class="column is-3">
          <strong>Category:</strong>
        </div>
        <div class="column is-3">{{ query.fsCategory }}</div>
      </div>
      <ValidationObserver v-slot="{ passes }" ref="observer">
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
              <!-- All fee is not Academic by default optional (true) -->
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
      </ValidationObserver>
    </div>
    <!-- <hr />

    <div class="table-container">
      <table class="table is-fullwidth" v-if="!$apollo.loading">
        <tr>
          <th>Year</th>
          <th>Even/Odd</th>
          <th>FeeItem</th>
          <th>Amount</th>
          <th>FromDate</th>
          <th>DueDate</th>
          <th>isOptional</th>
        </tr>
        <tr>
          <td></td>
          <td>
             <c-select
              size="is-small"
              :options="[[{id:'',name:'Yearly'},{id:'odd',name:'Odd'},{id:'even',name:'Even'}], 'id', 'name']"
            ></c-select>
            <b-field>
               <b-radio-button
                size="is-small"
                v-model="oddEven"
                native-value
                type="is-light is-success"
              >
                <b-icon icon="circle" pack="fa"></b-icon>
                <span>Yearly</span>
              </b-radio-button>
              <b-radio-button
                size="is-small"
                v-model="oddEven"
                native-value="Odd"
                type="is-link is-light"
              >
                <b-icon icon="adjust" pack="fa"></b-icon>
                <span>Odd</span>
              </b-radio-button>
              <b-radio-button
                size="is-small"
                v-model="oddEven"
                native-value="Even"
                type="is-link is-light"
              >
                <b-icon icon="adjust" custom-class="fa-flip-horizontal" pack="fa"></b-icon>
                <span>Even</span>
              </b-radio-button>
            </b-field>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div style="height:360px"></div>
    </div>-->

    <c-table
      :loading="$apollo.queries.feeStructure.loading"
      :columns="columns"
      :data="feeStructure"
      :buttons="['edit', 'remove']"
    />
  </div>
</template>

<script>
import { GET_ALL_FEEITEMS, GET_FEESTRUCTURE } from "@/graphql/fee";
import { GET_COURSES } from "@/graphql/shared";

export default {
  name: "FeeStructCreate",
  data: function() {
    const { fsSession, fsCategory } = this.$route.query;
    let feeTypes = ["academic", "non-academic", "other"];
    return {
      query: { fsSession, fsCategory, feeType: feeTypes[2] },
      obj: {
        id: null,
        feeType: null,
        fsCategory,
        fsSession,
        course: null,
        feeAmount: null,
        feeItem: null,
        feeDate: new Date(),
        dueDate: new Date(),
        isOptional: false,
        label: null,
        year: null
      },
      columns: ["id", "course", "feeItem", "year"],
      // feeTypes: ["academic", "non-academic", "other"],
      years: [],
      error: null
    };
  },
  methods: {
    courseChange(e) {
      if (!e) {
        this.years = [];
        return;
      }
      let duration = this.courses.find(x => x.id === e).duration.split("-");
      let years = parseInt(duration[0]);
      years = duration[1] === "Y" ? years : years / 2;
      years = new Array(years)
        .fill(0)
        .map((x, id) => ({ id: (id + 1).toString(), name: `${id + 1}-Year` }));
      this.years = years;
    },
    edit() {},
    onAddOrUpdate() {},
    reset() {}
    // onSearch() {
    //   console.log("search");
    // },
    // typeChange(type) {
    //   console.log(type);
    //   if (type === "non-academic") {
    //     this.obj.course = null;
    //     this.obj.year = null;
    //     this.years = [];
    //   }
    // }
  },
  apollo: {
    feeStructure: {
      query: GET_FEESTRUCTURE,
      variables() {
        return { ...this.$route.query };
      }
    },
    feeItems: GET_ALL_FEEITEMS,
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
    }
  }
};
</script>

