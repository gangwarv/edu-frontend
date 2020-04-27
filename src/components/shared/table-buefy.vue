<template>
  <div class="columns is-multiline is-gapless" style="overflow-x:auto">
    <div class="column is-full columns is-mobile">
      <div class="column is-two-quarters-mobile">
        <div class>
          <div class="field has-addons">
            <p class="control select" v-if="isPaginated">
              <!-- <select>
                <option v-for="s in [1,2,3]" :key="s">{{s}}</option>
              </select>-->
            </p>
            <p class="control has-icons-left">
              <input class="input" v-model="searchText" type="text" placeholder="Search" />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="column is-one-quarters-mobile" v-if="actions.length">
        <b-dropdown
          aria-role="list"
          :mobile-modal="false"
          class="is-pulled-right"
          position="is-bottom-left"
        >
          <button class="button" slot="trigger" slot-scope="{ active }">
            <span>Action</span>
            <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
          </button>

          <b-dropdown-item
            :key="action"
            v-for="action in actions"
            @click="$emit('change', action.toLowerCase())"
            aria-role="listitem"
          >{{ action }}</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="column" >
      <Loader v-if="loading && data == null" />
      <b-table
        v-else
        :data="filteredData"
        aria-page-label="Page"
        aria-current-label="Current page"
        :paginated="isPaginated"
        :per-page="perPage"
        :checkable="!!actions.length"
        :checkbox-position="checkboxPosition"
        :checked-rows.sync="checkedRows"
        :sticky-header="stickyHeaders"
        :mobile-cards="false"
        :loading="false"
        narrowed
      >
        <template slot-scope="props">
          <!-- add auto type checking of number field if needed in future-->
          <b-table-column
            :key="col.field"
            v-for="col in cols"
            :field="col.field"
            :label="col.label"
            :numeric="col.numeric"
            sortable
          >
            <span :class="['tag is-light', {'is-success': props.row[col.field], 'is-danger': !props.row[col.field]}]"
              v-if="typeof props.row[col.field] === 'boolean' "
            >{{ props.row[col.field] | boolean }}</span>
            <span class="tag is-light"
              v-else-if="col.field.endsWith('At')"
            >{{ props.row[col.field] | date }}</span>
            <span v-else>{{ props.row[col.field] }}</span>
          </b-table-column>

          <b-table-column label="Action">
            <span
              v-for="btn in buttons"
              :key="btn"
              style="cursor:pointer"
              class="icon has-text-link"
              @click="$emit(btn, props.row)"
            >
              <i :class="[{'fa-edit': btn=='edit', 'fa-trash': btn=='remove'},'fa']"></i>
            </span>
          </b-table-column>
        </template>

        <template slot="bottom-left">
          <b>Total checked</b>
          : {{ checkedRows.length }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CTable",
  props: {
    data: {
      type: Array
    },
    columns: Array,
    loading: Boolean,
    actions: {
      type: Array,
      default() {
        return [];
      }
    },
    buttons: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    filteredData() {
      if (this.data == null) return [];
      return this.data.filter(
        x =>
          !this.searchText ||
          //   Object.keys(x)
          this.cols
            .map(col => col.field)
            .reduce((txt, k) => (txt += "," + x[k]), "")
            .toLowerCase()
            .indexOf(this.searchText.trim().toLowerCase()) > -1
      );
    },
    cols() {
      if (this.columns)
        return this.columns.map(x => {
          let c = {
            field: x
          };
          if (typeof x == "object") {
            c = { ...x };
          }
          return {
            ...c,
            sortable: true,
            label: c.label == undefined ? this.getHeaderName(c.field) : c.label
          };
        });

      if (!this.data || !this.data.length) return [];

      let d = this.data[0];
      return Object.keys(d)
        .filter(k => k !== "__typename")
        .map(k => {
          return {
            field: k,
            label: this.getHeaderName(k),
            sortable: true,
            // width: k === "id" ? "30px" : undefined,
            numeric: typeof d[k] === "number" ? true : undefined
          };
        });
    }
  },
  data() {
    return {
      searchText: "",
      stickyHeaders: true,
      isPaginated: false,
      checkboxPosition: "right",
      checkedRows: [],
      perPage: 5
    };
  },
  methods: {
    getHeaderName(k) {
      return (
        k[0].toUpperCase() +
        k
          .slice(1)
          .split("")
          .map(x => (x === x.toUpperCase() ? " " + x : x))
          .join("")
      );
    }
  }
};
</script>
<style >
.b-table .table-wrapper.has-sticky-header {
  max-height: 500px !important;
  height: unset;
}
</style>