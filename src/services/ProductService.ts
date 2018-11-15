import Vue, { PluginObject } from 'vue';
import { Product } from '../models/Product';
import { observable } from 'mobx';

declare module 'vue/types/vue' {
  export interface Vue {
    $productService: ProductService;
  }
}

export class ProductService {
  @observable
  products: Product[] = [];

  constructor() {
    this.products = [
      new Product('Razer Huntsman Elite', 180.07, 'https://cdn.mos.cms.futurecdn.net/7DceKdaRm8mrFG6xFmxNhQ-650-80.jpg'),
      new Product('Roccat Vulcan 120 Aimo', 149.99, 'https://cdn.mos.cms.futurecdn.net/ZpUroNQU5tcCBUWRiU5PW7-650-80.jpg'),
      new Product('Logitech G513', 112.99, 'https://cdn.mos.cms.futurecdn.net/MxYJv66BzooiE3udUkS68m-650-80.jpg')
    ];
  }
}

const service: PluginObject<never> = {
  install() {
    Vue.prototype.$productService = new ProductService();
  }
};

export default service;