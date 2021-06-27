<template>
  <div>
    <div
      id="topMenu_div"
      class="position-sticky"
      style="position: relative; z-index: 1000"
    >
      <TopMenu />
    </div>
    <div class="container-fluid containerExternoPost">
      <div class="infoPost">
        <b-form
          @submit="createPost"
          class="datosPost col-xs-12 col-sm-11 col-md-11 col-lg-11"
        >
          <b-row>
            <h1 class="col-12 text-center text-primary mt-5 mb-5">
              Publicar Producto
            </h1>
          </b-row>
          <b-row class="mt-5">
            <b-col cols="auto" md="6" class="mb-5">
              <div class="imgButton">
                <b-form-file v-model="image" class="mt-3" plain></b-form-file>
              </div>
            </b-col>
            <b-col cols=" xs-12 sm-12 auto" md="6">
              <b-form-group class="form-group col-12 mb-4">
                <b-form-input
                  id="title"
                  v-model="title"
                  type="text"
                  required
                  placeholder="Titulo del post"
                ></b-form-input>
              </b-form-group>
              <b-form-group class="form-group col-12 mb-4">
                <b-form-input
                  id="product_name"
                  v-model="product_name"
                  type="text"
                  required
                  placeholder="Nombre del producto"
                ></b-form-input>
              </b-form-group>
              <b-form-group class="form-group col-12 mb-4">
                <b-form-input
                  id="description"
                  v-model="description"
                  type="text"
                  required
                  placeholder="Descripción"
                ></b-form-input>
              </b-form-group>
              <b-row>
                <b-col cols="xs-12 sm-12 auto" md="5">
                  Disponibles :
                </b-col>
                <b-col cols="xs-12 sm-12 auto" md="6">
                  <b-form-spinbutton
                    class="col-12"
                    id="stock"
                    v-model="stock"
                    min="1"
                    max="100"
                  ></b-form-spinbutton>
                </b-col>
              </b-row>
              <br />
              <b-form-group class="form-group col-12 mb-4">
                <b-form-input
                  id="price"
                  v-model="price"
                  type="number"
                  required
                  placeholder="Precio"
                ></b-form-input>
              </b-form-group>
              <b-form-select
                class="form-group col-12 mb-4"
                v-model="category"
                required
              >
                <option value="" disabled selected
                  >-- Seleccione una categoria --</option
                >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  >{{ category.name }}</option
                >
              </b-form-select>
            </b-col>
          </b-row>
          <div class="text-center" align-v="center">
            <b-button
              class="col-12 mt-2"
              size="lg"
              type="sumbit"
              variant="primary"
              >Publicar post
            </b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import TopMenu from "../components/TopMenu.vue";
import axios from 'axios'
import {getAuthenticationToken} from '@/dataStorage';


const path = "/api/post/add/";

  export default {
    name: "Post.vue",
    data( ){
      return{
        image: null,
        category_id : '',
        title: '',
        productName: '',
        description: '',
        stock: 1,
        price: '',
        category: '',
        categories: [],
        response: null,
        
      }
    },
    beforeCreate( ){
      const categoryPath = '/api/category/categories';
      axios
        .get( this.$store.state.backURL + categoryPath )
        .then( response => {
          if( response.status !== 200 ){
            alert( "Error en la petición. Intente nuevamente" )
          }else{
            this.categories = response.data;
          }
        });
      event.preventDefault();
      return true;
    },

    methods:{
      createPost( event ){
        axios
          .post( this.$store.state.backURL + path + this.category +  "?access_token=" + getAuthenticationToken(),
            { 
              
              image: "Nada",
              title: this.title.trim( ),
              productName: this.product_name.trim( ),
              description: this.description.trim( ),
              price: this.price.trim(),
              stock: this.stock,
              
              
              
              

              },
              
            
          ).then( response => {
            if( response.status !== 201 ){
              alert( "Error en la creación del post" )
            }else{
              alert( "Post creado correctamente" )
              this.$router.push( {name: 'home'} );
            }
          }).catch( error =>{
            if( error.response.status === 400 ){
              alert( "Un error ocurrio ");
            }else{
              alert( "¡Parece que hubo un error de comunicación con el servidor!" );
            }
          });
        event.preventDefault( );
        return true;
      }
    },
  components: {
    TopMenu,
  },
};
</script>

<style>
.containerExternoPost {
  background: rgb(255, 255, 255);
}
.infoPost {
  display: flex;
  justify-content: center;
  min-height: 83vh;
}
.datosPost {
  background: white;
  color: #054c6b;
}
</style>
