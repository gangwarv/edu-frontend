
<template>
  <div class="field">
    <label class="label">
      {{ label }}
      <span class="has-text-danger" v-if="required">*</span>
    </label>
    <div class="control">
      <div class="select is-fullwidth" :class="[{ 'is-multiple':multiple, 'is-danger': !!errors && errors.length }]">
        <select :value="value" @change="handleInput" :multiple="multiple" :size="size">
          <option :hidden="multiple" value>{{ defaultLabel }}</option>
          <option
            :selected="value==item[val] || item"
            :key="item[val] || item"
            v-for="item in items"
            :value="item[val]||item"
          >{{ item[text]||item }}</option>
        </select>
      </div>
    </div>
    <p class="help is-danger">{{ errors && errors[0] }}</p>
  </div>
</template>

<script>
export default {
  name: "CSelect",
  props: {
    options: Array,
    label: String,
    required: { type: Boolean, default: true },
    errors: Array,
    defaultLabel: {
      type: String,
      default: "Select"
    },
    value: String,
    multiple: Boolean,
    size: Number
  },
  methods: {
    handleInput: function(e) {
      this.$emit("input", e.target.value);
    }
  },
  computed: {
    items: function() {
      return this.options[0];
    },
    val: function() {
      return this.options[1] || "value";
    },
    text: function() {
      return this.options[2] || this.options[1] || "text";
    }
  }
};
</script>