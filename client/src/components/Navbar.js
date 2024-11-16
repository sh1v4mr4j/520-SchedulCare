import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Image } from "antd";
import SchedulCareLogo from "../images/SchedulCareLogo.jpg";

const { Header, Content, Footer } = Layout;

const items1 = [
  { key: "1", label: "Home", to: "/patient" },
  { key: "2", label: "MapView", to: "/MapView" },
  { key: "3", label: "Chat", to: "/chatassist" },
  { key: "4", label: "Doctor", to: "/doctor" },
].map((item) => ({
  key: item.key,
  label: item.label,
  to: item.to,
}));

const Navbar = (selectedKey) => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Image src={SchedulCareLogo} width={55} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedKey]}
        style={{ flex: 1, minWidth: 0 }}
      >
        {items1.map((item) => (
          <Menu.Item key={item.key}>
            {/* Wrap each Menu.Item with Link to navigate to the respective route */}
            <Link to={item.to}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default Navbar;
