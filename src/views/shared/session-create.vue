<template>
  <ValidationObserver class="box" v-slot="{ passes }" ref="observer">
    <form @submit.prevent="passes(onSubmit)">
      <PageHeader header-text="Session Create/Edit" to="/sessions" link-text="Session List" />
      <Loader v-if="$apollo.queries.session.loading" />
      <div class="columns is-multiline" v-else>
        <div class="column is-3">
          <c-input :value="name" label="Name" readonly type="text" />
        </div>
        <div class="column is-3">
          <ValidationProvider name="year" rules="required|min_value:2000" v-slot="{errors}">
            <b-field
              label="Quantity"
              :type="{'is-danger': errors && errors.length > 0}"
              :message="(errors && errors.length > 0) ? errors[0].toString() : ''"
            >
              <b-numberinput min="2000" v-model="obj.year"></b-numberinput>
            </b-field>
          </ValidationProvider>
        </div>
        <div class="column is-9"></div>
        <BtnGroup :loading="loading" :submit-disabled="$route.query.id" @reset="reset" />
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { GET_SESSION_BY_ID, UPSERT_SESSION } from "@/graphql/shared";

export default {
  name: "Session",
  data: function() {
    return {
      obj: {
        year: new Date().getFullYear()
      },
      loading: false
    };
  },
  computed: {
    name() {
      return this.obj.year + "-" + (this.obj.year + 1 - 2000);
    }
  },
  methods: {
    onSubmit() {
      this.$mutate({
        mutation: UPSERT_SESSION,
        variables: {
          ...this.obj,
          id: this.name
        }
      });
    },
    reset: function() {
      if (this.$route.query.id) {
        return this.$router.push("/sessions");
      }
      //   this.$clear(this.obj);
      this.$refs.observer.reset();
      this.obj.year = new Date().getFullYear();
    }
  },
  apollo: {
    session: {
      query: GET_SESSION_BY_ID,
      manual: true,
      result({ data, loading }) {
        if (!loading) this.obj = { ...data.session };
      },
      variables() {
        return {
          id: this.$route.query.id
        };
      },
      skip() {
        return !this.$route.query.id;
      }
    }
  }
};
</script>