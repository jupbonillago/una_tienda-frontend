<template>
<div class="container-fluid" style="padding: 0px">

  <div
      id="topMenu_div"
      class="position-sticky"
      style="position: relative; z-index: 1000;"
  >
    <TopMenu />
  </div>

  <div class="main-container">
    <div class="col-xs-12 col-sm-8 col-md-6 border rounded-lg" style="background-color: azure">
      <h3 class="col-12 text-center text-primary mt-3 mb-3">Mi carrito de Compras</h3>

      <SC_ItemList style="margin-bottom: 20px" v-bind:items="SCitems" v-on:del-item="deleteItem" v-on:subtract="subtract" v-on:add="add"/>

      <h4>Total a pagar: ${{total}}</h4>

      <b-button-group style="margin-bottom: 20px">
        <b-button style="margin-right: 10px">Cancelar</b-button>
        <b-button variant="success" @click="buySC">Confirmar compra</b-button>
      </b-button-group>
    </div>
  </div>

  <div>
    <Footer />
  </div>
</div>
</template>

<script>
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import SC_ItemList from "@/components/SC_ItemList";
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

export default {
  components: {
    TopMenu,
    Footer,
    SC_ItemList
  },
  data() {
    return {
      SCitems: [],
      total: 0

    }
  },
  beforeMount() {
    const postPath = "/api/shopping-cart/items";


    axios
        .get(this.$store.state.backURL + postPath + "?access_token=" + getAuthenticationToken(),)
        .then((response) => {
          if (response.status !== 200) {
            alert("Error en la petición. Intente nuevamente");
          } else {
            let postsResponse = response.data;
            // this.posts = response.data;

            postsResponse.forEach((item) => {
                this.SCitems.push(item)
                this.total = this.total + item.cartshopItemPost.price * item.quantity;
            });
          }
        })
        .catch((response) => {
          console.log(response.status);
          alert("No es posible conectar con el backend en este momento"); 
        });

  },
  methods: {
    deleteItem(id) {
      const postPath = "/api/shopping-cart/delete-item";
      let item3 = this.SCitems.find(item => item.id == id);
      this.SCitems = this.SCitems.filter(item => item.id !== id);
      console.log(item3);
      this.total = this.total - item3.cartshopItemPost.price * item3.quantity;

      axios
          .delete(this.$store.state.backURL + postPath + "?access_token=" + getAuthenticationToken() + "&id=" + id,)
          .then((response) => {
            if (response.status !== 200) {
              alert("Error en la petición. Intente nuevamente");
            }
          })
          .catch((response) => {
            console.log(response.status);
            alert("No es posible conectar con el backend en este momento");
          });

    },
    subtract(id) {
      let item = this.SCitems.find(item => item.id == id);
      if (item.quantity > 1) {
        item.quantity--;
        this.total = this.total - item.cartshopItemPost.price;
        this.updateQuantity(id, item.quantity);
      }
    },
    add(id) {
      let item = this.SCitems.find(item => item.id == id);
      if (item.quantity < item.cartshopItemPost.stock) {
        item.quantity++;
        this.total = this.total + item.cartshopItemPost.price;
        this.updateQuantity(id, item.quantity);
      }
    },
    updateQuantity(id, quantity){
      const postPath = "/api/shopping-cart/update";

      axios
          .put(this.$store.state.backURL + postPath + "?access_token=" + getAuthenticationToken() + "&id=" + id + "&quantity=" + quantity,)
          .then((response) => {
            if (response.status !== 200) {
              alert("Error en la petición. Intente nuevamente");
            }
          })
          .catch((response) => {
            console.log(response.status);
            alert("No es posible conectar con el backend en este momento");
          });

    },
    buySC(event) {
      const path = "/api/transactions/buy";
      axios
          .post(this.$store.state.backURL + path + "?access_token=" + getAuthenticationToken(),)
          .then((response) => {
            if (response.status !== 201) {
              alert("Error en el almacenamiento del producto");
            } else {
              alert("se ha realizado la transacción exitosamente");
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alert(
                  'Parece que hubo un error'
              );
            } else {
              console.log(error.message);
              alert("Error en la aplicación");
            }
          });
      event.preventDefault();

      this.SCitems = null;
    },

  }
}

</script>

<style scoped>

.main-container{
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border{
  border: 1px solid #054c6b!important;
}
</style>