<template>
  <div class="columns">
    <div class="column">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <td :colspan="colspan">
              <nav class="pagination" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                  <li>
                    <div class="select is-small">
                      <select v-model="pageSize" @change="resetPagination">
                        <option v-for="s in pageSizeOptions" :key="s" :value="s">{{s}}</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <input
                      class="input is-small"
                      v-model="searchText"
                      type="text"
                      placeholder="Search"
                      @input="resetPagination"
                    />
                  </li>
                </ul>
                <span class="pagination-next">{{filteredList.length}}/{{dataLength}}</span>
                <a class="pagination-next" @click="toCsv">csv</a>
              </nav>
            </td>
          </tr>
        </thead>
        <thead class="has-background-primary has-text-white-bis">
          <tr>
            <th class="has-text-white-bis" v-for="col in cols" :key="col[1]" @click="sort(col[1])">
              {{col[0]}}
              <span
                v-if="sortBy && col[1]==sortBy"
                style="cursor:pointer"
                class="icon has-text-white"
              >
                <i :class="[{'fa-sort-amount-down': asc, 'fa-sort-amount-up': !asc},'fa']"></i>
              </span>
            </th>
            <th class="has-text-white-bis" v-if="buttons">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item[0]">
            <td v-for="col in cols" :key="col[1]">
              <template v-if="!col[2]">{{item[col[1]]}}</template>
              <span v-else class="icon has-text-primary">
                <i
                  :class="[{'fa-check-circle':item[col[1]]},{'fa-times-circle':!item[col[1]]},'fa']"
                ></i>
              </span>
            </td>
            <td v-if="buttons">
              <span
                v-for="btn in buttons"
                :key="btn"
                style="cursor:pointer"
                class="icon has-text-link"
                @click="emit(btn, item)"
              >
                <i :class="[{'fa-edit': btn=='edit', 'fa-trash': btn=='remove'},'fa']"></i>
              </span>
            </td>
          </tr>
          <th
            class="has-text-centered"
            v-if="!dataLength"
            :colspan="colspan"
          >{{ loading ?'Loading...':'No Records to display.' }}</th>
        </tbody>
        <tfoot>
          <tr>
            <td :colspan="colspan">
              <nav class="pagination" role="navigation" aria-label="pagination">
                <a :disabled="!hasPrev" class="pagination-previous" @click="prev">Previous</a>
                <a :disabled="!hasNext" class="pagination-next" @click="next">Next page</a>
                <ul class="pagination-list">
                  <li v-for="p in pages" :key="p">
                    <a
                      :class="[{'is-current': p==page },'pagination-link']"
                      aria-label="Page 1"
                      aria-current="page"
                      @click="page=p"
                    >{{p+1}}</a>
                  </li>
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CTable",
  props: {
    cols: Array,
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    buttons: {
      type: Array
    },
    pageSizeOptions: {
      type: Array,
      default: function() {
        return [3, 5, 10];
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sortBy: "",
      page: 0,
      pageSize: 10,
      asc: true,
      searchText: ""
    };
  },
  computed: {
    filteredList() {
      let data = [];
      if (this.dataLength > 0) {
        data = this.data.map(x => x);
      }
      if (this.searchText && this.searchText.trim()) {
        data = data.filter(x => this.flat(x).indexOf(this.searchText.trim().toLowerCase()) > -1);
      }
      return data;
    },
    list() {
      let data = this.filteredList.map(x => x);
      if (this.sortBy) {
        data = data.sort(this.comparer);
        if (!this.asc) data = data.reverse();
      }
      const page = +this.page;
      const pageSize = +this.pageSize;
      return data.slice(page * pageSize, page * pageSize + pageSize);
    },
    hasNext() {
      return this.filteredList.length > (this.page + 1) * this.pageSize;
    },
    hasPrev() {
      return this.page > 0;
    },
    pages() {
      return new Array(Math.ceil(this.filteredList.length / +this.pageSize))
        .fill(0)
        .map((x, i) => i);
    },
    colspan() {
      return (
        this.cols.length + (this.buttons && this.buttons.length > 0 ? 1 : 0)
      );
    },
    dataLength() {
      if (this.data && this.data.length > 0) {
        return this.data.length;
      }
      return 0;
    }
  },
  methods: {
    sort(col) {
      this.sortBy = col;
      this.asc = !this.asc;
      this.page = 0;
    },
    comparer(a, b) {
      let r = 0;
      if (a[this.sortBy] > b[this.sortBy]) r = 1;
      else r = -1;
      return r;
    },
    next() {
      const maxPages = Math.ceil(this.filteredList.length / +this.pageSize);
      if (this.page + 1 < maxPages) this.page = +this.page + 1;
    },
    prev() {
      if (this.page > 0) this.page = +this.page - 1;
    },
    flat(obj) {
      return this.cols
        .map(c => c[1] || c[0])
        .reduce((ac, s) => {
          ac.push(obj[s]);
          return ac;
        }, [])
        .toString()
        .toLowerCase();
    },
    resetPagination() {
      this.page = 0;
    },
    emit(type, args) {
      // console.log(type)
      this.$emit(type, args);
    },
    toCsv() {
      console.log("csv generated");
    }
  }
};
</script>

<style scoped>
input {
  width: 200px;
  direction: ltr;
}
</style>