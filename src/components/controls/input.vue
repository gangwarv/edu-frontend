
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
  },
  methods: {
    handleInput: function(e) {
      console.log(e)
      this.$emit("input", e.target.value);
    }
  }
};
</script>