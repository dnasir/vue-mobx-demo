export class Product {
  name: string;
  price: number;
  imgUrl: string;

  constructor(name: string, price: number, imgUrl: string) {
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
  }
}