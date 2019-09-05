<template>
  <div class="columns is-multiline box">
    <div class="column is-full">
      <h2 class="subtitle">Course Details</h2>
    </div>
    <div class="column is-3">
      <c-input v-model="courseName" label="Field Name" type="text" />
    </div>
    <div class="column is-3">
      <c-select label="Field Name" v-model="id" :options="[numbers, 'value', 'text']"></c-select>
    </div>
    <div class="column is-3">
      <c-check v-model="active" id="s" label="Active" indeterminate />
    </div>
  </div>
</template>

<script>
export default {
  name: "Course",
  data: function() {
    return {
      courseName: "kk",
      id: "1",
      active: true,
      numbers: [
        { text: "Zero", value: "0" },
        { text: "One", value: "1" },
        { text: "Two", value: "2" }
      ]
    };
  }
};
</script>