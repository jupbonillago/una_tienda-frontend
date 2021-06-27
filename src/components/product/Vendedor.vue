<template>
  <div class="vendedor">
    <img @click='sinfo = !sinfo' style="cursor:pointer" class="imageVendedor" src="../../assets/vendedor.png" alt="vendedor" />
    <p>Informacion del vendedor</p>
    <div v-show='sinfo'>
    <p>{{name}}</p>
    <p>{{username}}</p>
    <p>{{email}}</p>
    <p>{{location}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InfoSeller",
  data() {
    return{
      name:"",
      username:"",
      email:"",
      location:"",
      sinfo: false  
    };
  },
beforeCreate() {
    const postPath = "/api/post/";
    let productId = this.$route.params.id;

    axios
      .get(this.$store.state.backURL + postPath + productId)
      .then((response) => {
        if (response.status !== 200) {
          alert("Error en la peticion");
        } else {
          this.name = response.data.sellerId.name;
          this.username = response.data.sellerId.username;
          this.email = response.data.sellerId.email;
          this.location = response.data.sellerId.location;
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
.imageVendedor {
  height: 80px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
