<template>
  <div class="container-fluid container-forgotPassword">
    <div class="row">
      <div class="col-12">
        <br />
        <div>
          <router-link :to="{ name: 'home' }">
            <img class="logoregister" src="../assets/logo.png" alt="Logo" />
          </router-link>
        </div>
        <div class="forgot-password">
          <div
            class="forgotpass col-xs-12 col-sm-8 col-md-6 col-lg-4 border border-primary rounded-lg"
            style="height: 398.75px"
          >
            <div v-if="send">
              <h3 style="margin-top: 10rem; text-color: #2c3e50">Su contraseña se ha reestablecido, puede volver a iniciar sesión.</h3>
            </div>
            <div v-if="!send">
              <h2 class="title col-12 text-center text-primary mt-5 mb-5">
                Reestablecer tu contraseña
              </h2>

              <div class="form-group col-12 mb-5">
                <label class="custom-label" for="newPassword"
                  >Nueva contraseña</label
                >
                <input
                  id="newPassword"
                  class="form-control col-12"
                  type="password"
                  placeholder="Ingrese su nueva contraseña"
                  v-model="newPassword"
                  required
                />
                <hr />
                <input
                  id="repeatPassword"
                  class="form-control col-12"
                  type="password"
                  placeholder="Repita su contraseña nuevamente"
                  v-model="repeatPassword"
                  required
                />
              </div>

              <div class="col-12 mb-3">
                <button
                  class="btn btn-primary col-12 mb-2"
                  @click="recoverPassword()"
                  :to="{ name: '' }"
                >
                  Recuperar Contraseña
                </button>
              </div>
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
  data() {
    return {
      newPassword: "",
      repeatPassword: "",
      send: false,
    };
  },
  methods: {
    recoverPassword() {
      if (this.newPassword !== this.repeatPassword) {
        alert(
          "Las contraseñas tienen que ser iguales, verifique e intente de nuevo por favor."
        );
      } else {
        this.send = true;
        let path = `/api/person/restore-password/${this.$route.params.token}/${this.newPassword}`;
        console.log(this.$store.state.backURL + path);
        axios
          .post(this.$store.state.backURL + path)
          .then((response) => {
            console.log(response);
          })
          .catch((response) => {
            console.log(response.status);
            this.requestSended = true;
            alert("No es posible conectar con el backend en este momento");
          });
      }
    },
  },
  beforeCreate() {
    let path = "/api/recover-password/validate-token/";
    this.exists = false;
    axios
      .post(this.$store.state.backURL + path + this.$route.params.token)
      .then((response) => {
        console.log(response.status);
      })
      .catch((response) => {
        console.log(response.status);
        this.$router.push({ name: "home" });
      });
  },
};
</script>

<style>
body {
  background: #012433;
  height: 100vh;
}

.logoforgot {
  margin-top: 40px;
  height: 80px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.forgot-password {
  margin-top: 20px;
  margin-bottom: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
}
.container-forgotPassword {
  background: #012433;
  height: 100vh;
}
.forgotpass {
  background: white;
  color: #054c6b;
}
</style>
