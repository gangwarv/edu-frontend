<template>
  <aside class="menu">
    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-small is-fullwidth">
          <select name="country">
            <option v-for="mod in modules" :key="mod">{{ mod }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button type="submit" class="button is-small is-hidden">Set Default</button>
      </div>
    </div>
    <!-- <div class="field">
      <p class="control has-icons-left">
        <input class="input" v-model="searchMenu" type="email" placeholder="Search" />
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>-->
    <template v-if="!searchMenu">
      <p class="menu-label">Recents</p>
      <ul class="menu-list">
        <li>
          <a>Dashboard</a>
        </li>
      </ul>
    </template>
    <p class="menu-label">Links</p>
    <ul class="menu-list" id="style-3">
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
  data() {
    return {
      searchMenu: "",
      searchModule: ""
    };
  },
  computed: {
    menus() {
      return this.$store.getters.leftMenus;
    },
    modules() {
      return this.$store.getters.modules;
    },
    filteredMenu() {
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
<style scoped>
.scrollable-wrapper {
  height: 250px;
  border: 2px dotted red;
}
.scrollable {
  overflow-y: auto;
}
/* .scrollable:hover {
  overflow-y: auto;
} */

#style-3::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar-thumb {
  background-color: #000000;
}
</style>