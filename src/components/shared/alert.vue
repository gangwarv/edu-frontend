<template>
  <div v-if="value" :class="[{'is-success': !error, 'is-danger':error},'notification']">
    <button class="delete" @click="close"></button>
    <strong>{{title | uppercase }}:</strong>
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
  computed: {
    error() {
      return this.title.toLowerCase().includes("err") || this.title.toLowerCase().includes("fail");
    }
  },
  methods: {
    close() {
      this.closed = true;
      this.$emit("input", !this.value);
    }
  }
};
</script>