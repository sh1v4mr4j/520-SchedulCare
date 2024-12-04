import React, { useState, useEffect } from 'react';
import { Card, Button, message, Typography } from 'antd';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'antd/dist/reset.css';
import { fetchDoctorDetails, saveDoctorAvailability } from '../api/services/doctorService';
import DoctorLayout from '../components/DoctorForm';

const { Text } = Typography;

const DoctorPage = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [availabilityStartDate, setAvailabilityStartDate] = useState(new Date());
  const [availabilityEndDate, setAvailabilityEndDate] = useState(new Date());

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const email = "edsnowden@mbbs.com";
        const details = await fetchDoctorDetails(email);
        setDoctorDetails(details);
      } catch (error) {
        message.error('Error fetching doctor details');
      }
    };

    fetchDetails();
  }, []);

  const handleStartDateChange = (selectedDate) => {
    setAvailabilityStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setAvailabilityEndDate(selectedDate);
  };

  const handleSaveAvailability = async () => {
    if (!doctorDetails) {
      message.error('Doctor details are not available.');
      return;
    }

    // Check if the end date is before the start date
    if (availabilityEndDate < availabilityStartDate) {
      message.error('End date cannot be before the start date. Please select the dates again.');
      return;
    }

    const availability = {
      doctor_email: doctorDetails.email, 
      doctor_pincode: doctorDetails.pincode, 
      startDate: availabilityStartDate.toISOString().split('T')[0], 
      endDate: availabilityEndDate.toISOString().split('T')[0]   
    };

    try {
      await saveDoctorAvailability(availability); // Use the new service function
      message.success('Availability saved successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      message.error('Error saving availability');
    }
  };

  return (
    <DoctorLayout>
      <Card title="Doctor Details" style={{ width: 500, marginBottom: '20px' }}>
        {doctorDetails ? (
          <>
            <Text><strong>Name:</strong> {doctorDetails.name}</Text><br />
            <Text><strong>Email:</strong> {doctorDetails.email}</Text><br />
            <Text><strong>Specialisation:</strong> {doctorDetails.specialisation}</Text><br />
            <Text><strong>Pincode:</strong> {doctorDetails.pincode}</Text><br />
          </>
        ) : (
          <Text>Loading doctor details...</Text>
        )}
      </Card>
   
      <Card title="Select Your Availability" style={{ width: 500 }}>
        <div>
          <Text>Select Availability Start Date:</Text>
          <Calendar onChange={handleStartDateChange} value={availabilityStartDate} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Text>Select Availability End Date:</Text>
          <Calendar onChange={handleEndDateChange} value={availabilityEndDate} />
        </div>
        <Button type="primary" onClick={handleSaveAvailability} style={{ marginTop: '20px' }}>
          Save Availability
        </Button>
      </Card>
    </DoctorLayout>
  );
};

export default DoctorPage;