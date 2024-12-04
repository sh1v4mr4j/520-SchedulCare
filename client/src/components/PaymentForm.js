import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ENDPOINTS } from "../api/endpoint";
import "./styles/Modal.css";

// Renders errors or successful transactions on the screen.
const Message = ({ content }) => <p>{content}</p>;

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className> {title}</h2>
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export const PaymentForm = () => {
  const initialOptions = {
    "client-id": "test",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const updateModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const sendEmail = async (transaction) => {
    try {
      const url = ENDPOINTS.sendEmail;
      const emailResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "nkparikh@umass.edu",
          subject: "Payment Confirmation",
          message: `Thank you for your purchase! Your transaction ID is ${transaction.id}. Amount: $${transaction.amount.value}.`,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }
      const emailData = await emailResponse.json();
      console.log("Email sent successfully:", emailData);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage(`Error sending email: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={async () => {
            try {
              const url = ENDPOINTS.createOrder;
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cart: [
                    {
                      id: "YOUR_PRODUCT_ID",
                      name: "YOUR_PRODUCT_ID",
                      price: 100.0,
                      quantity: 1,
                    },
                  ],
                }),
              });

              const responseOrderData = await response.json();
              const orderData = JSON.parse(responseOrderData);

              if (orderData && orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
              updateModal(
                "Transaction Failed",
                `Could not initiate PayPal Checkout: ${error.message}`
              );
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const url = ENDPOINTS.capturePayment(data?.orderID);
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const responseOrderData = await response.json();
              const orderData = JSON.parse(responseOrderData);

              console.log("Order Data Response:", orderData);
              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];

                if (transaction.status === "COMPLETED") {
                  await sendEmail(transaction);
                }

                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}.`
                );
                updateModal(
                  "Transaction Successful",
                  `Transaction ${transaction.status}: ${transaction.id}. Amount: $${transaction.amount.value}`
                );
                console.log("Capture result", orderData);
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
              updateModal(
                "Transaction Failed",
                `Sorry, your transaction could not be processed: ${error.message}`,
                "error"
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        content={modalContent}
      />
      <Message content={message} />
    </div>
  );
};
