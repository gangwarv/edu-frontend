
<template>
  <b-field :label="label" :type="{ 'is-danger': hasError }" :message="errors && errors[0]">
    <b-input :size="size" :type="type" :placeholder="placeholder" :readonly="readonly" :value="value" @input="handleInput"></b-input>
  </b-field>
</template>

<script>
export default {
  name: "CInput",
  props: {
    label: String,
    size: String,
    // disabledc: Boolean,
    readonly: Boolean,
    isLoading: Boolean,
    type: String,
    value: [String, Number],
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