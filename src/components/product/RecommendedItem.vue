<template>
  <a :href="post.id" class="link">
  <div class="col-sm-12 border rounded-lg" style="margin-top: 15px">
    <div class="row">
    <div class="col-sm-4 col-6" style="align-self: center">
      <img v-bind:src="post.image" style="width: 100%; max-width: 150px" alt="photo">
    </div>
    <div class="col-sm-8 col-6" style="align-self: center">
      <h2>{{post.productName}}</h2>
      <h3>${{post.price}}</h3>
    </div>
    </div>
  </div>
  </a>
</template>

<script>
export default {
  name: "RecommendedItem",
  props: ["post"],
}

</script>

<style scoped>
.border{
  border: 1px solid #43b0df!important;
  padding: 15px;
  background-color: lightgreen;
}
.border:hover{
  background-color: #90ee92;
}
.link{
  text-decoration: none;
  color: ;
}
</style>