import React, { useState } from "react";
import { Col, Row } from "antd";
import MapView from "./MapView";
import AddressSetter from "./AddressSetter";

const LocationSearch = ({ customHandleLocation = undefined }) => {
  const [mapParams, setMapParams] = useState({});
  const [mapMode, setMapMode] = useState("userLoc");

  // Use this with child component
  const handleLocationChange = (location) => {
    if (customHandleLocation) {
      customHandleLocation(location);
    }
    setMapParams({ q: encodeURIComponent(location.label) });
    setMapMode("place");
  };

  return (
    <>
      <Row justify="center" gutter={[16, 16]}>
        {/*Spacing on the side*/}
        {/*<Col span={1}/>*/}

        {/* Search Box */}
        <Col span={13}>
          <AddressSetter setSelectedLocation={handleLocationChange} />
        </Col>

        {/* MapView */}
        <Col span={10}>
          <MapView mapMode={mapMode} mapParams={mapParams} />
        </Col>
        <Col span={1} />
      </Row>
    </>
  );
};

export default LocationSearch;
