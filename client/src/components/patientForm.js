import React from "react";
import {
  Layout,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Avatar,
  Card,
  Flex,
} from "antd";
import DoctorCard from "./DoctorCard";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PatientForm = () => {
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Type">
          <Radio.Group>
            <Radio value="apple"> Patient </Radio>
            <Radio value="pear"> Doctor </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Patient Name">
          <Input />
        </Form.Item>
        <Form.Item label="DOB">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Pincode">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Doctors">
            <Flex gap ="middle" align="start">
                <DoctorCard />
            </Flex>
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit Changes</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PatientForm;
