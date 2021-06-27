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
        <SalesTable />
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
import SalesTable from "../components/Histories/SalesTable";
export default {
  components: {
    TopMenu,
    Footer,
    SalesTable,
  },
};
</script>
