import React, { useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { Row, Col } from "antd";
import MetaData from "../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import {
  getAllProducts,
  getProductStatus,
  selectAllProducts,
} from "../store/products/productSlice";
import { AppDispatch } from "../store/store";
const HomeView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productStatus = useSelector(getProductStatus);
  const products = useSelector(selectAllProducts);
  const product = {
    name: "Blue Tshirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "$3000",
    _id: "abhisek",
  };

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(getAllProducts());
    }
    console.log(productStatus);
    console.log("Home View", products);
  }, [productStatus, dispatch, products]);

  return (
    <div className="home">
      <MetaData title={"Home"}></MetaData>
      <section className="featured-products">
        <Button type="primary" onClick={() => dispatch(getAllProducts())}>
          Button
        </Button>
        <h1 className="title">Featured Products</h1>
        <Row gutter={[20, 12]}>
          <Col xs={24} xl={6}>
            <ProductCard product={product}></ProductCard>
          </Col>
          <Col xs={24} xl={6}>
            <ProductCard product={product}></ProductCard>
          </Col>
          <Col xs={24} xl={6}>
            <ProductCard product={product}></ProductCard>
          </Col>
          <Col xs={24} xl={6}>
            <ProductCard product={product}></ProductCard>
          </Col>
          <Col xs={24} xl={6}>
            <ProductCard product={product}></ProductCard>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomeView;
