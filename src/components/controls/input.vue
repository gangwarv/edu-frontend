
<template>
  <b-field :horizontal="horizontal" :label="label" :type="{ 'is-danger': hasError }" :message="errors && errors[0]">
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
    horizontal: Boolean,
    readonly: Boolean,
    isLoading: Boolean,
    type: String,
    value: [String, Number],
    placeholder: String,
    errors: Array
  },
  methods: {
    handleInput: function(e) {
      this.$emit("input", this.type =="number" ?  parseInt(e) : e);
    }
  },
  computed: {
    hasError() {
      return this.errors && this.errors.length > 0;
    }
  }
};
</script>