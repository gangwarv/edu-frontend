<template>
  <div class="field is-danger">
    <label class="label">
      {{ label }}
      <span class="has-text-danger" v-if="required">*</span>
    </label>
    <b-taginput
      :readonly="readonly"
      :value="value"
      :data="filteredOptions"
      autocomplete
      :loading="isLoading"
      icon="label"
      placeholder="Select"
      @typing="getFilteredOptions"
      @input="handleInput"
      :class="{'is-danger': errors && errors.length}"
    ></b-taginput>
    <p v-if="errors && errors.length" class="help is-danger">{{ errors[0] }}</p>
  </div>
</template>

<style>
.taginput.is-danger .taginput-container {
  border: 1px solid #ff3860;
}
</style>

<script>
export default {
  name: "CMultiselect",
  props: {
    label: String,
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    required: { type: Boolean, default: true },
    isLoading: Boolean,
    type: String,
    value: Array,
    maxLength: {
      type: Number,
      default: -1
    },
    placeholder: String,
    errors: Array
  },
  data() {
    return {
      filteredOptions: this.options,
      readonly: false
    };
  },
  methods: {
    handleInput(e) {
      this.readonly = e.length === this.maxLength;
      this.$emit("input", [...e]);
    },
    getFilteredOptions(searchText) {
      if (searchText) {
        this.filteredOptions = this.options.filter(x =>
          x.toLowerCase().startsWith(searchText.toLowerCase())
        );
      } else this.filteredOptions = this.options;
    }
  }
};
</script>