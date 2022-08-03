import { Col, Row, Button, Carousel } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectSingleProduct } from "../../store/products/productsSlice";
import { RootState } from "../../store/store";
import "../../styles/SingleProduct.scss";
const SingleProduct = () => {
  const params: any = useParams();
  const product: any = useSelector((state: RootState) =>
    selectSingleProduct(state, params.id)
  );
  const contentStyle: React.CSSProperties = {
    height: "650px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Row className="row" gutter={24}>
      <Col xs={24} xl={12}>
        <div className="left-column">
          <Carousel effect="fade">
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
            <span>{product.description}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>

          <div className="product-price">
            <span className="price">${product.price}</span>
          </div>
          <Button type="primary" size="large" block>
            Add To Cart
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default SingleProduct;
