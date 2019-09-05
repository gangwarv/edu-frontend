<template>
  <div>
    <label class="label">Message</label>
    <div :class="[{'is-grouped': isGrouped}, 'field']">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" />
          Reading
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" />
          Writing
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FieldCheck",
  props: {
      label: String,
      isGrouped: Boolean
  }
};
</script>