<template>
  <div>
    <div
      id="topMenu_div"
      class="position-sticky"
      style="position: relative; z-index: 1000"
    >
      <TopMenu />
    </div>
    <div class="containerExterno mt-5">
      <div class="contenedor">
        <div>
          <img
            class="fotoperfil col-xs-12 col-sm-12 col-md-10 col-lg-12 mt-5"
            src="../assets/perfil.png"
            alt="Perfil"
            style="width: 80%; margin: 0 auto"
          />
        </div>
        <div>
          <b-col>
            <h1 class="titulo my-4 ml-5">Mis Datos</h1>
            <div class="info">
              <b-col cols="6" md="auto">
                <h4 class="text-left col-md-offset-4 my-4 ml-5 infoUser">
                  Nombre:
                </h4>
                <h4 class="text-left my-4 ml-5 infoUser">Nickname:</h4>
                <h4 class="text-left my-4 ml-5 infoUser">Correo:</h4>
                <h4 class="text-left my-4 ml-5 infoUser">Dirección:</h4>
              </b-col>
              <b-col cols="6" md="auto">
                <h4 class="text-right my-4">{{ person.name }}</h4>
                <h4 class="text-right my-4">{{ person.username }}</h4>
                <h4 class="text-right my-4">{{ person.email }}</h4>
                <h4 class="text-right my-4">{{ person.location }}</h4>
              </b-col>
            </div>
          </b-col>
        </div>

        <div class="mt-3">
          <b-button class="col-5" size="lg" pill variant="primary"
            >Cambiar imagen</b-button
          >
        </div>

        <div class="mt-3 ml-5">
          <b-button id="editar" v-b-modal.modal-1 size="lg" pill variant="primary"
          >Editar</b-button
        >
        </div>

        <div class="mt-2">
          <b-button
            class="col-5 mr-2"
            size="lg"
            type="sumbit"
            href=""
            variant="primary"
            pill
            :to="{name: 'shoppingHistory'}"
            >Historial de Compras</b-button
          >

          <b-button
            class="col-5 ml-2"
            size="lg"
            type="sumbit"
            href=""
            variant="primary"
            pill
            :to="{name: 'salesHistory'}"
            >Historial de Ventas</b-button
          >
        </div>
        <div></div>
      </div>
    </div>

        <b-modal id="modal-1" hide-footer title="Editar información">
          <form
            @submit="signUp"
            class="register border border-primary rounded-lg"
          >
            <div class="form-group col-12 mb-1">
              <label class="custom-label" for="names">Nombre y Apellido</label>
              <input
                id="names"
                class="form-control col-12"
                type="text"
                :value="person.name"
              />
            </div>

            <div class="form-group col-12 mb-1">
              <label class="custom-label" for="username"
                >Nombre de Usuario</label
              >
              <input
                id="username"
                class="form-control col-12"
                type="text"
                :value="person.username"
              />
            </div>

            <div class="form-group col-12 mb-1">
              <label class="custom-label" for="email">Email</label>
              <input
                id="email"
                class="form-control col-12"
                type="email"
                :value="person.email"
              />
            </div>
            <div class="form-group col-12 mb-1">
              <label class="custom-label" for="address">Dirección</label>
              <input
                id="address"
                class="form-control col-12"
                type="text"
                :value="person.location"
              />
            </div>

            <div class="col-12">
              <button class="btn btn-primary col-12 mb-2" @click="hideModal" type="submit">
                Guardar cambios
              </button>
              <button class="btn btn-primary col-12 mb-2" @click="toggleModal" type="submit">
                Cancelar
              </button>
            </div>
          </form>
        </b-modal>
  </div>
</template>

<script>
import TopMenu from "../components/TopMenu.vue";
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "/api/person/profile";

export default {
  name: "Profile.vue",
  data() {
    return {
      image: null,
      name: "",
      username: "",
      email: "",
      location: "",
      paypal: "",
      person: null,
    };
  },

  beforeCreate() {
    const componente = this;

    axios
      .get(this.$store.state.backURL + path + "?access_token=" + getAuthenticationToken(),)
      .then((response) => {
        if (response.status !== 200) {
          alert("Error en la petición. Intente nuevamente");
        } else {
          componente.person = response.data;
          console.log(componente.person);
        }
      })
      .catch((response) => {
        alert("No es posible conectar con el backend en este moment");
        return response;
      });
  },

  methods: {
      showModal() {
        this.$refs['modal-1'].show()
      },
      hideModal() {
        this.$refs['modal-1'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['modal-1'].toggle('#editar')
      }
    },
    
  components: {
    TopMenu,
  },
};
</script>

<style>
.containerExterno {
  background: #ffffff;
  min-height: 100vh;
  width: 70vw;
  margin: 0 auto;
}
.containerInterno {
  background: #ffffff;
}

.fotoperfil {
  height: auto;
  min-height: 80px;
  min-width: 80px;
  display: block;
}

.titulo {
  display: flex;
  justify-content: center;
  color: #0b99d6;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-between;
}

.contenedor {
  display: grid;
  grid-template-columns: 50% 50%;
}

.infoUser {
  color: #054c6b;
  font-weight: bold;
}
</style>
