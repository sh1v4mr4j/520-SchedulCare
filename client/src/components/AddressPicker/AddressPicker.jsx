import React, {useState} from "react";
import {Button, Col, Divider, Form, Input, List, Row} from "antd";
import mapService from "../../services/map-view/map-view-service";
import {Location, Place} from "./models/Location";
import MapView from "../MapView";

const AddressPicker = () => {

  const {searchNominatim} = mapService();

  const [searchString, setSearchString] = useState(encodeURIComponent('India+Gate'));
  const [mapToggle, setMapToggle] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const onFinish = (values) => {
    const searchString = values.search;

    // set search string
    setSearchString(encodeURIComponent(searchString));

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
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

            {/* List of results */}
            <div>{searchResults?.length === 0 ? <></> : (
                <div
                    id="scrollableDiv"
                    style={{
                      maxHeight: 400,
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
            <MapView mapMode="place" mapParams={{q: searchString}}/>
          </Col>

          {/*Spacing on the side*/}
          <Col span={2}/>
        </Row>
      </>
  );
};

export default AddressPicker;
