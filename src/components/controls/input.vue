
<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div :class="[{'is-loading':isLoading}, 'control'] ">
      <input
        :value="value"
        @input="handleInput"
        class="input"
        :type="type || 'text'"
        :placeholder="placeholder"
      />
    </div>
    <p class="help is-danger"> {{ errors && errors[0] }}</p>
  </div>
</template>

<script>
export default {
  name: "CInput",
  props: {
      label: String,
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