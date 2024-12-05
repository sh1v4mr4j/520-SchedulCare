import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { PaymentForm } from "../components/PaymentForm";

const PaymentPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "100vh",
        }}
      >
        <Heading heading="Welcome to the payment Page" />
        <PaymentForm />
      </div>
    </>
  );
};

export default PaymentPage;
