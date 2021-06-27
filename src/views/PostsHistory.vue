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
        <PostsTable />
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
import PostsTable from "../components/Histories/PostsTable";
export default {
  components: {
    TopMenu,
    Footer,
    PostsTable,
  },
};
</script>