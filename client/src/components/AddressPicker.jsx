import React from "react";
import {Form, Input} from "antd";

const AddressPicker = () => {

  const onFinish = (values) => {
    console.log(values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
      <>
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
          <Form.Item
              label="Search"
              name="search"
              rules={[{required: true, message: 'Please input your search term!'}]}>
            <Input/>
          </Form.Item>
        </Form>
      </>
  );
};

export default AddressPicker;
