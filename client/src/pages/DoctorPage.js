import React, { useState, useEffect } from "react";
import { Card, Button, message, Typography, Checkbox, Space } from "antd";
import "antd/dist/reset.css";
import {
  fetchDoctorDetails,
  saveDoctorAvailability,
} from "../api/services/doctorService";
import DoctorLayout from "../components/DoctorForm";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useUserContext } from "../context/UserContext";
import { useLocation } from "react-router-dom";

const { Text } = Typography;

const DoctorPage = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [availabilityStartDate, setAvailabilityStartDate] = useState(dayjs());
  const [availabilityEndDate, setAvailabilityEndDate] = useState(dayjs());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const { user } = useUserContext();
  const location = useLocation();

  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
  ];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const params = new URLSearchParams(location.search); // Parse query parameters
        const testEmail = params.get("test"); // Check if "test" query parameter exists
        const email = testEmail || user.email;
        const details = await fetchDoctorDetails(email);
        setDoctorDetails(details);
      } catch (error) {
        message.error("Error fetching doctor details");
      }
    };

    fetchDetails();
  }, []);

  const handleDateRangeChange = (dates) => {
    if (dates) {
      const [startDate, endDate] = dates;

      if (startDate.isAfter(endDate)) {
        message.error(
          "Start date cannot be later than the end date. Please select a valid range."
        );
        return; // Do not update the state if the dates are invalid
      }

      setAvailabilityStartDate(startDate);
      setAvailabilityEndDate(endDate);
    } else {
      setAvailabilityStartDate(null);
      setAvailabilityEndDate(null);
    }
  };

  const handleTimeSlotChange = (checkedValues) => {
    setSelectedTimeSlots(checkedValues);
  };

  const handleSaveAvailability = async () => {
    if (!doctorDetails) {
      message.error("Doctor details are not available.");
      return;
    }

    if (selectedTimeSlots.length === 0) {
      message.error("Please select at least one time slot.");
      return;
    }

    const availability = {
      doctor_email: doctorDetails.email,
      doctor_pincode: doctorDetails.pincode,
      startDate: availabilityStartDate.format("YYYY-MM-DD"),
      endDate: availabilityEndDate.format("YYYY-MM-DD"),
      timeSlots: selectedTimeSlots, // Send multiple selected time slots
    };

    try {
      await saveDoctorAvailability(availability);
      message.success("Availability saved successfully!");
    } catch (error) {
      console.error("Error saving availability:", error);
      message.error("Error saving availability");
    }
  };

  return (
    <DoctorLayout>
      <Card
        title="Doctor Details"
        style={{
          width: 600,
          marginBottom: "20px",
          padding: "20px",
          fontSize: "18px",
        }}
      >
        {doctorDetails ? (
          <>
            <Text style={{ fontSize: "18px" }}>
              <strong>Name:</strong> {doctorDetails.name}
            </Text>
            <br />
            <Text style={{ fontSize: "18px" }}>
              <strong>Email:</strong> {doctorDetails.email}
            </Text>
            <br />
            <Text style={{ fontSize: "18px" }}>
              <strong>Specialisation:</strong> {doctorDetails.specialisation}
            </Text>
            <br />
            <Text style={{ fontSize: "18px" }}>
              <strong>Pincode:</strong> {doctorDetails.pincode}
            </Text>
            <br />
          </>
        ) : (
          <Text style={{ fontSize: "18px" }}>Loading doctor details...</Text>
        )}
      </Card>

      <Card
        title="Select Your Availability"
        style={{ width: 600, padding: "20px", fontSize: "18px" }}
      >
        <div>
          <Text style={{ fontSize: "18px" }}>
            Select Availability Date Range:
          </Text>
          <DatePicker.RangePicker
            onChange={handleDateRangeChange}
            value={[availabilityStartDate, availabilityEndDate]}
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Text style={{ fontSize: "18px" }}>Select Time Slots:</Text>
          <Checkbox.Group
            options={timeSlots}
            value={selectedTimeSlots}
            onChange={handleTimeSlotChange}
            style={{ marginTop: "10px" }}
          />
        </div>
        <Button
          type="primary"
          onClick={handleSaveAvailability}
          style={{ marginTop: "20px" }}
        >
          Save Availability
        </Button>
      </Card>
    </DoctorLayout>
  );
};

export default DoctorPage;