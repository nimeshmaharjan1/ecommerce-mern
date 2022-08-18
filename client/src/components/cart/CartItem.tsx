import { Col, Image, Row } from "antd";
import React, { useEffect } from "react";

const CartItem = ({ item }) => {
  useEffect(() => {
    console.log(localStorage.getItem("cartItems"));
  }, []);
  return (
    <Row gutter={24} style={{ width: "100%" }}>
      <Col xs={8}>
        <img
          alt="cart item"
          style={{ height: "140px", width: "100%" }}
          src="https://github.com/nimeshmaharjan1/ecommerce-next/blob/dev/public/images/pants1.jpg?raw=true"
        />
      </Col>
      <Col xs={8}>
        <p>{item.name}</p>
      </Col>
      <Col xs={2}>
        <p>{item.price}</p>
      </Col>
    </Row>
  );
};

export default CartItem;
