import { Button, Col, Modal, Row, Typography, Slider, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductCard from "../components/products/ProductCard";
import { Product } from "../interfaces/product.interface";
import { Pagination } from "antd";
import "../styles/AllProducts.scss";
import {
  getAllProducts,
  getProductsCount,
  selectAllProducts,
} from "../store/products/productsSlice";
import { AppDispatch } from "../store/store";
import { Category } from "../constants/constants.enum";

const AllProducts = () => {
  const { Option } = Select;
  const { Title } = Typography;
  const params: any = useParams();
  const keyword: string = params.keyword;
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProducts);
  const productsCount = useSelector(getProductsCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPriceValue, setFilterPriceValue] = useState<[number, number]>([
    0, 250000,
  ]);
  const [filterRatingValue, setFilterRatingValue] = useState(0);
  const [category, setCategory] = useState(null);
  const setCurrentPageNumber = (e: number) => {
    setCurrentPage(e);
  };
  const query = {
    keyword,
    currentPage,
    price: filterPriceValue,
    category,
    rating: filterRatingValue,
  };

  useEffect(() => {
    dispatch(getAllProducts(query));
  }, [dispatch, currentPage]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const openFilterModal = () => {
    setIsFilterModalVisible(true);
  };
  const handleFilterModalOk = () => {
    setIsFilterModalVisible(false);
    dispatch(getAllProducts(query));
  };
  const handleFilterModalCancel = () => {
    setIsFilterModalVisible(false);
  };
  const handleFilterPriceChange = (newValue: any) => {
    setFilterPriceValue(newValue);
  };
  const handleFilterRatingChange = (newValue: any) => {
    setFilterRatingValue(newValue);
  };
  const ratingMarks = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
  };
  return (
    <div style={{ marginBottom: "2rem" }}>
      <section
        className="heading"
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
      >
        <h1 className="title">Products</h1>
        <Button
          style={{
            borderRadius: "8px",
          }}
          type="primary"
          size="large"
          onClick={openFilterModal}
        >
          Filter
        </Button>
        <Modal
          title="Filter Products"
          visible={isFilterModalVisible}
          onOk={handleFilterModalOk}
          onCancel={handleFilterModalCancel}
        >
          <Row>
            <Col xs={24} style={{ marginBottom: "1rem" }}>
              <Title level={5}>Category</Title>
              <Select
                size="large"
                placeholder="Select a category"
                style={{ width: "100%" }}
                onSelect={(value: any) => setCategory(value)}
              >
                <Option value={null}>Select a category</Option>
                <Option value={Category.LAPTOP}>Laptop</Option>
                <Option value={Category.CAMERA}>Camera</Option>
                <Option value={Category.MOBILE}>Mobile</Option>
                <Option value={Category.PANT}>Pant</Option>
                <Option value={Category.SHIRT}>Shirt</Option>
              </Select>
            </Col>
            <Col xs={24}>
              <Title level={5}>Price Range</Title>
            </Col>
            <Col span={24}>
              <Slider
                range
                value={filterPriceValue}
                min={0}
                max={250000}
                onAfterChange={handleFilterPriceChange}
              />
            </Col>
            <Col span={24}>
              <Row justify="center">
                <Col xs={4}>
                  <p className="no-b-margin" style={{ textAlign: "center" }}>
                    ${filterPriceValue[0]}
                  </p>
                </Col>
                <Col xs={1}>
                  <p className="no-b-margin">-</p>
                </Col>
                <Col xs={4}>
                  <p className="no-b-margin">${filterPriceValue[1]}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Title level={5}>Rating Range</Title>
            </Col>
            <Col span={24}>
              <Slider
                value={filterRatingValue}
                min={0}
                max={5}
                onAfterChange={handleFilterRatingChange}
                marks={ratingMarks}
              />
            </Col>
          </Row>
        </Modal>
      </section>
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
