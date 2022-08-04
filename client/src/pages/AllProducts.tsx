import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import ProductCard from "../components/products/ProductCard";
import { Product } from "../interfaces/product.interface";
import { Pagination } from "antd";
import {
  getAllProducts,
  getProductsCount,
  selectAllProducts,
} from "../store/products/productsSlice";
import { AppDispatch } from "../store/store";

const AllProducts = () => {
  const params: any = useParams();
  const keyword: string = params.keyword;
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProducts);
  const productsCount = useSelector(getProductsCount);
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNumber = (e: number) => {
    setCurrentPage(e);
  };
  const query = {
    keyword,
    currentPage,
  };
  useEffect(() => {
    dispatch(getAllProducts(query));
  }, [dispatch, keyword, currentPage]);
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h1 className="title">Products</h1>
      <Row gutter={[20, 12]} style={{ marginBottom: "2rem" }}>
        {products &&
          products.map((product: Product) => (
            <Col xs={24} xl={6} key={product._id}>
              <ProductCard product={product}></ProductCard>
            </Col>
          ))}
      </Row>
      <Pagination
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
        defaultCurrent={1}
        current={currentPage}
        pageSize={8}
        total={productsCount}
        onChange={setCurrentPageNumber}
        responsive={true}
      />
    </div>
  );
};

export default AllProducts;
