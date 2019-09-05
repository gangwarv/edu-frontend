
<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="field">
      <input
        class="is-checkradio"
        type="checkbox"
        :id="id"
        :checked="value" @change="handleInput"
      />
      <label :for="id">{{ text }}</label>
    </div>
    <!-- <input type="checkbox" :checked="value" @change="handleInput" /> -->
  </div>
</template>

<script>
export default {
  name: "CCheck",
  props: {
    label: String,
    value: Boolean,
    id: String,
    text:{
        type: String,
        default: 'Yes/No'
    }
  },
  methods: {
    handleInput: function(e) {
      //   console.log(e)
      this.$emit("input", e.target.checked);
    }
  }
};
</script>