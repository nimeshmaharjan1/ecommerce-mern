import { Col, Row, Button, Carousel } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { storeStatus } from "../constants/constants.enum";
import {
  changeStatus,
  getError,
  getProduct,
  getStatus,
  selectProduct,
} from "../store/products/singleProductSlice";
import { AppDispatch } from "../store/store";
import "../styles/SingleProduct.scss";
import { toast } from "../utils/notification";
const SingleProduct = () => {
  const params: any = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const product: any = useSelector(selectProduct);
  const contentStyle: React.CSSProperties = {
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  useEffect(() => {
    if (status === storeStatus.SUCCEEDED) {
      toast("Success", "Product fetched successfully.", "success");
      console.log(product);
    } else if (status === storeStatus.FAILED) {
      toast("Error", "Please try again", "error");
    }
    dispatch(getProduct(params.id));
  }, [dispatch, params.id]);

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
                  className="active"
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
              <span className="price">${product.price}</span>
            </div>
            <Button
              style={{
                borderRadius: 8,
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
              type="primary"
              size="large"
              block
            >
              Add To Cart
            </Button>
          </div>
        </Col>
        <Col xs={24}>
          <section className="review-section">
            <h1>Reviews</h1>
          </section>
        </Col>
      </Row>
    </>
  );
};

export default SingleProduct;
