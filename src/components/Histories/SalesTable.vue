<template>
  <div>
      <h1 class="tusVentasTitulo my-4 ml-5 mb-5">Tus ventas</h1>
      <b-container class=" tusVentasInfo col-xs-12 col-sm-12 col-md-12 col-lg-8 border border-light rounded-lg">
        <div class="col" v-for="post in postSold" :key="post.id">
          <div class="card mb-2" style="width: auto">
            <div class="row no-gutters">
              <div class="col-sm-5">
                <router-link :to="{ name: 'product', params: { id: post.postId.id } }">
                  <img
                    class="imagenCarta card-img mt-2"
                    v-bind:src="post.postId.image"
                    v-bind:alt="post.postId.image"
                    
                  />
                </router-link>
              </div>
              <div class="col-sm-7">
                <div class="card-body">
                  <h5 class="card-title mb-5">Titulo del post : {{ post.postId.title }}</h5>
                  <p class="card-text">
                    Producto : {{ post.postId.productName }}<br />
                    Cantidad : {{ post.postId.stock }}<br />
                    Precio por unidad : {{ post.postId.price }}<br />
                    Comprador : {{ post.buyerPerson.name }}<br />
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


  const path = '/api/transactions/my-seller-transactions';

  export default {
    name: "SalesTable.vue",
    data() {
    return {
      postSold: [],
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
            this.postSold.push(post);
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
.tusVentasInfo {
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