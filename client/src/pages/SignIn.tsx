import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";
import { storeStatus } from "../constants/constants.enum";
import { AppDispatch, store } from "../store/store";
import {
  login,
  logout,
  selectStatus,
  selectUser,
} from "../store/users/userSlice";
import "../styles/SignIn.scss";
const SignIn: React.FC = () => {
  const { Title } = Typography;
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (status === storeStatus.LOADING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, user, navigate]);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    console.log(status);
    const { username, password } = values;
    dispatch(login({ username, password }));
    console.log(status);
  };
  return (
    <div
      className="sign-in-section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        headStyle={{ textAlign: "center" }}
        title={<Title level={2}>Sign In</Title>}
        style={{ width: 400 }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            style={{ marginBottom: "1.5rem" }}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            style={{ marginBottom: "1.2rem" }}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Row>
              <Col xs={12}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col xs={12} style={{ textAlign: "end" }}>
                <Link className="login-form-forgot" to="/forgot-password">
                  Forgot password
                </Link>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item style={{ marginTop: "-0.6rem" }}>
            <Row>
              <Col xs={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Log in
                </Button>
              </Col>
              <Col xs={24} style={{ textAlign: "center", marginTop: "0.5rem" }}>
                Or <Link to="/sign-up">register now!</Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
