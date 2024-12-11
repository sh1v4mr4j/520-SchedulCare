import React from "react";
import Heading from "../components/Heading";
import { PaymentForm } from "../components/PaymentForm";

// Functional component fo rendering the payment form
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
