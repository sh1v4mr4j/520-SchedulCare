import React, {useEffect, useState} from "react";
import {Button, Col, Divider, Form, Input, List, Row, Space, Switch} from "antd";
import mapService from "../../services/map-view/map-view-service";
import {Location, Place} from "./models/Location";
import MapView from "../MapView";

const AddressPicker = () => {

  const {searchNominatim, getUserLocation, getPlusCode} = mapService();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapParams, setMapParams] = useState({});
  const [mapMode, setMapMode] = useState('');
  const [mapToggle, setMapToggle] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const toggleMapView = () => {
    setMapToggle(!mapToggle);
  }

  const onFinish = (values) => {
    const searchString = values.search;

    // set search string
    setMapParams({q: encodeURIComponent(searchString)});

    // search for places
    searchNominatim(searchString).then(responses => {
      const resultPlaces = [];
      responses.forEach(response => {
        const name = String(response.name);
        // Name + 2 for including the ',' and space after
        const address = String(response.display_name).substring(name.length + 2);
        resultPlaces.push(new Place(name, address, new Location(response.lat, response.lon)));
      });
      setSearchResults(resultPlaces);
    }).catch(error => console.error(error));
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  useEffect(() => {
    getUserLocation().getCurrentPosition(
        (position) => {
          setMapMode('place');
          setMapParams({q: encodeURIComponent(getPlusCode(position.coords.latitude, position.coords.longitude))});
          setMapLoaded(true);
        },
        (error) => {
          console.error(error);
          setMapMode('view');
          setMapParams({center: '0, 0'});
          setMapLoaded(true);
        });
  }, []);

  return (
      <>
        <Divider orientation="left"/>
        <Row justify="center" gutter={[16, 16]}>
          {/*Spacing on the side*/}
          <Col span={2}/>

          {/* Search Box */}
          <Col span={10}>
            <Form
                name="basic"
                style={{maxWidth: 600}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

              {/* Search */}
              <Form.Item
                  label="Search"
                  name="search"
                  style={{maxWidth: 400}}
                  rules={[{required: true, message: 'Please input your search term!'}]}>
                <Input/>
              </Form.Item>

              {/* trigger search */}
              <Form.Item label={null}>
                <Space direction="horizontal" align="center">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Switch checked={mapToggle} onClick={toggleMapView} checkedChildren="Show MapView"
                          unCheckedChildren="Hide MapView"/>
                </Space>
              </Form.Item>
            </Form>

            {/* List of results */}
            <div>{searchResults?.length === 0 ? <></> : (
                <div
                    id="scrollableDiv"
                    style={{
                      maxHeight: 300,
                      overflow: 'auto',
                      padding: '0 16px',
                      border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                  <List
                      dataSource={searchResults}
                      renderItem={result => (
                          <List.Item>
                            <List.Item.Meta
                                title={<a href=""><i className="bi bi-geo-alt-fill"
                                                     style={{marginRight: '5px'}}></i>{result.name}</a>}
                                description={result.address}
                            />
                          </List.Item>
                      )}>

                  </List>
                </div>
            )}</div>
          </Col>

          {/* MapView */}
          <Col span={10}>
            {mapToggle && mapLoaded ? <MapView mapMode={mapMode}
                                               mapParams={mapParams}/> : <></>}
          </Col>

          {/*Spacing on the side*/}
          <Col span={2}/>
        </Row>
      </>
  );
};

export default AddressPicker;
