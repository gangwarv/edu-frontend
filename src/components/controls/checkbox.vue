
<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="field">
      <b-checkbox :value="value" @input.native="handleInput">{{ value ? 'Yes': 'No' }}</b-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "CCheck",
  props: {
    label: String,
    value: Boolean
  },
  methods: {
    handleInput: function(e) {
      this.$emit("input", e.target.checked);
    }
  }
};
</script>