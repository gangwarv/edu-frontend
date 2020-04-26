<template>
  <div>
    <b-navbar fixed-top type="is-primary">
      <template slot="brand">
        <a class="navbar-item" @click="toggle">{{ isOpen? '&#8690;' : '&#8689;' }}</a>
        <!-- <b-navbar-item to="/" tag="router-link">ERP</b-navbar-item> -->
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="ERP"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-dropdown
          position="is-bottom-left"
          area-role="menu"
          trap-focus
          paddingless
          arrowless
          boxed
          collapsible
          type="is-primary"
        >
          <template slot="label">
            <b-icon icon="bell"></b-icon>(11)
          </template>
          <Notification />
        </b-navbar-dropdown>
      </template>

      <template slot="end" class="is-primary">
        <b-navbar-item href="#">LogOut</b-navbar-item>
      </template>
    </b-navbar>
    <SideMenu @toggle="toggleReceive" :isOpen="isOpen" />
    <!---->
    <section :class="['section', {'navbar-expanded':isOpen}]" style="padding-top:7px;transition: margin .3s;">
      <div class="level" style="margin-bottom: 10px;">
        <div class="level-left">
          <div class="level-item">
            <div class="subtitle is-4 has-text-dark">{{ $route.meta.caption }}</div>
          </div>
        </div>
        <div class="level-right">
          <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
            <ul>
              <li v-for="bd in $route.meta.breadcrumbs" :key="bd">
                <router-link :to="'#'" class="has-text-grey">{{ bd }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <transition name="slide-right">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
import SideMenu from "./sidemenu.vue";
import Notification from "./notification.vue";
export default {
  name: "NavbarBuefy",
  components: { SideMenu, Notification },
  data: function() {
    return {
      isOpen: true,
      showNotification: false
    };
  },
  methods: {
    toggleReceive(value) {
      this.isOpen = value;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    toggleNotificationBar() {
      this.showNotification = !this.showNotification;
    }
  },
  computed: {
    menus() {
      return this.$store.getters.topMenus;
    }
  }
};
</script>
<style lang="scss" scoped>
.is-fixed-top {
  z-index: 1001;
}

.navbar-expanded{
  margin-left: 75px;
}

.box{
  min-height: 300px;
}
</style>