<template>
  <div>
    <Navbar :menus="menus" />
    <section class="section" style="padding: 20px 20px">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-2">
            <!--SideMenu-->
            <SideMenu :menus="menus" />
          </div>
          <div class="column">
            <div class="level" >
              <div class="level-left">
                <div class="level-item">
                  <div class="title is-3">{{ $route.meta.caption }}</div>
                </div>
              </div>
              <div class="level-right">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li v-for="bd in $route.meta.breadcrumbs" :key="bd.text" :class="{'is-active':!bd.path}">
                      <router-link :to="bd.path || '#'">{{ bd.text }}</router-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <transition name="slide-right">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./navbar.vue";
import SideMenu from "./sidemenu.vue";
import Footer from "./footer.vue";

export default {
  name: "Dash",
  components: {
    Navbar,
    SideMenu,
    Footer
  },
  data: function() {
    // console.log('data', this.$route)
    return {
      menus: [
        {
          text: "Hello",
          path: "/hello",
          module: "Home"
        },
        {
          text: "Profile",
          path: "/profile",
          module: "My Account"
        }
      ]
    };
  }
};
</script>
