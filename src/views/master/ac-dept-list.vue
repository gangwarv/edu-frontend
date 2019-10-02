<template>
  <div class="box">
    <PageHeader header-text="Department List" to="/acdept" link-text="Add New" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!acdepts && !error" />
        <c-table :cols="columns" :data="acdepts" :buttons="['edit']" @remove="remove" @edit="edit" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_AC_DEPTS } from "@/graphql/ac-dept";
export default {
  name: "AcDeptList",
  data: function() {
    return {
      acdepts: [],
      columns: [
        ["Name", "name"],
        ["Active", "isActive", "boolean"]
      ],
      error: null
    };
  },
  methods: {
    remove({ id }) {
      console.log("removed", id);
    },
    edit({ id }) {
      console.log("edited", id);
      this.$router.push({ path: "acdept", query: { id } });
    }
  },
  apollo: {
    acdepts: {
      query: GET_AC_DEPTS,
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  }
};
</script>