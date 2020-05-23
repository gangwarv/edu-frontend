<template>
  <div class="box">
    <b-collapse
      class="card"
      animation="slide"
      v-for="(collapse, index) of collapses"
      :key="collapse.title"
      :open="collapse.isOpen"
      @open="collapses[index] = {...collapse, isOpen: !collapse.isOpen }"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title">{{ collapse.title }}</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">{{ collapse.text }}</div>
      </div>
    </b-collapse>
    <b-collapse aria-id="contentIdForA11y2" class="panel" animation="slide" :open.sync="isOpened">
      <div slot="trigger" class="panel-heading" role="button" aria-controls="contentIdForA11y2">
        <strong>Title</strong>
      </div>
      <p class="panel-tabs">
        <a class="is-active">All</a>
        <a>Public</a>
        <a>Private</a>
      </p>
      <div class="panel-block">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <br />Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.
        <br />Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "Config",
  data() {
    return {
      isOpened: false,
      isOpen: 0,
      collapses: [
        {
          title: "Basic Details",
          isOpen: false,
          text: "Text 1"
        },
        {
          title: "Fee Module",
          isOpen: false,
          text: "Text 2"
        },
        {
          title: "Title 3",
          isOpen: false,
          text: "Text 3"
        }
      ]
    };
  }
};
</script>