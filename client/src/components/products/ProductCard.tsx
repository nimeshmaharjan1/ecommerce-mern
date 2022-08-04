import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Card, Typography } from "antd";
import { Product } from "../../interfaces/product.interface";
import "../../styles/Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProductStatus } from "../../store/products/productsSlice";
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
  const productStatus = useSelector(getProductStatus);
  const { Title } = Typography;
  const dispatch = useDispatch();
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    size: 25,
    isHalf: true,
  };
  const id = product._id as any;
  const [loading, setLoading] = useState(false);
  const { Meta } = Card;
  useEffect(() => {
    if (productStatus === "loading" || productStatus === "idle") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [productStatus]);
  return (
    <Link to={`product/${product._id}`}>
      <Card
        size="default"
        style={{ marginTop: 16 }}
        loading={loading}
        hoverable
        cover={<img alt="example" src={product.images[0].url} />}
      >
        <Meta title={<Title level={4}>{product.name}</Title>} />
        <div className="rating">
          <ReactStars {...options}></ReactStars>{" "}
          <span>({product.numberOfReviews} reviews)</span>
        </div>
        <p className="price">${product.price}</p>
      </Card>
    </Link>
  );
};

export default ProductCard;
