import { Col, Row, Button } from "antd";
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

  return (
    <Row className="row" gutter={24}>
      <Col xs={24} xl={12}>
        <div className="left-column">
          <img
            data-image="blue"
            className="active"
            src="https://unblast.com/wp-content/uploads/2019/10/Model-T-shirt-Mockup-2.jpg"
            alt=""
          />
        </div>
      </Col>
      <Col xl={12} xs={24}>
        <div className="right-column">
          <div className="product-description">
            <span>{product.category}</span>
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
