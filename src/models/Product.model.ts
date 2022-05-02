export interface  IProductData{
    id: number;
    title: string;
    body_html: string;
    image: { alt: string; src: string };
    variants: {
        price: string
    }[]
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  image: {
    alt: string;
    src: string;
  };
}

export default class Product implements IProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  image: {
    alt: string;
    src: string;
  };
  constructor(data: IProductData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.body_html;
    this.image = data.image;
    this.price = data.variants[0].price + ' ₺';
  }
}
