
<template>
  <b-field :label="label" :type="{ 'is-danger': hasError }" :message="errors && errors[0]">
    <b-select
      expanded
      placeholder="Select"
      :value="value || null"
      @input="handleInput"
      
    >
      <option
        :selected="value==item[val] || item"
        :key="item[val] || item"
        v-for="item in items"
        :value="item[val]||item"
      >{{ item[text]||item }}</option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  name: "CSelect",
  props: {
    options: Array,
    label: String,
    required: { type: Boolean, default: true },
    errors: Array,
    defaultLabel: {
      type: String,
      default: "Select"
    },
    value: String,
    multiple: Boolean,
    size: Number
  },
  methods: {
    handleInput: function(e) {

      this.$emit("input", e);
    }
  },
  computed: {
    items: function() {
      return this.options[0];
    },
    val: function() {
      return this.options[1] || "value";
    },
    text: function() {
      return this.options[2] || this.options[1] || "text";
    },
    hasError() {
      return this.errors && this.errors.length > 0;
    }
  }
};
</script>