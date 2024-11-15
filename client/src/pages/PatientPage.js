import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import PatientForm from "../components/patientForm";

const { Content } = Layout;

const PatientPage = () => {
  return (
    <Content style={{ padding: "0 48 px" }}>
      <div
        style={{
          minHeight: 280,
          height: "100%",
          padding: 24,
          margin: 40,
          background: "white",
          borderRadius: 10,
        }}
      >
        <div
          style={{ padding: "10px", display: "grid", justifyContent: "center" }}
        >
          <h1>Patient Page</h1>
        </div>
        <div
          style={{ padding: "10px", display: "grid" }}
        >
          <PatientForm />
        </div>
      </div>
    </Content>
  );
};

export default PatientPage;
