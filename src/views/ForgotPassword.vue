<template>
  <div class="container-fluid container-forgotPassword" style="height: 100vh">
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
            style="height: 428px"
          >
            <div class="align-content-center" v-if="requestSended == 1" style="margin-top: 10rem; text-color: #2c3e50">
              <h5>Enviando...</h5>
            </div>
            <div class="text-black-50" v-if="requestSended == 2" style="margin-top: 10rem; text-color: #2c3e50">
              <h5>
                Verifique en su correo el mensaje que se le envio para
                restablecer la contraseña.
              </h5>
            </div>
            <div v-if="requestSended == 0">
              <h2 class="title col-12 text-center text-primary mt-5 mb-5">
                ¿Olvido su contraseña?
              </h2>
              <div>
                <p class="small-text col-12 mb-3">
                  Le enviaremos a su correo electrónico el enlace de
                  recuperación.
                </p>
              </div>

              <div class="form-group col-12 mb-5">
                <label class="custom-label" for="email"
                  >Correo Electrónico</label
                >
                <input
                  id="email"
                  class="form-control col-12"
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  v-model="email"
                  required
                />
              </div>

              <div class="col-12 mb-3">
                <button
                  class="btn btn-primary col-12 mb-2"
                  type="submit"
                  @click="update()"
                >
                  Recuperar Contraseña
                </button>
              </div>
              <div class="col-12 mb-3 text-center">
                <span class="linklogin">
                  <small>
                    <router-link :to="{ name: 'iniciar_sesion' }"
                      >&iquest;Ya tienes cuenta? Inicia
                      Sesi&oacute;n</router-link
                    >
                  </small>
                </span>
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
  data: function () {
    return {
      email: "",
      requestSended: 0,
    };
  },
  methods: {
    update() {
      this.requestSended = 1;
      setTimeout(() => {
        this.recoverPassword();
        this.requestSended = 2;
      }, 8000);
    },
    recoverPassword() {
      let path = "/api/person/forgot-password/";
      axios
        .post(this.$store.state.backURL + path + this.email)
        .then((response) => {
          console.log(response.status);
        })
        .catch((response) => {
          console.log(response.status);
          alert("No es posible conectar con el backend en este momento");
        });
    },
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
  height: inherit;
}
.forgotpass {
  background: white;
  color: #054c6b;
}
</style>
