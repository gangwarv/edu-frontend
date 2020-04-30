<template>
  <div class="box">
    <PageHeader header-text="Session List" to="/session" link-text="Add New" />
    <c-table
      :loading="$apollo.queries.sessions.loading"
      :columns="columns"
      :data="sessions"
      :buttons="['edit']"
      @edit="edit"
    />
  </div>
</template>

<script>
import { GET_ALL_SESSIONS } from "@/graphql/session";

export default {
  name: "SessionList",
  data: function() {
    return {
      columns: ["id", "name", "year"],
      error: null
    };
  },
  methods: {
    edit({ id }) {
      this.$router.push({ path: "session", query: { id } });
    }
  },
  apollo: {
    sessions: GET_ALL_SESSIONS
  }
};
</script>