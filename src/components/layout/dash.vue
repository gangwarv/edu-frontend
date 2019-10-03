<template>
  <div>
    <Navbar/>
    <section class="section" style="padding: 15px 10px">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-2">
            <!--SideMenu-->
            <SideMenu/>
          </div>
          <div class="column">
            <div class="level" style="margin-bottom: 10px">
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
import { constants } from 'crypto';

export default {
  name: "Dash",
  components: {
    Navbar,
    SideMenu,
    Footer
  }
};
</script>
