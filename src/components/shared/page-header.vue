
<template>
  <!-- <div class="column is-full"> -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
          <p class="subtitle is-5">{{ headerText }}</p>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <router-link v-if="to" :to="to">{{ linkText }}</router-link>
      </div>
    </nav>
  <!-- </div> -->
</template>

<script>
export default {
  name: "PageHeader",
  props: ["headerText", "to", "linkText"]
};
</script>