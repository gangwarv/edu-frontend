
<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select :value="value" @input="handleInput">
          <option value>Select</option>
          <option :key="item[text]" v-for="item in items" :value="item[val]" >{{ item[text] }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CSelect",
  props: ["name", "options", "label", "type", "value", "placeholder"],
  methods: {
    handleInput: function(e) {
      this.$emit("input", e.target.value);
    }
  },
  computed: {
    items: function() {
        return this.options[0];
    },
    text: function() {
        return this.options[2];
    },
    val: function() {
        return this.options[1];
    }
  }
};
</script>