<template>
  <div class="box">
    <PageHeader header-text="Department List" to="/acdept" link-text="Add New" />
    <Alert v-model="alertShow" :title="alertStatus" :message="alertMessage" />
    <div class="columns is-multiline">
      <div class="column is-full" style="overflow-x:auto">
        <Loader v-if="!acDepts && !error" />
        <c-table
          :cols="columns"
          :data="acDepts"
          :buttons="['edit','remove']"
          @remove="remove"
          @edit="edit"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_AC_DEPTS, REMOVE_AC_DEPT } from "@/graphql/ac-dept";
export default {
  name: "AcDeptList",
  data: function() {
    return {
      acDepts: [],
      columns: [["Name", "name"], ["Active", "isActive", "boolean"]],
      error: null,
      alertShow: false,
      alertStatus: "",
      alertMessage: ""
    };
  },
  methods: {
    remove({ id }) {
      if (confirm("Are you sure?")) {
        console.log("removed", id);
        this.$apollo
          .mutate({
            mutation: REMOVE_AC_DEPT,
            variables: {
              id
            },
            update: (store, { data: { deleteAcDept } }) => {
              const data = store.readQuery({ query: GET_AC_DEPTS });
              data.acDepts = data.acDepts.filter(x => x.id !== deleteAcDept.id);
              store.writeQuery({ query: GET_AC_DEPTS, data });
            }
          })
          .then(res => {
            this.alertShow = true;
            this.alertStatus = "Success";
            this.alertMessage = "Department has been deleted successfully!";
            console.log("added", res);
          })
          .catch(err => {
            console.log(err);
            this.alertShow = true;
            this.alertStatus = "Failed";
            this.alertMessage = err.networkError.result.errors[0].message;
          });
      }
    },
    edit({ id }) {
      console.log("edited", id);
      this.$router.push({ path: "acdept", query: { id } });
    }
  },
  apollo: {
    acDepts: {
      query: GET_AC_DEPTS,
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  }
};
</script>