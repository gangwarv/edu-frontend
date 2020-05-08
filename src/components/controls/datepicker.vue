
<template>
  <b-field :label="label" :type="{ 'is-danger': hasError }" :message="errors && errors[0]">
    <b-datepicker
      :size="size"
      :value="value"
      :min-date="minDate"
      :max-date="maxDate"
      :placeholder="placeholder"
      @input="handleInput"
      icon="calendar-today"
    >
      <button class="button is-text" @click="$emit('input', null)">
        <b-icon icon="close"></b-icon>
      </button>
    </b-datepicker>
  </b-field>
</template>
<style>
/* .datepicker.is-danger input {
  border: 1px solid #ff3860;
} */
</style>
<script>
export default {
  name: "CDatepicker",
  props: {
    label: String,
    size: String,
    // required: { type: Boolean, default: true },
    value: Date,
    minDate: Date,
    maxDate: Date,
    placeholder: String,
    errors: Array
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    }
  },
  computed: {
    hasError() {
      return this.errors && this.errors.length > 0;
    }
  }
};
</script>