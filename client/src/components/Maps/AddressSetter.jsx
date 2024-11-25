import React, { useState } from "react";
import { OpenLocationCode } from "open-location-code";
import { Alert, Divider, Form, Input, Menu } from "antd";

const AddressSetter = ({
  label = "Search",
  disabled = false,
  setSelectedLocation,
}) => {
  // Alerts
  const [showAlert, setShowAlert] = useState(false);
  const [searching, setSearching] = useState(false);

  const [menuResults, setMenuResults] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");

  const onSubmit = (value) => {
    setSearching(true);
    setShowAlert(false);
    // search for places
    const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(
      value
    )}&format=jsonv2&limit=30`;
    fetch(url)
      .then((response) => response.json())
      .then((responses) => {
        // If no results found, set alert
        if (responses.length === 0) {
          setShowAlert(true);
        } else {
          const menuResultPlaces = [];
          let counter = 0;
          responses.forEach((response) => {
            const name = String(response.name);
            // Name + 2 for including the ',' and space after
            const address = String(response.display_name).substring(
              name.length + 2
            );
            const lat = response.lat;
            const lon = response.lon;
            menuResultPlaces.push({
              key: counter++,
              label: String(name).trim(),
              extra: address,
              location: { lat, lon },
              plus_code: new OpenLocationCode().encode(lat, lon),
            });
          });
          setMenuResults(menuResultPlaces);
        }
      })
      .finally(() => setSearching(false));
  };

  const onSubmitFailed = (errorInfo) => {
    setShowAlert(true);
  };

  const handleMenuClick = (e) => {
    setSelectedMenuId(e.key);
    setSelectedLocation(menuResults[e.key]);
  };

  return (
    <>
      <div>
        <Form
          style={{ maxWidth: 600 }}
          onFinish={onSubmit}
          onFinishFailed={onSubmitFailed}
        >
          {/* Search */}
          <Form.Item
            label={label}
            layout="horizontal"
            name="search"
            style={{ maxWidth: 400 }}
            rules={[
              { required: true, message: "Please input your search term!" },
            ]}
          >
            <Input.Search
              placeholder="Challenge me to find something ..."
              enterButton
              loading={searching}
              onSearch={onSubmit}
              disabled={disabled}
            />
          </Form.Item>
        </Form>
      </div>

      {/* List of results */}
      <div>
        {showAlert ? (
          <Alert
            message="No results found"
            type="warning"
            showIcon
            closable
            style={{ margin: "5px" }}
          />
        ) : (
          <></>
        )}
        {menuResults?.length === 0 ? (
          <></>
        ) : (
          <>
            <Divider
              plain
              orientation="left"
              variant="solid"
              style={{ fontSize: "small" }}
            >
              Select a location to view on the map
            </Divider>
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
    </>
  );
};

export default AddressSetter;
