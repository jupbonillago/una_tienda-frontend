<template>
  <div>
    <h3 class="score">
      <strong>{{ score }}</strong
      ><span class="numFive">/5</span>
    </h3>
    <form>
      <p class="clasificacion">
        <input
          id="radio1"
          type="radio"
          name="estrellas"
          value="5"
          v-model="score"
        /><!--
    --><label for="radio1">★</label
        ><!--
    --><input
          id="radio2"
          type="radio"
          name="estrellas"
          value="4"
          v-model="score"
        /><!--
    --><label for="radio2">★</label
        ><!--
    --><input
          id="radio3"
          type="radio"
          name="estrellas"
          value="3"
          v-model="score"
        /><!--
    --><label for="radio3">★</label
        ><!--
    --><input
          id="radio4"
          type="radio"
          name="estrellas"
          value="2"
          v-model="score"
        /><!--
    --><label for="radio4">★</label
        ><!--
    --><input
          id="radio5"
          type="radio"
          name="estrellas"
          value="1"
          v-model="score"
        /><!--
    --><label for="radio5">★</label>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: ["score"],
};
</script>

<style scoped>
.score {
  color: rgb(228, 162, 21);
}
.numFive {
  color: black;
  font-size: large;
}
form label {
  font-size: 20px;
}
label {
  color: grey;
  cursor: pointer;
}
input[type="radio"] {
  display: none;
}
.clasificacion {
  direction: rtl; /* right to left */
  unicode-bidi: bidi-override; /* bidi de bidireccional */
}
label:hover {
  color: rgb(228, 187, 5);
}
label:hover ~ label {
  color: rgb(228, 187, 5);
}
input[type="radio"]:checked ~ label {
  color: rgb(228, 187, 5);
}
</style>
