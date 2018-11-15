import { Product } from './Product';
import { observable, computed } from 'mobx';

export class CartItem {
  product: Product;

  @observable
  amount: number;

  @computed
  get total() {
    return this.product ? this.product.price * this.amount : 0;
  }

  constructor(product: Product, amount: number = 1) {
    this.product = product;
    this.amount = amount;
  }

  increaseAmount() {
    this.amount++;
  }

  decreaseAmount() {
    this.amount--;
  }
}