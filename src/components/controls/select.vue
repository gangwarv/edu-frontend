
<template>
  <b-field
    :horizontal="horizontal"
    :label="label"
    :type="{ 'is-danger': hasError }"
    :message="errors && errors[0]"
  >
    <!-- <b-field> -->
    <b-select
      :size="size"
      :horizontal="horizontal"
      expanded
      :placeholder="defaultLabel || 'Select'"
      :value="value"
      @input="handleInput"
      :disabled="readonly"
    >
      <option v-if="defaultLabel" value>{{ defaultLabel }}</option>
      <option :key="i" v-for="(item, i) in items" :value="item[val] || item">{{ item[text] || item}}</option>
    </b-select>
    <!-- <slot></slot> -->
    <!-- </b-field> -->
  </b-field>
</template>

<script>
export default {
  name: "CSelect",
  props: {
    options: Array,
    label: String,
    // disabled: Boolean,
    readonly: Boolean,
    horizontal: Boolean,
    errors: Array,
    defaultLabel: {
      type: String
      // default: "Select"
    },
    value: String,
    multiple: Boolean,
    size: String
  },
  methods: {
    handleInput: function(e) {
      this.$emit("input", e);
      this.$emit("change", e);
    }
  },
  computed: {
    items: function() {
      return this.options[0];
    },
    val: function() {
      return this.options[1] || "id";
    },
    text: function() {
      return this.options[2] || this.options[1] || "name";
    },
    hasError() {
      return this.errors && this.errors.length > 0;
    }
  }
};
</script>