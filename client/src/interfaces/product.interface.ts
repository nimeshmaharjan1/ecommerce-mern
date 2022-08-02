export interface Product {
  name: string;
  images: Image[];
  price: string;
  _id: string;
  numberOfReviews: number;
  ratings: number;
}
interface Image {
  url: string;
}
