import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Menu,
  Row,
  Space,
  Switch,
} from "antd";
import mapService from "../../services/map-view/map-view-service";
import MapView from "../MapView";

const AddressPicker = () => {
  const { getUserLocation, getPlusCode } = mapService();
  const { searchNominatim } = mapService();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapParams, setMapParams] = useState({});
  const [mapMode, setMapMode] = useState("");
  const [mapToggle, setMapToggle] = useState(true);

  const [menuResults, setMenuResults] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const handleMenuClick = (e) => {
    setSelectedMenuId(e.key);
    if (mapToggle) {
      setMapParams({ q: encodeURIComponent(menuResults[e.key].label) });
    }
  };

  const toggleMapView = () => {
    setMapToggle(!mapToggle);
  };

  const onFinish = (values) => {
    const searchString = values.search;

    // search for places
    searchNominatim(searchString)
      .then((responses) => {
        const menuResultPlaces = [];
        let counter = 0;
        responses.forEach((response) => {
          const name = String(response.name);
          // Name + 2 for including the ',' and space after
          const address = String(response.display_name).substring(
            name.length + 2
          );
          menuResultPlaces.push({
            key: counter++,
            label: String(name).trim(),
            extra: address,
            location: { lat: response.lat, lon: response.lon },
          });
        });
        setMenuResults(menuResultPlaces);
      })
      .catch((error) => console.error(error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getUserLocation().getCurrentPosition(
      (position) => {
        setMapMode("place");
        setMapParams({
          q: encodeURIComponent(
            getPlusCode(position.coords.latitude, position.coords.longitude)
          ),
        });
        setMapLoaded(true);
      },
      (error) => {
        console.error(error);
        setMapMode("view");
        setMapParams({ center: "0, 0" });
        setMapLoaded(true);
      }
    );
  }, []);

  return (
    <>
      <Divider orientation="left" />
      <Row justify="center" gutter={[16, 16]}>
        {/*Spacing on the side*/}
        {/*<Col span={1}/>*/}

        {/* Search Box */}
        <Col span={13}>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* Search */}
            <Form.Item
              label="Search"
              name="search"
              style={{ maxWidth: 400 }}
              rules={[
                { required: true, message: "Please input your search term!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* trigger search */}
            <Form.Item label={null}>
              <Space direction="horizontal" align="center">
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Switch
                  checked={mapToggle}
                  onClick={toggleMapView}
                  checkedChildren="Show MapView"
                  unCheckedChildren="Hide MapView"
                />
              </Space>
            </Form.Item>
          </Form>

          {/* List of results */}
          <div>
            {menuResults?.length === 0 ? (
              <></>
            ) : (
              <>
                {mapToggle ? (
                  <p style={{ fontSize: "small" }}>
                    Select a location to view on the list
                  </p>
                ) : (
                  <></>
                )}
                <div
                  id="scrollableDiv"
                  style={{
                    maxHeight: 300,
                    overflow: "auto",
                    padding: "0 0px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                  }}
                >
                  <Menu
                    mode="inline"
                    onClick={handleMenuClick}
                    selectedKeys={[selectedMenuId]}
                    items={menuResults}
                  />
                </div>
              </>
            )}
          </div>
        </Col>

        {/* MapView */}
        <Col span={10}>
          {mapToggle && mapLoaded ? (
            <MapView mapMode={mapMode} mapParams={mapParams} />
          ) : (
            <></>
          )}
        </Col>

        <Col span={1} />
      </Row>
    </>
  );
};

export default AddressPicker;
