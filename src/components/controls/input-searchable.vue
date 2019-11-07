
<template>
  <div class="field">
    <label class="label">City (Searchable)</label>
    <div class="control">
      <div class="dropdown full-width is-hoverable">
        <div class="dropdown-trigger full-width">
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="search" placeholder="Search..." />
              <!-- <span class="icon is-small is-right">
                    <i class="fas fa-search"></i>
              </span>-->
            </p>
          </div>
        </div>
        <div class="dropdown-menu full-width"  role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item ">Dropdown item</a>
            <a href="#" class="dropdown-item">Other dropdown item</a>
            <hr class="dropdown-divider" />
            <a href="#" class="dropdown-item">With a divider</a>
          </div>
        </div>
      </div>
    </div>
    <p class="help is-danger">{{ errors && errors[0] }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchableInput",
  props: {
    label: String,
    required: { type: Boolean, default: true },
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
<style scoped>
.full-width {
  width: 100%;
}
</style>