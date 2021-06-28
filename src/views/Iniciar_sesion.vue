<template>
  <div class="container-fluid containerExternoIS">
    <div class="row">
      <div class="col-12">
        <br />
        <router-link :to="{ name: 'home' }">
          <img class="logoregister" src="../assets/logo.png" alt="Logo" />
        </router-link>
        <div id="login" class="login">
          <b-form
            @submit="validate"
            @submit.prevent="submit"
            class="datosIS col-xs-12 col-sm-8 col-md-6 col-lg-4 border border-primary rounded-lg"
          >
            <h2 class="col-12 text-center text-primary mt-3 mb-3">Login</h2>
            <img class="IS" src="../assets/IS.png" alt="ISL" />

            <b-form-group
              class="form-group col-12 mb-4"
              id="input-group-1"
              label="Nickname"
            >
              <b-form-input
                id="input-1"
                v-model="username"
                type="username"
                required
                placeholder="Ingrese su nombre de usuario"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              class="form-group col-12 mb-4"
              id="input-group-2"
              label="Contraseña"
            >
              <b-form-input
                id="input-2"
                v-model="password"
                required
                placeholder="Ingrese su contraseña"
                type="password"
              ></b-form-input>
            </b-form-group>

            <div
                :class="{mx_recaptcha_failed: !recaptcha}"
            >
              <vue-recaptcha
                  sitekey="6Lf8XmEbAAAAAFCxwbvOYCk5y3jgfFyGriVF1Xdz"
                  @verify="mxVerify"
              >
              </vue-recaptcha>
              <br/>
              <small>Complete el captcha!!!</small>

            </div>

              <div class="text-center" align-v="center">
                <b-button size="lg" type="sumbit" variant="primary"
                >Iniciar Sesión</b-button
                >
              </div>

            <br />
            <div class="text-center" align-v="center">
              <router-link :to="{ name: 'forgotPassword' }"
                >¿Olvidaste tu contraseña?</router-link
              >
            </div>
            <br />
            <div class="text-center" align-v="center">
              <b-button size="lg" to="register" variant="secondary"
                >Registrarse</b-button
              >
            </div>
            <br />
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VueRecaptcha from 'vue-recaptcha';
import axios from 'axios'
import {mapMutations} from 'vuex';
  const path = "/oauth/token";

    export default {
        name: "Iniciar_sesion.vue",
        components: { VueRecaptcha },
        data(){
            return {
                username: '',
                password: '',
                recaptcha: null,
            }
        },
        methods: {
            mxVerify( response ){
              // console.log( response )
              this.recaptcha = response
            },
            ...mapMutations(['login']),
            validate( event ){
              if(this.recaptcha == null){
                console.log( this.recaptcha )
                event.preventDefault()
              }else {
                axios
                    .post(this.$store.state.backURL + path, // URL
                        {}, // Body
                        {
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          params: {
                            username: this.username,
                            password: this.password,
                            grant_type: 'password'
                          },
                          auth: {
                            username: "soft-eng-ii",
                            password: "secret",
                          }
                        }
                    ).then(response => {
                  if (response.status !== 200) {
                    alert("Error en la autenticación");
                  } else {
                    this.login(response.data.access_token);
                    this.$router.push({name: 'home'});
                  }
                }).catch(error => {
                  if (error.response.status === 400) {
                    alert("Credenciales incorrectas");
                  } else {
                    alert("¡Parece que hubo un error de comunicación con el servidor!");
                  }
                });
                event.preventDefault();
              }
            }
        },
    }
</script>

<style>
.containerExternoIS {
  background: #012433;
  height:100%;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 87.1vh;
}
.IS {
  display: block;
  height: 150px;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
}
.datosIS {
  background: white;
  color: #054c6b;
}

small {
  color: red;
  display: none;
}

.mx_form_inv .mx_recaptcha_failed small {
  display: block;
}
</style>
