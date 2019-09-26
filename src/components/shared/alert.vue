<template>
  <div v-if="value" :class="[{'is-success':title.toLowerCase()=='success', 'is-danger':title.toLowerCase()=='failed'},'notification']">
    <button class="delete" @click="close"></button>
    <strong>{{title}}</strong>
    {{message}}
  </div>
</template>
<script>
export default {
  name: "Alert",
  props: ["title", "message", "value"],
  data: function() {
    return {
      closed: false
    };
  },
  methods: {
    close() {
      this.closed = true;
      this.$emit('input', !this.value)
    }
  }
};
</script>