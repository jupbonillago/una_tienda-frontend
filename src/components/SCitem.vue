<template>

  <div class="border rounded-lg">
    <div class="row">
      <div class="col-3" style="align-self: center">
        <router-link :to="{ name: 'product', params: { id: item.cartshopItemPost.id } }"><img v-bind:src="item.cartshopItemPost.image" style="width: 100%; max-width: 150px" alt="photo"></router-link>

      </div>

      <div class="col-6" style="align-self: center">
        <router-link :to="{ name: 'product', params: { id: item.cartshopItemPost.id } }" style="text-decoration: none!important;"><h3 style="color: white!important;">{{item.cartshopItemPost.title}}</h3></router-link>
        <h4>precio: ${{item.cartshopItemPost.price}}</h4>


        <b-button-group style="align-items: center">
          <b-button class="btn btn-danger" v-on:click="$emit('subtract',item.id)"><h4 style="color: azure">-</h4></b-button>
          <h4 class="middle" id="quantity">{{item.quantity}}</h4>
          <b-button class="btn btn-info"  v-on:click="$emit('add',item.id)"><h4 style="color: azure">+</h4></b-button>
        </b-button-group>

      </div>

      <div class="col-3" style="align-self: center">
        <b-button variant="danger" @click="$emit('del-item',item.id)">Quitar</b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "SCitem",
  props: ["item"],
  methods: {
  }
}
</script>

<style scoped>
.border{
  border: 1px solid lightskyblue!important;
  padding: 15px;
  background-color: lightskyblue;
}
h4{
  color: #012433;
}
.middle{
  background-color: #d1dadd;
  margin: 0px;
  padding: 10px 30px;
}
</style>