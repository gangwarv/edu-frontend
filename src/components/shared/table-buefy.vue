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
              <input class="input is-small" v-model="searchText" type="text" placeholder="Search" />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="column is-one-quarters-mobile" v-if="actionParsed.length">
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
            :key="action.text"
            v-for="action in actionParsed"
            @click="actionPerformed(action.eventName)"
            aria-role="listitem"
          >{{ action.text }}</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="column">
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
            <span
              :class="['tag is-light', {'is-success': props.row[col.field], 'is-danger': !props.row[col.field]}]"
              v-if="typeof props.row[col.field] === 'boolean' "
            >{{ props.row[col.field] | boolean }}</span>
            <span
              class="tag is-light"
              v-else-if="props.row[col.field] && (col.field.endsWith('At') || col.field.endsWith('Date'))"
            >{{ props.row[col.field] | date }}</span>
            <span v-else>{{ props.row[col.field] }}</span>
          </b-table-column>

          <b-table-column label="Action" v-if="buttons.length">
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
        <template slot="empty">
          <b-message
            title="No Records"
            type="is-primary"
            :closable="false"
          >Sorry! No data to display.</b-message>
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
    },
    actionParsed() {
      if (!this.actions) return [];
      return this.actions.map(x => {
        if (typeof x == "string") return { text: x, eventName: x };

        return x;
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
    },
    actionPerformed(action) {
      if (!this.checkedRows.length) alert("Please select one or more rows.");
      else
        this.$emit("change", {
          type: action.toLowerCase(),
          data: this.checkedRows,
          count: this.checkedRows.length === this.data.length ? -1 : this.checkedRows.length
        });
    }
  },
  filters: {
    boolean(value) {
      return value ? "YES" : "NO";
    },
    date(date) {
      try {
        let d = new Date(date);
        d.setMinutes(d.getMinutes() + -1 * d.getTimezoneOffset());
        return d
          .toISOString()
          .replace("T", " ")
          .substr(0, 19);
      } catch (e) {
        return "";
      }
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