export interface Product {
  name: string;
  images: Array<Image>;
  price: string;
  _id: string;
}
interface Image {
  url: string;
}
