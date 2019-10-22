<template>
  <div>
    <nav class="level" style="margin-bottom: 2px">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5"></p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item is-5">module</div>
        <div class="level-item">
          <div class="field has-addons" style="width: 300px; margin-right: 0">
            <div class="control is-expanded">
              <div class="select is-fullwidth is-small">
                <select name="country">
                  <option v-for="mod in modules" :key="mod">{{ mod }}</option>
                </select>
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-small">Set Default</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!---->
    <!--Nav-->
    <nav class="navbar is-primary">
      <div class="container is-fluid">
        <div class="navbar-brand">
          <a class="is-hidden-mobile navbar-item" @click="toggle">&#9776;</a>
          <router-link
            class="navbar-item is-active"
            to="/"
            style="font-weight:bold;"
          >ERP {{ refresh }}</router-link>
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
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    toggle() {
      let el = document.getElementById("mySidenav");
      el.classList.toggle("is-hidden");
    }
  },
  computed: {
    menus() {
      return this.$store.getters.menus;
    },
    modules() {
      return this.$store.getters.modules;
    }
  },
  mounted: function() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector("#" + burger.dataset.target);
    burger.addEventListener("click", function() {
      burger.classList.toggle("is-active");
      nav.classList.toggle("is-active");
    });
  }
};
</script>

<style>
</style>
