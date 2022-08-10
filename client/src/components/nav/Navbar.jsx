import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer, Input, Col, Row } from "antd";
import "../../styles/Navbar.scss";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };
  const { Search } = Input;
  // If you do not want to auto-close the mobile drawer when a path is selected
  // Delete or comment out the code block below
  // From here
  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);
  const navigate = useNavigate();
  // Upto here
  const onSearch = (value) => {
    console.log(value);
    if (value.trim()) {
      navigate(`/products/${value}`);
    }
  };

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <Link to="/">
              <h1 className="brand-font">Ecommerce</h1>
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <LeftMenu mode={"horizontal"} />
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <div className="rightMenu">
              <Row align="middle">
                <Col>
                  <Search
                    style={{ marginTop: "1.1rem" }}
                    placeholder="search..."
                    onSearch={onSearch}
                    enterButton
                  />
                </Col>
                <Col>
                  {" "}
                  <RightMenu mode={"horizontal"} />
                </Col>
              </Row>
            </div>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
