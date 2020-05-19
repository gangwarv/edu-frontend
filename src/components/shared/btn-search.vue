<template>
  <div class="control" 
      style="top:30px">
    <button
      :class="['button is-primary is-outlined is-pulled-right', {'is-loading': loading }]"
      :disabled="loading || disabled"
      @click="$emit('click')"
    >
      <span class="icon">
        <i class="fas fa-search"></i>
      </span>
      <span>Search</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BtnSearch",
  props: ["loading", "disabled"]
};
</script>
