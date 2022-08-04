import React from "react";
import { Menu, Avatar, Row, Col } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";

import { Input, Space } from "antd";
const { Search } = Input;
const onSearch = (value) => console.log(value);

const RightMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Search
        style={{
          marginTop: "1rem",
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
