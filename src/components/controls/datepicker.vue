
<template>
  <div class="field">
    <label class="label">
      {{ label }}
      <span class="has-text-danger" v-if="required">*</span>
    </label>
      <b-datepicker
        :value="value && new Date(value)"
        :min-date="minDate"
        :max-date="maxDate"
        :placeholder="placeholder"
        @input="handleInput"
        icon="calendar-today"
        :class="{'is-danger': errors && errors.length}"
      >
        <button class="button is-text" @click="$emit('input', null)">
          <b-icon icon="close"></b-icon>
        </button>
      </b-datepicker>
    
    <p v-if="errors && errors.length" class="help is-danger">{{ errors[0] }}</p>
  </div>
</template>
<style>
.datepicker.is-danger input {
  border: 1px solid #ff3860;
}
</style>
<script>
export default {
  name: "CDatepicker",
  props: {
    label: String,
    required: { type: Boolean, default: true },
    value: Date | String,
    minDate: Date | String,
    maxDate: Date | String,
    placeholder: String,
    errors: Array
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    }
  }
};
</script>