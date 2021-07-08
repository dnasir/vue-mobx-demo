import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import ProductService from './services/ProductService';
import CartService from './services/CartService';

Vue.use(Vuetify);
Vue.use(ProductService);
Vue.use(CartService);

Vue.filter('currency', (value: number) => `EUR ${value.toFixed(2)}`);

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
});