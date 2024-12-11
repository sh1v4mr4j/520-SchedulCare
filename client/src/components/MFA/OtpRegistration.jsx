import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Layout, Row, Col } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Content } from "antd/es/layout/layout";
import { getRegisterUrl, verifyOtp } from "../../api/services/mfaService";
import { useUserContext } from "../../context/UserContext";

const OtpRegistration = () => {
  const [otp, setOtp] = useState("");
  const [mfaRegisterUrl, setMfaRegisterUrl] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const getMfaRegisterUrl = () => {
    const email = user.email;
    const secret = user.secret;
    getRegisterUrl(secret, email)
      .then((response) => {
        if (response.status_code === 200) {
          setMfaRegisterUrl(response.body);
          setShowQRCode(true);
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
      });
  };

  const handleMfaRegistration = (values) => {
    const { otp } = values;
    verifyOtp(user.secret, otp).then((response) => {
      if (response.status_code === 200) {
        notification.success({
          message: "Success",
          description: response.message,
        });
        navigate(user.type === "doctor" ? "/doctor" : "/patient");
      } else {
        notification.error({
          message: "Error",
          description: response.message,
        });
      }
    });
  };

  useEffect(() => {
    getMfaRegisterUrl();
  }, []);

  return (
    <>
      <Layout style={{ backgroundColor: "white" }}>
        <Content>
          <Row justify="center" gutter={[16, 16]}>
            <h2>MFA Registration</h2>
          </Row>
          <Row justify="center" gutter={[16, 16]}>
            <Col span={20}>
              <p
                style={{ textAlign: "center", fontSize: "16px", color: "#555" }}
              >
                To complete registration, please install the Google
                Authenticator app on your mobile device. Scan the QR code below
                to link your account.
              </p>
            </Col>
          </Row>
          <Row justify="center" gutter={[16, 16]}>
            <Col span={10}>
              {showQRCode ? (
                <QRCodeSVG
                  value={mfaRegisterUrl}
                  size={256}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"Q"} // Error correction level
                  marginSize={true}
                />
              ) : (
                <></>
              )}
            </Col>
            <Col span={10}>
              <Form
                name="otp"
                style={{ maxWidth: 400, width: "100%" }}
                layout="vertical"
                onFinish={handleMfaRegistration}
              >
                <h2 style={{ textAlign: "center" }}>OTP Verification</h2>

                {/* OTP Field */}
                <Form.Item
                  name="otp"
                  label="Enter OTP from your Authenticator app"
                  rules={[
                    { required: true, message: "Please input your OTP!" },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    id="otp"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    disabled={!otp}
                    id="verify-otp"
                  >
                    Verify OTP
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default OtpRegistration;
