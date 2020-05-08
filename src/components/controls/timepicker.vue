
<template>
  <div class="field">
    <label class="label">
      {{ label }}
      <span class="has-text-danger" v-if="required">*</span>
    </label>
      <b-timepicker
        :value="value && new Date(value)"
        :min-time="minTime"
        :max-time="maxTime"
        :placeholder="placeholder"
        @input="handleInput"
        icon="clock"
        :class="{'is-danger': errors && errors.length}"
      >
        <button class="button is-text" @click="$emit('input', null)">
          <b-icon icon="close"></b-icon>
        </button>
      </b-timepicker>
    
    <p v-if="errors && errors.length" class="help is-danger">{{ errors[0] }}</p>
  </div>
</template>
<style>
.timepicker.is-danger input {
  border: 1px solid #ff3860;
}
</style>
<script>
export default {
  name: "CTimepicker",
  props: {
    label: String,
    required: { type: Boolean, default: true },
    value: Date,
    minTime: Date,
    maxTime: Date,
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