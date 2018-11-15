import { observable, computed } from 'mobx';
import { CartItem } from './CartItem';

export class Cart {
  @observable
  private _items: CartItem[] = [];

  @computed
  get total() {
    return this._items.map(x => x.total).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  @computed
  get items() {
    return this._items.slice();
  }

  add(item: CartItem) {
    const index = this._items.findIndex(x => x.product.name === item.product.name);

    if (index > -1) {
      // means we already have the item in the cart
      this._items[index].amount += item.amount;
    } else {
      this._items.push(new CartItem(item.product, item.amount));
    }
  }

  remove(item: CartItem) {
    const index = this._items.findIndex(x => x.product.name === item.product.name);
    if (index > -1) {
      this._items.splice(index, 1);
    }
  }
}
