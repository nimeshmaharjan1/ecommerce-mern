import React from "react";
import { Menu, Avatar, Row, Col } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";

import { Input, Space } from "antd";
import { useNavigate } from "react-router";
const { Search } = Input;

const RightMenu = ({ mode, history }) => {
  const navigate = useNavigate();
  const onSearch = (value) => {
    if (value.trim()) {
      navigate(`/products/${value}`);
    }
  };
  const menuItems = [
    {
      key: "center",
      icon: <CodeOutlined />,
      label: "个人中心",
    },
    {
      key: "settings",
      icon: <UserOutlined />,
      label: "个人设置",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];
  return (
    <Menu mode={mode}>
      <Search
        style={{
          marginTop: "1.1rem",
        }}
        placeholder="search..."
        onSearch={onSearch}
        enterButton
      />
      <Menu.SubMenu
        key="hello"
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">John Doe</span>
          </>
        }
      >
        <Menu.Item key="project">
          <CodeOutlined /> Projects
        </Menu.Item>
        <Menu.Item key="about-us">
          <UserOutlined /> Profile
        </Menu.Item>
        <Menu.Item key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
