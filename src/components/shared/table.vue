<template>
  <div class="columns">
    <div class="column">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
<<<<<<< HEAD
            <td :colspan="cols.length">
              <nav class="pagination" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                    <li>search: </li>
                  <li>
                      <input class="input is-small" type="text" placeholder="Search">
                  </li>
                </ul>
                <div class="pagination-next">

                <div class="select   is-small">
                      <select>
                        <option value>5</option>
                        <option value>10</option>
                        <option value>15</option>
                      </select>
                    </div>
                </div>
=======
            <td :colspan="colspan">
              <nav class="pagination" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                  <li>
                    <div class="select is-small">
                      <select v-model="size" @change="resetPagination">
                        <option v-for="s in sizes" :key="s" :value="s">{{s}}</option>
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
                <span class="pagination-next">{{filteredList.length}}/{{data.length}}</span>
                <a class="pagination-next" @click="toCsv">csv</a>
>>>>>>> origin/HEAD
              </nav>
            </td>
          </tr>
        </thead>
        <thead class="has-background-primary has-text-white-bis">
          <tr>
<<<<<<< HEAD
            <th class="has-text-white-bis" v-for="col in cols" :key="col" @click="sort(col)">
              {{col}}
              <span
                v-if="sortBy && col==sortBy"
                style="cursor:pointer"
                class="icon has-text-white"
              >
                <i
                  :class="[{'fa-arrow-alt-circle-down': asc, 'fa-arrow-alt-circle-up': !asc},'fas']"
                ></i>
              </span>
            </th>
=======
            <th class="has-text-white-bis" v-for="col in cols" :key="col[1]" @click="sort(col[1])">
              {{col[0]}}
              <span
                v-if="sortBy && col[1]==sortBy"
                style="cursor:pointer"
                class="icon has-text-white"
              >
                <i :class="[{'fa-arrow-down': asc, 'fa-arrow-up': !asc},'fa']"></i>
              </span>
            </th>
            <th class="has-text-white-bis" v-if="buttons">Action</th>
>>>>>>> origin/HEAD
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item[0]">
<<<<<<< HEAD
            <td>{{item.id}}</td>
            <td>{{item.value}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td :colspan="cols.length">
=======
            <td v-for="col in cols" :key="col[1]">{{item[col[1]]}}</td>
            <td v-if="buttons">
              <span
                v-for="btn in buttons"
                :key="btn"
                style="cursor:pointer"
                class="icon has-text-link"
                @click="emit(btn, item)"
              >
                <i :class="[{'fa-edit': btn=='edit', 'fa-remove': btn=='remove'},'fa']"></i>
              </span>
            </td>
          </tr>
          <th class="has-text-centered" v-if="!data.length" :colspan="colspan">No data to display</th>
        </tbody>
        <tfoot>
          <tr>
            <td :colspan="colspan">
>>>>>>> origin/HEAD
              <nav class="pagination" role="navigation" aria-label="pagination">
                <a :disabled="!hasPrev" class="pagination-previous" @click="prev">Previous</a>
                <a :disabled="!hasNext" class="pagination-next" @click="next">Next page</a>
                <ul class="pagination-list">
<<<<<<< HEAD
                  <li v-for="p in pages">
=======
                  <li v-for="p in pages" :key="p">
>>>>>>> origin/HEAD
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
<<<<<<< HEAD
  data() {
    return {
      cols: ["id", "value"],
      data: [], //new Array(10).fill(1).map((x,i)=>['id-'+i,'val-'+i]),
      sortBy: "",
      size: 5,
      page: 0,
      asc: true
    };
  },
  computed: {
    list() {
      let data = this.data.map(x => x);
=======
  props: {
    cols: Array,
    data: Array,
    buttons: {
      type: Array,
      // default: []
    }
  },

  //["cols", "data"],
  data() {
    return {
      // data: [], //new Array(10).fill(1).map((x,i)=>['id-'+i,'val-'+i]),
      sortBy: "",
      sizes: [3, 5, 10],
      size: 5,
      page: 0,
      asc: true,
      searchText: "",
      //action
      // buttons: ["edit", "remove"]
    };
  },
  computed: {
    filteredList() {
      let data = this.data.map(x => x);
      if (this.searchText) {
        data = data.filter(x => this.flat(x).indexOf(this.searchText) > -1);
      }
      return data;
    },
    list() {
      let data = this.filteredList.map(x => x);
>>>>>>> origin/HEAD
      if (this.sortBy) {
        data = data.sort(this.comparer);
        if (!this.asc) data = data.reverse();
      }
      const page = +this.page;
      const size = +this.size;
      return data.slice(page * size, page * size + size);
    },
<<<<<<< HEAD
    length() {
      return this.data.length;
    },
    hasNext() {
      return this.data.length > (this.page + 1) * this.size;
=======
    hasNext() {
      return this.filteredList.length > (this.page + 1) * this.size;
>>>>>>> origin/HEAD
    },
    hasPrev() {
      return this.page > 0;
    },
    pages() {
<<<<<<< HEAD
      console.log(
        new Array(Math.ceil(this.data.length / +this.size)).map((x, i) => i + 1)
      );
      return new Array(Math.ceil(this.data.length / +this.size))
        .fill(0)
        .map((x, i) => i);
=======
      return new Array(Math.ceil(this.filteredList.length / +this.size))
        .fill(0)
        .map((x, i) => i);
    },
    colspan() {
      return this.cols.length + (this.buttons && this.buttons.length > 0 ? 1 : 0);
>>>>>>> origin/HEAD
    }
  },
  methods: {
    sort(col) {
      this.sortBy = col;
      this.asc = !this.asc;
    },
    comparer(a, b) {
      let r = 0;
      if (a[this.sortBy] > b[this.sortBy]) r = 1;
      else r = -1;
      return r;
    },
    next() {
      this.page = +this.page + 1;
    },
    prev() {
      this.page = +this.page - 1;
<<<<<<< HEAD
    }
  },
  mounted() {
    this.data = [
      { id: 3, value: "Delectus Aut autem" },
      { id: 2, value: "suscipit repellat esse quibusdam voluptatem incidunt" },
      {
        id: 1,
        value:
          "Aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit"
      },
      { id: 4, value: "Odit optio omnis qui sunt" },
      { id: 5, value: "Suscipit qui totam" },
      { id: 6, value: "Explicabo enim cumque porro aperiam occaecati minima" },
      { id: 7, value: "Inventore aut nihil minima laudantium hic qui omnis" },
      {
        id: 8,
        value:
          "Explicabo consectetur debitis voluptates quas quae culpa rerum non"
      },
      {
        id: 9,
        value: "Ex hic consequuntur earum omnis alias ut occaecati culpa"
      },
      { id: 10, value: "Ut Cupiditate sequi aliquam fuga maiores" },
      {
        id: 11,
        value: "2 explicabo enim cumque porro aperiam occaecati minima"
      },
      {
        id: 12,
        value: "2 inventore aut nihil minima laudantium hic qui omnis"
      },
      {
        id: 13,
        value:
          "2 explicabo consectetur debitis voluptates quas quae culpa rerum non"
      }
    ];
=======
    },
    flat(obj) {
      return Object.keys(obj)
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
>>>>>>> origin/HEAD
  }
};
</script>

<style scoped>
<<<<<<< HEAD
input{
    width: 200px;
    direction: ltr
=======
input {
  width: 200px;
  direction: ltr;
>>>>>>> origin/HEAD
}
</style>