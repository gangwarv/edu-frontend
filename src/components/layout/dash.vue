<template>
  <div>
    <Navbar />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./navbar-buefy.vue";
// import SideMenu from "./sidemenu.vue";
import Footer from "./footer.vue";

export default {
  name: "Dash",
  components: {
    Navbar,
    // SideMenu,
    Footer
  }
};
</script>
