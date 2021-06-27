<template>
  <!-- Contenedor para el menu -->
  <b-container class="menu">
    <b-row>
      <b-col class="col-12 col-sm-2" align-self="center">
        <router-link :to="{ name: 'home' }"
          ><img
            src="../assets/logo.png"
            alt="Logo"
            style="width: 100%; padding-top: 10px"
        /></router-link>
      </b-col>

      <b-col>
        <b-row>
          <!-- Primera fila de items -->

          <b-col class="col-8 col-sm-9" align-self="center">
            <b-input-group class="sm">
              <b-form-input
                v-model="name"
                placeholder="Buscar productos..."
              ></b-form-input>
              <b-input-group-append>
                <b-button v-on:click="getUsers" variant="">Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <b-col class="col-1 col-sm-1" align-self="center">
            <div>
              <router-link :to="{ name: 'shopping_cart' }"
                ><img
                  src="../assets/shopping-cart.png"
                  alt="Carrito"
                  style="width: 100%; max-width: 80px; min-width: 25px"
              /></router-link>
            </div>
          </b-col>

          <!-- Segunda fila de items -->

          <b-col class="col-lg-12">
            <b-list-group>
              <b-list-group-item
                class="list-order"
                v-for="item in search"
                href="#"
                :key="item"
              >
                {{ item.name }}
              </b-list-group-item>
            </b-list-group>

            <b-navbar toggleable="lg" sticky>
              <b-navbar-toggle
                target="nav-collapse"
                style="background-color: azure; width: 30px; padding: 1px"
              ></b-navbar-toggle>

              <b-collapse id="nav-collapse" is-nav class="show">
                <b-navbar-nav class="right-navbar">
                  <b-nav-item>
                    <router-link :to="{ name: 'home' }" class="menufont"
                      >Inicio</router-link
                    >
                  </b-nav-item>

                  <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                      <a style="color: azure !important; padding-top: 0"
                        >Categorias</a
                      >
                    </template>
                    <b-dropdown-item href="/tecnologia"
                      >Tecnologia</b-dropdown-item
                    >
                    <b-dropdown-item href="/deportes">Deportes</b-dropdown-item>
                    <b-dropdown-item href="/muebles">Muebles</b-dropdown-item>
                    <b-dropdown-item href="/accesorios"
                      >Accesorios</b-dropdown-item
                    >
                    <b-dropdown-item href="/belleza">Belleza</b-dropdown-item>
                  </b-nav-item-dropdown>

                  <b-nav-item>
                    <router-link
                      v-show="logged"
                      :to="{ name: 'profile' }"
                      class="menufont"
                      >Perfil</router-link
                    >
                  </b-nav-item>

                  <b-nav-item>
                    <router-link
                      v-show="logged"
                      :to="{ name: 'postsHistory' }"
                      class="menufont"
                      >Mis productos</router-link
                    >
                  </b-nav-item>

                  <b-nav-item>
                    <router-link
                      v-show="logged"
                      :to="{ name: 'shoppingHistory' }"
                      class="menufont"
                      >Historial</router-link
                    >
                  </b-nav-item>

                  <b-nav-item>
                    <router-link :to="{ name: 'ayuda' }" class="menufont"
                      >Ayuda</router-link
                    >
                  </b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto left-navbar">
                  <b-nav-item
                    v-if="!logged"
                    style="
                      border: 1px;
                      border-radius: 16px;
                      background-color: #43b0df;
                    "
                  >
                    <router-link :to="{ name: 'register' }" class="menufont">
                      Registarse
                    </router-link>
                  </b-nav-item>

                  <b-nav-item
                    v-if="!logged"
                    style="
                      border: 1px;
                      border-radius: 16px;
                      background-color: #42b983;
                    "
                  >
                    <router-link
                      :to="{ name: 'iniciar_sesion' }"
                      class="menufont"
                    >
                      Ingresar
                    </router-link>
                  </b-nav-item>

                  <b-nav-item
                    class="text-white"
                    v-if="logged"
                    v-on:click="logout2"
                    style="
                      border: 1px;
                      border-radius: 16px;
                      background-color: #42b983;
                      color: #000000 !important;
                    "
                  >
                    Cerrar Sesión
                  </b-nav-item>

                  <b-nav-item
                    class="text-white ml-1"
                    v-if="logged"
                    style="
                      border: 1px;
                      border-radius: 16px;
                      background-color: #42b983;
                    "
                  >
                    <router-link :to="{ name: 'post' }" class="menufontPost">
                      Crear Post
                    </router-link>
                  </b-nav-item>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "TopMenu",
  data: function() {
    return {
      lists: [],
      name: "",
    };
  },
  beforeCreate() {
    this.$store.commit("initialiseLogged");
  },
  methods: {
    ...mapMutations(["logout"]),
    logout2() {
      this.logout();
      this.$router.push({ name: "home" });
    },
    getUsers: function() {
      var urlUsers = "https://jsonplaceholder.typicode.com/users";
      axios.get(urlUsers).then((response) => {
        this.lists = response.data;
      });
    },
  },
  computed: {
    ...mapState(["logged"]),
    search: function() {
      return this.lists.filter((item) =>
        item.name.toLowerCase().includes(this.name.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.menufontPost {
  color: #4c4545 !important;
  text-decoration: none;
}
.menufont {
  color: azure !important;
  text-decoration: none;
}

.menu {
  background: #012433;
  margin-left: 0;
  margin-right: 0;
  max-width: inherit;
  width: border-box;
}

@media (min-width: 992px) {
  .left-navbar {
    justify-content: space-evenly;
    display: flex;
    flex-direction: row;
    margin-right: 12vw;
    max-width: 200px;
    width: 18%;
  }

  .right-navbar {
    justify-content: space-between;
    margin-left: 1%;
    display: flex;
    width: 60%;
    flex-direction: row;
  }
}

.list-order {
  position: relative;
  width: 40%;
}
</style>
