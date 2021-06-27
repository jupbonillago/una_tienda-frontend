import Vue from "vue";
import Vuex from "vuex";
import {getAuthenticationToken} from '@/dataStorage';
import {setAuthenticationToken} from '@/dataStorage';
import {removeAuthenticationToken} from '@/dataStorage';

Vue.use(Vuex);

var hostname = ""

if(process.env.NODE_ENV === "development"){
  hostname = "http://localhost:8282"
}
else{
  hostname = "http://localhost:8282"
}

export default new Vuex.Store({
  state: {
    backURL: hostname,
    logged: false,
  },
  mutations: {

    initialiseLogged(state) {
      if (getAuthenticationToken()) {
        state.logged = true;
      }
    },
    login(state, token){
      state.logged = true
      setAuthenticationToken(token);
    },
    logout(state){
      state.logged = false
      removeAuthenticationToken();
    }
  },
  actions: {},
});
