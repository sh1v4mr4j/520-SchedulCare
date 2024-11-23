import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";

function MapViewPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      label: "Location Search",
      to: "location-search",
      iconClass: "bi bi-geo-alt",
    },
    {
      key: "2",
      label: "Directions",
      to: "directions",
      iconClass: "bi bi-signpost-split",
    },
  ];

  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuSelect = (e) => {
    setSelectedKey(e.key);
  };

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
            <Menu.Item id={item.key} key={item.key} onClick={handleMenuSelect}>
              {/* Wrap each Menu.Item with Link to navigate to the respective route */}
              <Link to={item.to}>
                <i className={item.iconClass} style={{ marginRight: "3px" }} />
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
        <div style={{ marginTop: "1em" }} />
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MapViewPage;
