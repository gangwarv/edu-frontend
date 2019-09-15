<template>
  <div class="column is-full">
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-text" type="button" @click="reset">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BtnGroup",
  methods: {
    reset() {
        this.$emit('reset')
    }
  }
};
</script>