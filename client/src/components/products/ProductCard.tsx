import React, { useState } from "react";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import { Card, Switch } from "antd";
import { Product } from "../../interfaces/product.interface";
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { Meta } = Card;
  return (
    <Link to="/">
      <Card
        style={{ width: 300, marginTop: 16 }}
        loading={loading}
        hoverable
        cover={<img alt="example" src={product.images[0].url} />}
      >
        <Meta title="Card title" description="This is the description" />
      </Card>
    </Link>
  );
};

export default ProductCard;
