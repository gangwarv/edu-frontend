<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open.sync="open"
      :expand-on-hover="expandOnHover"
      :reduce="reduce"
    >
      <div class="p-1" style="padding: 60px 10px; ">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="ERP"
        />
        <b-menu 
      :accordion="false" :activable="false">
          <b-menu-list label="Menu">
            <b-menu-item  icon="home" :isActive="true" to="/" tag="router-link" label="Home"></b-menu-item>
            <b-menu-item icon="information-outline" to="/hello" tag="router-link" label="Hello"></b-menu-item>
            
            <b-menu-item icon="link" :key="mod.name" v-for="mod in modules">
              <template slot="label" slot-scope="props">
                {{mod.name}}
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
              <b-menu-item icon="menu-right" tag="router-link" :label="m.text" :to="m.path" :key="m.text" v-for="m in mod.menus" ></b-menu-item>
            </b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item label="Logout" icon="logout" tag="router-link" to="/login"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script>
export default {
  name:'SideBar',
  watch: {
    open: function(value) {
      this.$emit("toggle", value);
    },
    isOpen: function(value) {
      this.open = value;
    }
  },
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      expandOnHover:true,
      reduce:true
    };
  },
  computed: {
    modules() {
      return this.$store.getters.modules;
    }
  }
};
</script>

<style lang="scss" scoped>
.p-1 {
  padding: 1em;
}
</style>