import React, { useState } from "react";
import { Col, Divider, Layout, Radio, Row, Space, Steps } from "antd";
import MapView from "./MapView";
import { Content } from "antd/es/layout/layout";
import AddressSetter from "./AddressSetter";
import styles from "./Maps.module.css";

const Directions = () => {
  const [mapParams, setMapParams] = useState({});
  const [mapMode, setMapMode] = useState("userLoc");
  const [currentStep, setCurrentStep] = useState(0);

  const [source, setSource] = useState();
  const [destination, setDestination] = useState();

  const derieveMapParams = (mode = "driving") => {
    // If both source and destination are set then get directions
    if (source && destination) {
      setMapParams({
        origin: encodeURIComponent(source.label),
        destination: encodeURIComponent(destination.label),
        mode,
      });
      setMapMode("directions");
    } else if (source) {
      setMapMode("place");
      setMapParams({ q: encodeURIComponent(source.label) });
    } else if (destination) {
      setMapMode("place");
      setMapParams({ q: encodeURIComponent(destination.label) });
    } else {
      setMapMode("userLoc");
      setMapParams({});
    }
  };

  const handleSourceLocationChange = (location) => {
    console.log(location);
    setSource(location);
    setCurrentStep(1);
    derieveMapParams();
  };

  const handleDestinationLocationChange = (location) => {
    console.log(location);
    setDestination(location);
    setCurrentStep(2);
    derieveMapParams();
  };

  const updateDirections = (e) => {
    console.log(e.target.value);
    derieveMapParams(e.target.value);
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Content>
        <Layout style={{ backgroundColor: "white" }}>
          <div style={{ marginTop: "1em" }} />
          <Steps
            direction="horizontal"
            size="small"
            current={currentStep}
            items={[
              { title: "Select Source" },
              { title: "Select Destination" },
              { title: "Get Directions" },
            ]}
          />
          <Content>
            <Row justify="center" gutter={[16, 16]}>
              {/*Spacing on the side*/}
              {/*<Col span={1}/>*/}

              {/* Source */}
              <Col span={12}>
                <h3>Source</h3>
                <AddressSetter
                  formName="source"
                  setSelectedLocation={handleSourceLocationChange}
                />
              </Col>

              {/* Destination */}
              <Col span={12}>
                <h3>Destination</h3>
                <AddressSetter
                  formName="destination"
                  setSelectedLocation={handleDestinationLocationChange}
                />
              </Col>
            </Row>
            <div style={{ marginTop: "1em" }} />
            <Divider orientation="center">Directions</Divider>
            <div style={{ marginTop: "1em" }} />
            <Row justify="center" align="center">
              {mapMode || true === "directions" ? (
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  onChange={updateDirections}
                  defaultValue={"driving"}
                >
                  <Radio value="driving">Driving</Radio>
                  <Radio value="walking">Walking</Radio>
                  <Radio value="bicycling">Bicycling</Radio>
                  <Radio value="transit">Transit</Radio>
                  <Radio value="flying">Flying</Radio>
                </Radio.Group>
              ) : (
                <></>
              )}
            </Row>
            <div style={{ marginTop: "1em" }} />
            {/* <div style={{ marginRight: "3em" }} /> */}
            <Row justify="center" align="center">
              <MapView mapMode={mapMode} mapParams={mapParams} />
            </Row>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Directions;
