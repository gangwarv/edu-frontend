<template>
  <div class="control">
    <button class="button is-primary is-relative is-outlined is-pulled-right" @click="$emit('click')" style="top:30px">
      <span class="icon">
        <i class="fas fa-search"></i>
      </span>
      <span>Search</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BtnSearch"
};
</script>
