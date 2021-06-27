<template>
  <div id="app">
    <h1>{{ category }}</h1>
    <div class="container">
      <div class="row cardRow">
        <div class="col" v-for="post in posts" :key="post.id">
          <div class="card border-primary" style="width: 16rem">
            <router-link :to="{ name: 'product', params: { id: post.id } }">
              <img
                v-bind:src="post.image"
                v-bind:alt="post.image"
                class="card-img-top"
                style="width:238px;height:238px;"
              />
              <label for="radio2" class="puntaje">
                ★ {{ post.totalReview }}</label
              >
            </router-link>
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <router-link :to="{ name: 'product', params: { id: post.id } }">
                <a href="#" class="btn btn-primary">${{ post.price }}</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CategorySearch",
  data() {
    return {
      posts: [],
    };
  },
  props: ["category", "category_id"],
  beforeCreate() {
    const postPath = "/api/post/list";
    axios
      .get(this.$store.state.backURL + postPath)
      .then((response) => {
        if (response.status !== 200) {
          alert("Error en la petición. Intente nuevamente");
        } else {
          let postsResponse = response.data;

          postsResponse.forEach((post) => {
            if (post.categoryId.id === this.category_id) {
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
};
</script>

<style>
.cardRow {
  margin-bottom: 1rem;
}

.card {
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
}
.card-img-top {
  position: relative;
  display: inline-block;
}
.card-img-top:hover {
  opacity: 80%;
}
.puntaje {
  position: absolute;
  font-size: 1em;
  right: 0px;
  color: yellow;
  background: rgba(0, 0, 0, 0.658);
  border-radius: 1px;
  padding-right: 4%;
  padding-left: 4%;
}
</style>
