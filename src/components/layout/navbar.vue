<template>
  <div>
    <!--Nav-->
    <nav class="navbar is-primary is-fixed-top">
      <div class="container is-fluid">
        <div class="navbar-brand">
          <a class="navbar-item" @click="toggle">{{ isOpen? '&#8690;' : '&#8689;' }}</a>
          <router-link class="navbar-item is-active" to="/" style="font-weight:bold;">ERP</router-link>
          <span class="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-end">
            <div
              @click="toggleNotificationBar"
              :class="['navbar-item has-dropdown is-hoverables', {'is-active': showNotification}]"
            >
              <a class="navbar-link">
                <span class="icon">
                  <i class="fas fa-bell"></i>
                </span>
                <span>(0)</span>
              </a>
              <div class="navbar-dropdown" style="width:250px">
                <div class="dropdown-item">
                  <article class="message is-small">
                    <div class="message-body">
                      <strong>Pellentesque</strong>vehicula et sem eget, facilisis sodales sem.
                    </div>
                  </article>
                  <article class="message is-dark is-small">
                    <div class="message-body">
                      <strong>Pellentesque risus mi</strong>dui urna, vehicula et sem eget, facilisis sodales sem.
                    </div>
                  </article>
                </div>
                <hr class="dropdown-divider" />
                <div class="dropdown-item">
                  <p>
                    You simply need to use a
                    <code>&lt;div&gt;</code> instead.
                  </p>
                </div>
                <hr class="dropdown-divider" />
                <div class="dropdown-item">
                  <p>
                    You simply need to use a
                    <code>&lt;div&gt;</code> instead.
                  </p>
                </div>
                <hr class="dropdown-divider" />
                <a href="#" class="dropdown-item is-primary">This is a link</a>
                <a href="#" class="navbar-item">This is a link</a>
              </div>
            </div>
            <!---->
            <!-- <router-link to="/" class="navbar-item">Home</router-link> -->
            <template v-for="m in menus">
              <router-link
                v-if="!m.subMenus"
                activeClass="act"
                v-bind:key="m.text"
                :to="m.path"
                class="navbar-item"
              >{{ m.text }}</router-link>
              <div v-else v-bind:key="m.text" class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">{{ m.text }}</a>
                <div class="navbar-dropdown">
                  <router-link
                    v-for="subMenu in m.subMenus"
                    :key="subMenu.text"
                    :to="subMenu.path"
                    class="navbar-item"
                  >{{subMenu.text}}</router-link>
                </div>
              </div>
            </template>
            <router-link to="/login" class="navbar-item">Sign Out</router-link>
            <!---->
          </div>
        </div>
      </div>
    </nav>
    <SideMenu @toggle="toggleReceive" :isOpen="isOpen" />
  </div>
</template>

<script>
import SideMenu from "./sidemenu.vue";
export default {
  name: "Navbar",
  components: { SideMenu },
  data: function() {
    return {
      isOpen: true,
      showNotification: false
    };
  },
  methods: {
    toggleReceive(value) {
      // let el = document.getElementById("mySidenav");
      // if (el) {
      //   el.classList.toggle("is-hidden");
      //   this.isOpen = !this.isOpen;
      // }
        this.isOpen = value;
    },toggle() {
      // let el = document.getElementById("mySidenav");
      // if (el) {
      //   el.classList.toggle("is-hidden");
      //   this.isOpen = !this.isOpen;
      // }
        this.isOpen = !this.isOpen;
    },
    toggleNotificationBar() {
      this.showNotification = !this.showNotification;
    }
  },
  computed: {
    menus() {
      return this.$store.getters.topMenus;
    },
    modules() {
      return this.$store.getters.modules;
    }
  },
  mounted() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector("#" + burger.dataset.target);
    burger.addEventListener("click", function() {
      burger.classList.toggle("is-active");
      nav.classList.toggle("is-active");
    });
  }
};
</script>
<style lang="scss" scoped>
.is-fixed-top {
  z-index: 1000;
}
/* for b-dropdown */
// .navbar-item.is-primary:hover {
//   background-color: #7a4468;
// }
/* for bulma dropdown to hide default arrow */
a.navbar-link:after {
  content: none;
}
/* for bulma dropdown to prevent autoopen in mobile screen */
.navbar-item {
  &.has-dropdown {
    .navbar-dropdown {
      display: none;
    }
    &.is-active {
      .navbar-dropdown {
        display: block;
      }
    }
  }
}
</style>