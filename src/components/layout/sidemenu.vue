<template>
  <aside class="menu">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" v-model="searchMenu" type="email" placeholder="Search" />
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>
    <template v-if="!searchMenu">
      <p class="menu-label">Recents</p>
      <ul class="menu-list">
        <li>
          <a>Dashboard</a>
        </li>
      </ul>
    </template>
    <p class="menu-label">Links</p>
    <ul class="menu-list">
      <router-link to="/">Home</router-link>
      <template v-for="menu in filteredMenu">
        <li :key="menu.text" v-if="!menu.subMenus">
          <router-link :to="menu.path">{{ menu.text }}</router-link>
        </li>
        <li v-else :key="menu.text">
          <a class="has-text-grey-light">{{menu.text}}</a>
          <ul>
            <li :key="subMenu.text" v-for="subMenu in menu.subMenus">
              <router-link :to="subMenu.path">{{ subMenu.text }}</router-link>
            </li>
          </ul>
        </li>
      </template>
      <router-link to="/login">Sign Out</router-link>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "SideMenu",
  data: function() {
    return {
      searchMenu: ""
    };
  },
  computed: {
    menus(){
      return this.$store.getters.menus
    },
    filteredMenu: function() {
      const filtered = this.menus.filter(menu => {
        if (!this.searchMenu) {
          return true;
        }
        return (
          menu.text.toLowerCase().startsWith(this.searchMenu) ||
          (menu.subMenus &&
            menu.subMenus.some(smenu =>
              smenu.text.toLowerCase().startsWith(this.searchMenu)
            ))
        );
      });
      return filtered;
    }
  }
};
</script>