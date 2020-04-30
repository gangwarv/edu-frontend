
<template>
  <b-field :label="label" :type="{ 'is-danger': hasError }" :message="errors && errors[0]">
    <b-input :disabled="disabled" :readonly="readonly" :value="value" @input="handleInput"></b-input>
  </b-field>
</template>

<script>
export default {
  name: "CInput",
  props: {
    label: String,
    disabled: Boolean,
    readonly: Boolean,
    required: { type: Boolean, default: true },
    isLoading: Boolean,
    type: String,
    value: String,
    placeholder: String,
    errors: Array
  },
  methods: {
    handleInput: function(e) {
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