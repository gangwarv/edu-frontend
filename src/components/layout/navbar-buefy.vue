<template>
  <div class="containeris-fluid">
    <SideMenu @toggle="toggleReceive" :isOpen="isOpen" />
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
        <b-navbar-item :key="m.text" v-for="m in menus" tag="router-link" :to="m.path">{{ m.text }}</b-navbar-item>
        <b-navbar-item tag="router-link" to="/login">Log Out</b-navbar-item>
      </template>
    </b-navbar>
    <!---->
    <section
      :class="['section', {'navbar-expanded':isOpen}]"
      style="padding:8px;transition: margin .3s;"
    >
      <!-- <div class="level" style="margin-bottom: 10px;">
        <div class="level-left">
           <nav class="breadcrumb has-bullet-separator is-centered" aria-label="breadcrumbs">
            <ul>
              <li>
                <router-link to="#" class="has-text-grey">Dashboard</router-link>
              </li>
              <li>
                <router-link to="#" class="has-text-grey">Notifications</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>-->
      <nav
        style="margin-bottom: 10px;"
        class="breadcrumb has-bullet-separator is-centered"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <router-link to="#" class="has-text-grey">Dashboard</router-link>
          </li>
          <li>
            <router-link to="#" class="has-text-grey">Notifications</router-link>
          </li>
        </ul>
      </nav>
      <transition name="fade">
        <router-view />
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

.navbar-expanded {
  margin-left: 75px;
}

.box {
  min-height: 500px;
}
.fade-enter-active {
 transition: all .3s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter  /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px);
}
</style>