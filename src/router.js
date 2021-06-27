import Vue from "vue";
import Home from "./views/Home.vue";
import Iniciar_sesion from "./views/Iniciar_sesion.vue";
import Router from "vue-router";
import Register from "./views/Register";
import ForgotPassword from "./views/ForgotPassword";
import Profile from "./views/Profile.vue";

import Shopping_cart from "@/views/Shoppingcart";
import Product from "./views/Product.vue";
import Tecnologia from "./views/Tecnologia.vue";
import Deportes from "./views/Deportes.vue";
import Muebles from "./views/Muebles.vue";
import Accesorios from "./views/Accesorios.vue";
import Belleza from "./views/Belleza.vue";
import Post from "./views/Post.vue";
import ShoppingHistory from "./views/ShoppingHistory.vue"
import SalesHistory from "./views/SalesHistory.vue"
import PostsHistory from "./views/PostsHistory.vue"
import RecoverPassword from "./views/RecoveryPassword.vue"

// import { component } from "vue/types/umd";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/iniciar_sesion",
      name: "iniciar_sesion",
      component: Iniciar_sesion,
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/restore/:token",
      name: "restorePassword",
      component: RecoverPassword,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: 'shopping-history',
      name: "shoppingHistory",
      component: ShoppingHistory
    },
    {
      path: '/sales-history',
      name: "salesHistory",
      component: SalesHistory
    },
    {
      path: '/posts-history',
      name: "postsHistory",
      component: PostsHistory
    },
    {
      path: "/shopping-cart",
      name: "shopping_cart",
      component: Shopping_cart,
    },
      {
      path: "/tecnologia",
      name: "Tecnologia",
      component: Tecnologia,
    },
    {
      path: "/deportes",
      name: "Deportes",
      component: Deportes,
    },
    {
      path: "/muebles",
      name: "Muebles",
      component: Muebles,
    },
    {
      path: "/accesorios",
      name: "Accesorios",
      component: Accesorios,
    },
    {
      path: "/belleza",
      name: "Belleza",
      component: Belleza,
    },
    {
      path: "/post",
      name: "post",
      component: Post,
    },
    {
      path: "/product/:id",
      name: "product",
      component: Product,
    },   
  ],
});
