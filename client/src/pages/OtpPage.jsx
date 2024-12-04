import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [otpSecret, setOtpSecret] = useState("");
  const navigate = useNavigate();

  // Get OTP secret from location or props (if passed from login page)
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.otpSecret) {
      setOtpSecret(location.state.otpSecret);
    } else {
      // Handle the case if secret is not available
      notification.error({
        message: "Error",
        description: "OTP secret not found!",
      });
    }
  }, [location]);

  const handleOtpSubmit = () => {
    if (!otpSecret) {
      notification.error({
        message: "OTP Error",
        description: "OTP secret is missing.",
      });
      return;
    }

    // Send the OTP and secret to the backend for verification
    fetch("http://127.0.0.1:8000/verify_otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, secret: otpSecret }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          notification.success({
            message: "OTP Verified",
            description: "You have successfully verified the OTP!",
          });
          // Redirect to the next page (e.g., dashboard)
          navigate("/dashboard");
        } else {
          notification.error({
            message: "OTP Verification Failed",
            description: "Invalid OTP. Please try again.",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "There was an error verifying the OTP.",
        });
      });
  };

  const url = "https://www.google.com";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <QRCodeCanvas
        value={url}
        size={256}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"Q"} // Error correction level
        includeMargin={true}
      />

      <Form
        name="otp"
        style={{ maxWidth: 400, width: "100%" }}
        layout="vertical"
        onFinish={handleOtpSubmit}
      >
        <h2 style={{ textAlign: "center" }}>OTP Verification</h2>

        {/* OTP Field */}
        <Form.Item
          name="otp"
          label="Enter OTP"
          rules={[{ required: true, message: "Please input your OTP!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Verify OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OTPPage;
