
<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div :class="[{ 'is-loading': isLoading }, 'control']">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Field",
  props: {
      label: String,
      isLoading: Boolean
  }
};
</script>