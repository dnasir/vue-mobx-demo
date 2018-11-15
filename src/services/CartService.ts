import Vue, { PluginObject } from 'vue';
import { Cart } from '../models/Cart';

declare module 'vue/types/vue' {
  export interface Vue {
    $cart: Cart;
  }
}

const service: PluginObject<never> = {
  install() {
    Vue.prototype.$cart = new Cart();
  }
};

export default service;