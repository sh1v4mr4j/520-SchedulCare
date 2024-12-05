import React from "react";
import {
  Layout,
  Button,
  DatePicker,
  Form,
  Input,
  Flex,
} from "antd";
import DoctorCard from "./DoctorCard";
import { useDoctorsByPincode } from "../hooks/useDoctor";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PatientForm = ({loading, patientData}) => {
  const {data: doctorData, loading: doctorLoading, error:doctorError} = useDoctorsByPincode(patientData.pincode)

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        loading={loading}
      >
        <Form.Item label="Patient Name">
          <div>{patientData.name}</div>
        </Form.Item>
        <Form.Item label="DOB">
        <div>{patientData.dob}</div>
        </Form.Item>
        <Form.Item label="Pincode">
          <div>{patientData.pincode}</div>
        </Form.Item>
        <Form.Item label="Gender">
          <div>{patientData.gender}</div>
        </Form.Item>
        <Form.Item label="Doctors">
            <Flex style={{gap:"middle",align:"start"}}>
              <DoctorCard loading={doctorLoading} data={doctorData}/>
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
