import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Typography,
  notification,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Import the CSS file with the correct path
import "../components/styles/RegistrationPage.css";

const { Text } = Typography;

const RegistrationPage = () => {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    minLength: false,
    capitalLetter: false,
    smallLetter: false,
    number: false,
    specialChar: false,
  });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to track the button disabled status
  const [age, setAge] = useState(null);
  const navigate = useNavigate();

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid({
      minLength: value.length >= 8,
      capitalLetter: /[A-Z]/.test(value),
      smallLetter: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const onFinish = (values) => {
    console.log("Form Values:", values);
    let data = {};
    if (userType === "patient") {
      data = {
        email: values.email,
        name: values.name,
        dob: values.dob,
        gender: values.gender,
        password: values.password,
      };
      fetch("http://127.0.0.1:8000/patients/addPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.body === "Patient already registered") {
            notification.error({
              message: "Registration Failed",
              description: "Patient already registered",
              duration: 3,
            });
          } else {
            console.log("Success:", data);
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          notification.error({
            message: "Registration Failed",
            description: "Please try again later",
            duration: 3,
          });
        });
    }
    if (userType === "doctor") {
      data = {
        email: values.email,
        name: values.name,
        dob: values.dob,
        gender: values.gender,
        password: values.password,
        specialisation: values.specialisation,
        pincode: values.pincode,
      };
      fetch("http://127.0.0.1:8000/doctors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("my data", data);
          if (data.status_code === 400) {
            notification.error({
              message: "Registration Failed",
              description: data.body,
              duration: 3,
            });
          } else {
            console.log("Success:", data);
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          notification.error({
            message: "Registration Failed",
            description: "Please try again later",
            duration: 3,
          });
        });
    }
  };

  const handleSwitchRole = () => {
    setUserType(userType === "doctor" ? "patient" : "doctor");
  };

  const isFormValid = () => {
    const fieldsValue = form.getFieldsValue();
    const confirmPassword = fieldsValue.confirm;
    const passwordMatch = password === confirmPassword;
    const allFieldsFilled = Object.values(fieldsValue).every(
      (value) => value !== undefined && value !== ""
    );
    return (
      passwordValid.minLength &&
      passwordValid.capitalLetter &&
      passwordValid.smallLetter &&
      passwordValid.number &&
      passwordValid.specialChar &&
      passwordMatch &&
      allFieldsFilled
    );
  };

  useEffect(() => {
    setIsButtonDisabled(!isFormValid());
  }, [form.getFieldsValue(), passwordValid]);

  // const onValuesChange = (changedValues, allValues) => {
  //   const confirmPassword = allValues.confirm;
  //   const passwordMatch = password === confirmPassword;
  //   const allFieldsFilled = Object.values(allValues).every(value => value !== undefined && value !== '');
  //   setIsButtonDisabled(
  //     !(passwordValid.minLength &&
  //       passwordValid.capitalLetter &&
  //       passwordValid.smallLetter &&
  //       passwordValid.number &&
  //       passwordValid.specialChar &&
  //       passwordMatch &&
  //       allFieldsFilled)
  //   );
  // };

  return (
    <div className="registration-container">
      <Form
        name="register"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        className="registration-form"
        layout="vertical"
      >
        <h2 className="registration-header">Register</h2>

        {!userType && (
          <Form.Item
            name="userType"
            label="Register As"
            rules={[
              { required: true, message: "Please select your user type" },
            ]}
            className="form-item"
          >
            <div className="role-selection-buttons">
              <Button
                type={userType === "patient" ? "primary" : "default"}
                onClick={() => handleUserTypeChange("patient")}
                block
              >
                Patient
              </Button>
              <Button
                type={userType === "doctor" ? "primary" : "default"}
                onClick={() => handleUserTypeChange("doctor")}
                block
              >
                Doctor
              </Button>
            </div>
          </Form.Item>
        )}

        {userType && (
          <Form.Item className="form-item">
            <Text
              type="secondary"
              style={{
                display: "block",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              You are registering as a{" "}
              {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </Text>
          </Form.Item>
        )}

        {userType && (
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name" }]}
            className="form-item"
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
        )}

        {userType && (
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            className="form-item"
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
        )}

        {userType && (
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password" }]}
            hasFeedback
            className="form-item"
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </Form.Item>
        )}

        {userType && (
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match");
                },
              }),
            ]}
            className="form-item"
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        )}

        {passwordFocused && (
          <Form.Item className="form-item">
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li style={{ color: passwordValid.minLength ? "green" : "red" }}>
                {passwordValid.minLength ? "✔️ " : "❌ "} Minimum 8 characters
              </li>
              <li
                style={{ color: passwordValid.capitalLetter ? "green" : "red" }}
              >
                {passwordValid.capitalLetter ? "✔️ " : "❌ "} At least one
                capital letter
              </li>
              <li
                style={{ color: passwordValid.smallLetter ? "green" : "red" }}
              >
                {passwordValid.smallLetter ? "✔️ " : "❌ "} At least one small
                letter
              </li>
              <li style={{ color: passwordValid.number ? "green" : "red" }}>
                {passwordValid.number ? "✔️ " : "❌ "} At least one number
              </li>
              <li
                style={{ color: passwordValid.specialChar ? "green" : "red" }}
              >
                {passwordValid.specialChar ? "✔️ " : "❌ "} At least one special
                character
              </li>
            </ul>
          </Form.Item>
        )}

        {userType === "doctor" && (
          <>
            <Form.Item
              name="specialisation"
              label="Specialisation"
              rules={[
                {
                  required: true,
                  message: "Please input your specialisation",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Specialisation" />
            </Form.Item>

            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please input your date of birth" },
              ]}
              className="form-item"
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => current && current > new Date()}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select your gender" }]}
              className="form-item"
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please input your address" }]}
              className="form-item"
            >
              <Input placeholder="Pincode" />
            </Form.Item>

            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[{ required: true, message: "Please input your pincode" }]}
              className="form-item"
            >
              <Input type="number" placeholder="Pincode" />
            </Form.Item>
          </>
        )}

        {userType === "patient" && (
          <>
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please input your date of birth" },
              ]}
              className="form-item"
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => current && current > new Date()}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select your gender" }]}
              className="form-item"
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}

        {/* {userType && (
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!isFormValid()} block>
            Register
          </Button>
        </Form.Item>
        )} */}

        {userType && (
          <Form.Item className="form-item">
            <Button
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
              className="registration-form-button"
              // disabled={isButtonDisabled}
            >
              Register
            </Button>
          </Form.Item>
        )}

        {userType && (
          <Form.Item className="switch-role-button">
            <Button type="link" onClick={handleSwitchRole}>
              {userType === "doctor"
                ? "Not a doctor? Switch to Patient Registration"
                : "Not a patient? Switch to Doctor Registration"}
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default RegistrationPage;
