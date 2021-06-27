<template>
  <div>
    <div
      id="topMenu_div"
      class="position-sticky"
      style="position: relative; z-index: 1000"
    >
      <TopMenu />
    </div>
    <div>
        <ShoppingTable />
    </div>
    <div>
      <hr>
      <Footer />
    </div>
  </div>
</template>

<script>
import TopMenu from "../components/TopMenu.vue";
import Footer from "../components/Footer";
import ShoppingTable from "../components/Histories/ShoppingTable";
export default {
  components: {
    TopMenu,
    Footer,
    ShoppingTable,
  },
};
</script>

