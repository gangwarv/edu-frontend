<template>
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
          <router-link to="/" class="navbar-item">Home</router-link>
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
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggle() {
      let el = document.getElementById("mySidenav");
      el.classList.toggle("is-hidden");
      this.isOpen = !this.isOpen;
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
