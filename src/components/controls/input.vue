
<template>
  <div class="field">
    <label class="label">
      {{ label }}
      <span class="has-text-danger" v-if="required">*</span>
    </label>
    <div :class="[{'is-loading':isLoading}, 'control'] ">
      <input
        :value="value"
        @input="handleInput"
        class="input"
        :type="type || 'text'"
        :placeholder="placeholder || 'Enter '+label"
      />
    </div>
    <p class="help is-danger">{{ errors && errors[0] }}</p>
  </div>
</template>

<script>
export default {
  name: "CInput",
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