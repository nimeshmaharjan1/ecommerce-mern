import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  FontColorsOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.scss";

const SignUp = () => {
  const { Title } = Typography;
  const [avatarPreview, setAvatarPreview] = useState(
    "https://github.com/vercel/next-learn/blob/master/basics/basics-final/public/images/profile.jpg?raw=true"
  );
  const [avatar, setAvatar] = useState("");
  const onFinish = (values: any) => {
    const { email, name, username, password } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
  };
  const handleAvatarUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result as any);
        setAvatar(reader.result as any);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
        title={<Title level={2}>Register</Title>}
        style={{ width: 400 }}
      >
        <Form
          encType="multipart/form-data"
          name="signup"
          className="sign-up-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            style={{ marginBottom: "1.5rem" }}
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input
              prefix={<FontColorsOutlined className="site-form-item-icon" />}
              placeholder="Fullname"
            />
          </Form.Item>
          <Form.Item
            name="email"
            style={{ marginBottom: "1.5rem" }}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="avatar" style={{ marginBottom: "1.5rem" }}>
            <Row gutter={34} align="middle">
              <Col xs={4}>
                <img src={avatarPreview} alt="Avatar preview" />
              </Col>
              <Col xs={20}>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Avatar"
                  onChange={handleAvatarUpload}
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col xs={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>
              </Col>
              <Col xs={24} style={{ textAlign: "center", marginTop: "0.5rem" }}>
                Or already have an account?
                <Link to="/sign-up"> login now!</Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
