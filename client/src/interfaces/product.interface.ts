export interface Product {
  name: string;
  images: Image[];
  price: string;
  _id: string;
}
interface Image {
  url: string;
}
