
<template>
  <field :label="label">
    <div :class="[{'is-loading': isLoading}, 'select is-hovered']">
        <slot/>
    </div>
  </field>
</template>

<script>
export default {
  name: "FieldSelect",
  props: {
    label: String,
    isLoading: Boolean
  }
};
</script>