<template>
  <div style="margin-top: 20px">
    <h3>Productos recomendados</h3>
    <div v-for="post in posts" v-bind:key="post" class="col-12">
      <RecommendedItem v-bind:post="post"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RecommendedItem from "@/components/product/RecommendedItem";

export default {
name: "RecommendedItemList",
  components: {RecommendedItem},
  data() {
    return {
      posts: [],
    };
  },
  props: ["product"],
  beforeCreate() {

    const postPath = "/api/post/list";
    let counter = 0;
    axios
        .get(this.$store.state.backURL + postPath)
        .then((response) => {
          if (response.status !== 200) {
            alert("Error en la petición. Intente nuevamente");
          } else {
            let postsResponse = response.data;

            postsResponse.forEach((post) => {
              console.log(this.product.id);
              if (post.categoryId.id === this.product.category_id && post.id !== this.product.id && counter <= 3 ) {
                counter++;
                this.posts.push(post);
              }
            });
          }
        })
        .catch((response) => {
          console.log(response.status);
          alert("No es posible conectar con el backend en este momento");
        });
  },
}
</script>

<style scoped>

</style>