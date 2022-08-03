export interface Product {
  name: string;
  images: Image[];
  price: string;
  _id: string;
  numberOfReviews: number;
  ratings: number;
  description: string;
  reviews: Array<object>;
  category: string;
}
interface Image {
  url: string;
}
