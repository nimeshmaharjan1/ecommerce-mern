import React, { useEffect, useState } from "react";
import { Menu, Avatar, Row, Col } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/users/userSlice";

const RightMenu = ({ mode, history }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const redirectLogin = () => {
    console.log("User redirect", user);
    if (!user) {
      navigate("/sign-in");
    }
  };
  useEffect(() => {
    console.log(user);
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);
  return (
    <>
      {!isLoggedIn ? (
        <Avatar
          icon={<UserOutlined />}
          style={{ marginLeft: "1rem" }}
          onClick={redirectLogin}
        />
      ) : (
        <Menu mode={mode}>
          <Menu.SubMenu
            key="submenu"
            title={
              <>
                <Avatar size="large" src={user.avatar.url} />
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
            <Menu.Item
              key="log-out"
              onClick={() => {
                dispatch(logout());
                navigate("/sign-in");
              }}
            >
              <LogoutOutlined /> Logout
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      )}
    </>
  );
};

export default RightMenu;
