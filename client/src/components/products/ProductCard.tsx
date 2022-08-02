import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Card, Typography } from "antd";
import { Product } from "../../interfaces/product.interface";
import "../../styles/Product.scss";
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
  const { Title } = Typography;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: 4.5,
    size: 25,
    isHalf: true,
  };
  const [loading, setLoading] = useState(false);
  const { Meta } = Card;
  return (
    <Link to="/">
      <Card
        size="default"
        style={{ marginTop: 16 }}
        loading={loading}
        hoverable
        cover={<img alt="example" src={product.images[0].url} />}
      >
        <Meta title={<Title level={2}>{product.name}</Title>} />
        <div className="rating">
          <ReactStars {...options}></ReactStars> <span>(256 reviews)</span>
        </div>
        <p className="price">{product.price}</p>
      </Card>
    </Link>
  );
};

export default ProductCard;
