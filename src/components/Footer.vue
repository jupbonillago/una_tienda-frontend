<template>
  <div class="footer-web">
    <footer class="w3-row-padding w3-padding-32">
      <div class="w3-third">
        <h3>Contactanos</h3>
        <div>
          <router-link :to="{ name: 'profile' }">Tu perfil</router-link>
        </div>
        <div><a href="/about/about_team.htm">Acerca de nosotros</a></div>
        <div><a href="/about/about_team.htm">Ubicacion</a></div>
        <div><a href="/about/about_team.htm">Redes sociales</a></div>
      </div>

      <div class="w3-third text-center">
        <img
          alt=""
          src="../assets/escudo1.png"
          class="w3-left w3-margin-center"
          style="width:100px"
        />
        <h3>Seguridad</h3>
        <h4>Haga de tu misión, que la seguridad sea una condición</h4>
      </div>

      <div class="w3-third text-center">
        <img
          alt=""
          src="../assets/love.png"
          class="w3-left w3-margin-center"
          style="width:100px"
        />
        <h3>Confianza</h3>

        <h4>Estamos para ti en todo momento</h4>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer-web {
  background: black;
}
</style>
