import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Route, Routes, Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import LocationSearch from "../components/Maps/LocationSearch";
import Directions from "../components/Maps/Directions";
import GoogleMapsSearch from "../components/Maps/GoogleMapsSearch";

function MapViewPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    { key: "1", label: "Location Search", to: "location-search" },
    { key: "2", label: "Directions", to: "directions" },
    { key: "3", label: "Google Maps Search", to: "google-maps-search" },
  ];

  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuSelect = (key) => setSelectedKey(key);

  return (
    <Layout style={{ background: "white" }}>
      <Header style={{ background: colorBgContainer }}>
        <Menu
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={["1"]}
          mode="horizontal"
          style={{
            display: "flex",
            alignItems: "flex-center",
            justifyContent: "center",
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              {/* Wrap each Menu.Item with Link to navigate to the respective route */}
              <Link to={item.to} onClick={handleMenuSelect}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
        <div style={{ marginTop: "1em" }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default MapViewPage;
