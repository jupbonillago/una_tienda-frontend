<template>
  <div id="app">
    <h1 style="color:DodgerBlue">Categorias</h1>
    <div class="w3-row-padding w3-padding-16 w3-center">
      <div class="w3-quarter" id="prueba">
        <img
          alt=""
          class="zoom"
          src="../assets/bike.png"
          style="cursor:pointer"
          onclick="document.location='http://localhost:8080/deportes'"
          width="200"
          height="200"
          id="category1"
        />
        <h3>Deportes</h3>
        <p>No puedes poner un límite a nada</p>
      </div>
      <div class="w3-quarter">
        <img
          alt=""
          class="zoom"
          src="../assets/nail.png"
          style="cursor:pointer"
          onclick="document.location='http://localhost:8080/belleza'"
          width="200"
          height="200"
          id="category2"
        />
        <h3>Belleza</h3>
        <p>
          Deja que la belleza de lo que amas se convierta en lo que hagas
        </p>
      </div>
      <div class="w3-quarter">
        <img
          alt=""
          class="zoom"
          src="../assets/radio1.png"
          style="cursor:pointer"
          onclick="document.location='http://localhost:8080/tecnologia'"
          width="200"
          height="200"
          id="category3"
        />
        <h3>Tecnología</h3>
        <p>Lo que siempre has querido, al alcance de tu mano</p>
      </div>
      <div class="w3-quarter">
        <img
          alt=""
          class="zoom"
          src="../assets/auri.png"
          style="cursor:pointer"
          onclick="document.location='http://localhost:8080/accesorios'"
          width="200"
          height="200"
          id="category4"
        />
        <h3>Accesorios</h3>
        <p>Si no esta aqui lo que buscas es porque no existe</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
    );
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    Zooming: function() {},
  },
};
</script>

<style>
.zoom {
  width: 200, height=200;
}
.zoom:hover {
  transform: scale(1.5);
}
@import url(https://www.w3schools.com/w3css/4/w3.css);
h1 {
  text-align: center;
}
</style>
