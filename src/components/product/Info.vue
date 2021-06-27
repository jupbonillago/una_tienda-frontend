<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col class="col-xs-12 col-sm-6 col-md-6 col-lg-7 cuadro1 mt-3">
        <div>
          <img v-bind:src="product.image" alt="image" class="imageProduct" />
        </div>
      </b-col>
      <b-col class="col-xs-12 col-sm-6 col-md-6 col-lg-5 cuadro2 mt-3">
        <div>
          <div class="infogeneral text-left m-3">
            <h3 class="mt-2 mb-4">
              {{ product.productName }}
            </h3>
            <div>
              <Score :score="totalReview" />
            </div>
            <p class="description text-justify mb-3">
              {{ product.description }}
            </p>
            <h5 class="text-dark">Categoria: {{ product.category }}</h5>
            <br />

            <h2>Precio: ${{ product.price }}</h2>
            <br />
            <h5 class="text-primary">Stock disponibles: {{ product.stock }}</h5>

            <div class="cantidad mt-3 mb-2">
              <b-row>
                <b-col cols="xs-12 sm-12 auto" md="6">
                  <h4>Cantidad :</h4>
                </b-col>
                <b-col cols="xs-12 sm-12 auto" md="6">
                  <b-form-spinbutton
                    class="col-12"
                    id="cantidad"
                    v-model="cantidad"
                    :class="{
                      'is-invalid': cantidad !== '' && cantidad > product.stock,
                      'is-valid': cantidad !== '' && cantidad <= product.stock,
                    }"
                  ></b-form-spinbutton>
                  <div class="valid-feedback">
                    Llevas {{ cantidad }} Unidades
                  </div>
                  <div class="invalid-feedback">
                    No hay mas unidades disponibles, puedes llevar max
                    {{ product.stock }} productos
                  </div>
                </b-col>
              </b-row>
            </div>
            <h2 class="text-warning">Estado: {{ stateString }}</h2>
            <br />
            <br />
            <div>
              <b-button block variant="danger" @click="addCarrito"
                >Añadir al Carrito</b-button
              >
            </div>
            <br />
            <div v-if="this.mine">
              <b-button block variant="danger" @click="deletePost"
                >Eliminar Post</b-button
              >
            </div>
          </div>
          <div><Vendedor /></div>
        </div>
      </b-col>
    </b-row>
    <RecommendedItemList v-bind:product="product" />
  </b-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Vendedor from "./Vendedor";
import Score from "./Score";
import { getAuthenticationToken } from "@/dataStorage";
import RecommendedItemList from "@/components/product/RecommendedItemList";

export default {
  name: "Info",
  data() {
    return {
      totalReview: 1,
      cantidad: 1,
      state: true,
      stateString: "",
      mine: true,
      product: {
        description: "",
        stock: 0,
        price: 0,
        category: "",
        productName: "",
        image: "",
        id: 0
      }
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
          this.$set(this.product, "description", response.data.description);
          this.$set(this.product, "id", response.data.id);
          this.$set(this.product, "stock", response.data.stock);
          this.$set(this.product, "price", response.data.price);
          this.$set(this.product, "category", response.data.categoryId.name);
          this.$set(this.product, "category_id", response.data.categoryId.id);
          this.$set(this.product, "productName", response.data.productName);
          this.$set(this.product, "image", response.data.image);
          this.totalReview = response.data.totalReview;
          this.state = response.data.state;
          if (this.state) {
            this.stateString = "Activo";
          } else {
            this.stateString = "Inactivo";
          }
          this.mine = false;
        }
      })
      .catch((response) => {
        console.log(response.status);
        alert("No es posible conectar con el backend en este momento");
      });
  },
  beforeUpdate() {
    if (this.logged) {
      const minePath = "/api/post/mine/";
      axios
        .get(
          this.$store.state.backURL +
            minePath +
            this.$route.params.id +
            "?access_token=" +
            getAuthenticationToken()
        )
        .then((response) => {
          if (response.status === 202) {
            this.mine = true;
          }
        });
    }
  },

  methods: {
    addCarrito(event) {
      const path = "/api/shopping-cart/add";
      axios
        .post(this.$store.state.backURL + path + "?access_token=" + getAuthenticationToken() + "&postId=" + this.product.id + "&quantity=" + this.cantidad,)
        .then((response) => {
          if (response.status !== 201) {
            alert("Error en el almacenamiento del producto");
          } else {
            alert("el producto se ha añadido correctamente");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("Parece que hubo un error");
          } else {
            console.log(error.message);
            alert("Error en la aplicación");
          }
        });
      event.preventDefault();
      return true;
    },
    deletePost(event) {
      const deletePath = "/api/post/delete/";

      if (this.state === false) {
        alert("Este producto ya esta deshabilitado !");
      } else {
        axios
          .delete(
            this.$store.state.backURL +
              deletePath +
              this.$route.params.id +
              "?access_token=" +
              getAuthenticationToken()
          )
          .then((response) => {
            if (response.status === 200) {
              alert("Post eliminado correctamente");
              this.$router.push({ name: "home" });
            } else if (response.status === 202) {
              alert("Post deshabilitado correctamente");
              this.$router.push({ name: "home" });
            } else {
              alert("Parece que hubo un error");
            }
          });
        event.preventDefault();
        return true;
      }
    },
  },
  computed: {
    ...mapState(["logged"]),
  },
  components: {
    Vendedor,
    Score,
    RecommendedItemList,
  },
};
</script>

<style scoped>
.cantidad {
  align-content: center;
}
.imageProduct {
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: auto;
}
.cuadro1 {
  background: white;
  min-width: 200px;
}
.cuadro2 {
  background: white;
}
</style>
