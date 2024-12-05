import React, { useState, useEffect } from 'react';
import { Card, Button, message, Typography } from 'antd';
import 'antd/dist/reset.css';
import { fetchDoctorDetails, saveDoctorAvailability } from '../api/services/doctorService';
import DoctorLayout from '../components/DoctorForm';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useUserContext } from "../context/UserContext";

const { Text } = Typography;

const DoctorPage = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [availabilityStartDate, setAvailabilityStartDate] = useState(dayjs());
  const [availabilityEndDate, setAvailabilityEndDate] = useState(dayjs());
  const { user } = useUserContext();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // const email = "edsnowden@mbbs.com";
        const email= user.email,
        const details = await fetchDoctorDetails(email);
        setDoctorDetails(details);
      } catch (error) {
        message.error('Error fetching doctor details');
      }
    };

    fetchDetails();
  }, []);

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setAvailabilityStartDate(dates[0]);
      setAvailabilityEndDate(dates[1]);
    } else {
      setAvailabilityStartDate(null);
      setAvailabilityEndDate(null);
    }
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
      startDate: availabilityStartDate.format('YYYY-MM-DD'), 
      endDate: availabilityEndDate.format('YYYY-MM-DD')  
    };

    try {
      await saveDoctorAvailability(availability);
      message.success('Availability saved successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      message.error('Error saving availability');
    }
  };

  return (
    <DoctorLayout>
      <Card title="Doctor Details" style={{ width: 600, marginBottom: '20px', padding: '20px', fontSize: '18px' }}>
        {doctorDetails ? (
          <>
            <Text style={{ fontSize: '18px' }}><strong>Name:</strong> {doctorDetails.name}</Text><br />
            <Text style={{ fontSize: '18px' }}><strong>Email:</strong> {doctorDetails.email}</Text><br />
            <Text style={{ fontSize: '18px' }}><strong>Specialisation:</strong> {doctorDetails.specialisation}</Text><br />
            <Text style={{ fontSize: '18px' }}><strong>Pincode:</strong> {doctorDetails.pincode}</Text><br />
          </>
        ) : (
          <Text style={{ fontSize: '18px' }}>Loading doctor details...</Text>
        )}
      </Card>
   
      <Card title="Select Your Availability" style={{ width: 600, padding: '20px', fontSize: '18px' }}>
        <div>
          <Text style={{ fontSize: '18px' }}>Select Availability Date Range:</Text>
          <DatePicker.RangePicker 
            onChange={handleDateRangeChange} 
            value={[availabilityStartDate, availabilityEndDate]} // Pass the dayjs objects directly
            format="YYYY-MM-DD" // Optional: to control the date format
            style={{ width: '100%' }} // Optional: to make it full width
          />
        </div>
        <Button type="primary" onClick={handleSaveAvailability} style={{ marginTop: '20px' }}>
          Save Availability
        </Button>
      </Card>
    </DoctorLayout>
  );
};

export default DoctorPage;