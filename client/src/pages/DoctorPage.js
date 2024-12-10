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

const { Text } = Typography;

// Main functional component for the Doctor Page
const DoctorPage = () => {
    // State variables for managing doctor details and availability
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [availabilityStartDate, setAvailabilityStartDate] = useState(dayjs());
  const [availabilityEndDate, setAvailabilityEndDate] = useState(dayjs());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const { user } = useUserContext();

  // Time slots for availability selection
  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
  ];

  // useEffect hook to fetch doctor details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Getting user's email from context
        const email = user.email;
        // Fetching doctor details using the email
        const details = await fetchDoctorDetails(email);
        // Updating state with fetched doctor details
        setDoctorDetails(details);
      } catch (error) {
        // Displaying error message if fetching fails
        message.error("Error fetching doctor details");
      }
    };

    fetchDetails();
  }, []);

  // Function to handle changes in the date range picker
  const handleDateRangeChange = (dates) => {
    if (dates) {
      const [startDate, endDate] = dates;
      // Validating that the start date is not after the end date
      if (startDate.isAfter(endDate)) {
        message.error(
          "Start date cannot be later than the end date. Please select a valid range."
        );
        return; // We do not want to update the state if the dates are invalid
      }

      // Updating state with valid start and end dates
      setAvailabilityStartDate(startDate);
      setAvailabilityEndDate(endDate);
    } else {
      // Resetting dates if no range is selected
      setAvailabilityStartDate(null);
      setAvailabilityEndDate(null);
    }
  };
  
  // Function to handle changes in selected time slots
  const handleTimeSlotChange = (checkedValues) => {
    setSelectedTimeSlots(checkedValues);
  };

  // Function to handle saving the availability
  const handleSaveAvailability = async () => {
    if (!doctorDetails) {
      message.error("Doctor details are not available.");
      return;
    }

    // Checking if at least one time slot is selected
    if (selectedTimeSlots.length === 0) {
      // Displaying error if no time slots are selected
      message.error("Please select at least one time slot.");
      return;
    }

    // Creating an availability object to send to the API
    const availability = {
      doctor_email: doctorDetails.email,
      doctor_pincode: doctorDetails.pincode,
      startDate: availabilityStartDate.format("YYYY-MM-DD"),
      endDate: availabilityEndDate.format("YYYY-MM-DD"),
      timeSlots: selectedTimeSlots, // Send multiple selected time slots
    };

    try {
      // Saving availability using the API
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

// Exporting the component for use in other parts of the application
export default DoctorPage;