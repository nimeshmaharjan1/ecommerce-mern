import { Col, Image, Row } from "antd";
import React, { useEffect } from "react";

const CartItem = () => {
  useEffect(() => {
    console.log(localStorage.getItem("cartItems"));
  }, []);
  return (
    <Row gutter={24}>
      <Col xs={8}>
        <img
          alt="cart item"
          style={{ height: "140px", width: "100%" }}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>
      <Col xs={8}>
        <h1>Hello</h1>
      </Col>
      <Col xs={8}></Col>
    </Row>
  );
};

export default CartItem;
