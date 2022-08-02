import React, { useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { Row, Col, Spin } from "antd";
import MetaData from "../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { Product } from "../interfaces/product.interface";
import {
  getAllProducts,
  getProductError,
  getProductStatus,
  selectAllProducts,
} from "../store/products/productSlice";
import { AppDispatch } from "../store/store";
import { useAlert } from "react-alert";
const HomeView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productStatus = useSelector(getProductStatus);
  const products = useSelector(selectAllProducts);
  const error = useSelector(getProductError);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (productStatus === "idle") {
      dispatch(getAllProducts());
    }
  }, [productStatus, dispatch, products]);
  let homeSection;
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 156px)",
  };
  if (productStatus === "loading") {
    homeSection = (
      <div style={spinnerStyle}>
        <Spin size="large" />
      </div>
    );
  } else if (productStatus === "succeeded") {
    homeSection = (
      <div className="home">
        <MetaData title={"Home"}></MetaData>
        <section className="featured-products">
          <h1 className="title">Featured Products</h1>
          <Row gutter={[20, 12]}>
            {products &&
              products.map((product: Product) => (
                <Col xs={24} xl={6} key={product._id}>
                  <ProductCard product={product}></ProductCard>
                </Col>
              ))}
          </Row>
        </section>
      </div>
    );
  } else if (productStatus === "failed") {
    homeSection = <p>{error}</p>;
  }

  return <>{homeSection}</>;
};

export default HomeView;
