
<template>
  <div class="field">
    <b-field :label="label || 'Enter Date'">
      <b-datepicker :placeholder="placeholder" icon="calendar-today" editable></b-datepicker>
    </b-field>
    <p style="margin-top: -8px;" class="help is-danger">{{ errors && errors[0] }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchableInput",
  props: {
    label: String,
    required: { type: Boolean, default: true },
    isLoading: Boolean,
    type: String,
    value: String,
    placeholder: String,
    errors: Array
  },
  methods: {
    handleInput: function(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
<style scoped>
.full-width {
  width: 100%;
}
</style>