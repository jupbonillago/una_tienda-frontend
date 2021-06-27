<template>
  <div>
      <h1 class="tusPostTitulo my-4 ml-5 mb-5">Tus posts creados</h1>
      <b-container class=" tusPostsInfo col-xs-12 col-sm-12 col-md-12 col-lg-8 border border-light rounded-lg">
        <div class="col" v-for="post in postsCreated" :key="post.id">
          <div class="card mb-2" style="width: auto">
            <div class="row no-gutters">
              <div class="col-sm-5">
                <router-link :to="{ name: 'product', params: { id: post.id } }">
                    <img
                    class="imagenCarta card-img mt-2"
                    v-bind:src="post.image"
                    v-bind:alt="post.image"
                    
                    
                    />
                </router-link>
              </div>
              <div class="col-sm-7">
                <div class="card-body">
                  <h5 class="card-title mb-5">Titulo del post : {{ post.title }}</h5>
                  <p class="card-text">
                    Producto : {{ post.productName }}<br />
                    Cantidad : {{ post.stock }}<br />
                    Precio por unidad : {{ post.price }}<br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import {getAuthenticationToken} from '@/dataStorage';


  const path = '/api/post/my-posts';

  export default {
    name: "PostsTable.vue",
    data() {
    return {
      postsCreated: [],
    };
  },
  beforeCreate() {
    axios
      .get(this.$store.state.backURL + path + "?access_token=" + getAuthenticationToken(), {
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("Error en la petición. Intente nuevamente");
        } else {
          let postsResponse = response.data;
          postsResponse.forEach((post) => {
            this.postsCreated.push(post);
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
.tusPostsInfo {
  justify-content: center;
  background-color: rgb(247, 247, 247);
  min-height: 60vh;

}
.imagenCarta{
  max-height: 238px;
  max-width: 238px;
  size:auto;
}


</style>