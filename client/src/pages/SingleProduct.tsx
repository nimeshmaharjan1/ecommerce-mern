import { Col, Row, Button, Carousel, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { storeStatus } from "../constants/constants.enum";
import { User } from "../interfaces/user.interface";
import { addToCart, selectCartItems } from "../store/cart/cartSlice";

import {
  getProduct,
  getStatus,
  selectProduct,
} from "../store/products/singleProductSlice";
import { AppDispatch } from "../store/store";
import { selectIsAuthenticated, selectUser } from "../store/users/userSlice";
import "../styles/SingleProduct.scss";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { toast } from "../utils/notification";
const SingleProduct = () => {
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const navigate = useNavigate();
  const params: any = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const product: any = useSelector(selectProduct);
  const user: any = useSelector(selectUser);
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const increaseQuantity = () => {
    if (cartQuantity === product.stock) return;
    const qty = cartQuantity + 1;
    setCartQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= cartQuantity) return;
    const qty = cartQuantity - 1;
    setCartQuantity(qty);
  };
  const contentStyle: React.CSSProperties = {
    height: "550px",
    color: "#fff",
    lineHeight: "160px",
    background: "#364d79",
  };
  const addQuantityIcon = (
    <span
      style={{
        fontSize: "1.1rem",
        background: "#1890FF",
        height: "30px",
        width: "40px",
        display: "block",
        color: "white",
        cursor: "pointer",
      }}
      onClick={increaseQuantity}
    >
      +
    </span>
  );
  const decreaseQuantityIcon = (
    <span
      style={{
        fontSize: "1.1rem",
        background: "#1890FF",
        height: "30px",
        width: "40px",
        display: "block",
        color: "white",
        cursor: "pointer",
      }}
      onClick={decreaseQuantity}
    >
      -
    </span>
  );
  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(
        addToCart({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0].url,
          stock: product.stock,
          quantity: cartQuantity,
          userId: user._id,
        })
      );
    } else {
      setIsLoginModalVisible(true);
    }
  };
  const handleLoginOk = () => {
    setIsLoginModalVisible(false);
    navigate("/sign-in");
  };
  const handleLoginCancel = () => setIsLoginModalVisible(false);
  useEffect(() => {
    if (status === storeStatus.SUCCEEDED) {
      toast("Success", "Product fetched successfully.", "success", 2);
      console.log({ product });
    } else if (status === storeStatus.FAILED) {
      toast("Error", "Please try again", "error", 2);
    }
    if (product.stock < 1) {
      setCartQuantity(0);
    }
    dispatch(getProduct(params.id));
  }, [dispatch, params.id, product.stock]);
  return (
    <>
      <Row className="row" gutter={24}>
        <Col xs={24} xl={12}>
          <div className="left-column">
            <Carousel effect="fade">
              <div>
                <img
                  style={contentStyle}
                  data-image="blue"
                  className="active"
                  src="https://github.com/nimeshmaharjan1/ecommerce-next/blob/dev/public/images/pants1.jpg?raw=true"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={contentStyle}
                  data-image="blue"
                  src="https://unblast.com/wp-content/uploads/2019/10/Model-T-shirt-Mockup-2.jpg"
                  alt=""
                />
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </div>
        </Col>
        <Col xl={12} xs={24}>
          <div className="right-column">
            <div className="product-description">
              <span>{product.category}</span>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
            <div className="product-description">
              <p>
                Status:{" "}
                <span style={{ color: product.stock > 0 ? "green" : "red" }}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
            </div>

            <div className="product-price">
              <span className="price" style={{ fontWeight: "semi-bold" }}>
                ${product.price}
              </span>
            </div>
            <Row align="middle" gutter={24}>
              <Col xs={24} md={14}>
                <Button
                  style={{
                    borderRadius: 8,
                    textTransform: "uppercase",
                    marginBottom: "1.2rem",
                  }}
                  type="primary"
                  size="large"
                  block
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </Col>
              <Col xs={24} md={6}>
                <InputNumber
                  addonBefore={addQuantityIcon}
                  addonAfter={decreaseQuantityIcon}
                  defaultValue={1}
                  style={{ marginBottom: "1rem", width: "130px" }}
                  value={cartQuantity}
                  readOnly
                />
              </Col>
            </Row>
          </div>
        </Col>
        {/* <Col xs={24}>
          <section className="review-section">
            <h1>Reviews</h1>
          </section>
        </Col> */}
      </Row>
      <Modal
        title="Login"
        visible={isLoginModalVisible}
        onOk={handleLoginOk}
        okText={"Go to Login"}
        onCancel={handleLoginCancel}
      >
        <p>You need to login before adding items to cart!</p>
      </Modal>
    </>
  );
};

export default SingleProduct;
