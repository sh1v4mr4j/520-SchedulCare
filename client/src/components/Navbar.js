import React from "react";
import { Link } from "react-router-dom";
import { Image, Layout, Menu } from "antd";
import SchedulCareLogo from "../images/SchedulCareLogo.png";

const { Header } = Layout;

const items1 = [
  { key: "1", label: "Home", to: "/patient" },
  { key: "2", label: "MapView", to: "/MapView" },
  {
    key: "3",
    label: "Chat",
    to: "/chatassist",
  },
  { key: "4", label: "Doctor", to: "/doctor" },
].map((item) => ({
  key: item.key,
  label: item.label,
  to: item.to,
  heading: item.heading,
}));

const Navbar = ({ selectedKey }) => {
  const currentItem = items1.find((item) => item.to === location.pathname);
  const isDoctorPage = location.pathname === '/doctor';
  const isPatientPage = location.pathname === '/patient';

  selectedKey = currentItem ? currentItem.key : "1";

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
          !(isDoctorPage || (isPatientPage && item.key === "4")) ? (
            <Menu.Item key={item.key}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ) : null
        ))}
      </Menu>
    </Header>
  );
};

export default Navbar;
