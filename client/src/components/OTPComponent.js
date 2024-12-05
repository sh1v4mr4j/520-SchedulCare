import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import axios from 'axios';

const OTPComponent = ({ email, onOtpVerified }) => {
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Send OTP to the user's email
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/send-otp', { email });
      if (response.data.success) {
        notification.success({
          message: 'OTP Sent',
          description: 'OTP has been sent to your email.',
        });
        setIsOtpSent(true);
      }
    } catch (error) {
      notification.error({
        message: 'Error Sending OTP',
        description: 'Please try again later.',
      });
    }
    setLoading(false);
  };

  // Verify the OTP entered by the user
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/verify-otp', { email, otp });
      if (response.data.success) {
        onOtpVerified();
        notification.success({
          message: 'OTP Verified',
          description: 'Your OTP has been successfully verified.',
        });
      } else {
        notification.error({
          message: 'Invalid OTP',
          description: 'The OTP you entered is incorrect. Please try again.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error Verifying OTP',
        description: 'Please try again later.',
      });
    }
    setLoading(false);
  };

  return (
    <div>
      {!isOtpSent ? (
        <Button type="primary" onClick={handleSendOtp} loading={loading}>
          Send OTP
        </Button>
      ) : (
        <Form>
          <Form.Item
            label="Enter OTP"
            name="otp"
            rules={[{ required: true, message: 'Please enter the OTP' }]}
          >
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter OTP"
            />
          </Form.Item>
          <Button type="primary" onClick={handleVerifyOtp} loading={loading}>
            Verify OTP
          </Button>
        </Form>
      )}
    </div>
  );
};

export default OTPComponent;
