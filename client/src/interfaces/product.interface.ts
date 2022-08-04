export interface Product {
  name: string;
  images: Image[];
  price: string;
  _id: string;
  numberOfReviews: number;
  ratings: number;
  description: string;
  reviews: Review[];
  category: string;
}
interface Image {
  url: string;
}

interface Review {
  rating: number;
  comment: string;
  title: string;
}
