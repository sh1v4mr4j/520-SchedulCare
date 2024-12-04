import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, message, Typography } from 'antd';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'antd/dist/reset.css';
import { ENDPOINTS } from '../api/endpoint';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const DoctorPage = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [availabilityStartDate, setAvailabilityStartDate] = useState(new Date());
  const [availabilityEndDate, setAvailabilityEndDate] = useState(new Date());

  useEffect(() => {
    // Fetch doctor details from the backend
    const fetchDoctorDetails = async () => {
      try {
        const email = "edsnowden@mbbs.com";
        const response = await fetch(ENDPOINTS.getDoctorByEmail(email)); 

        if (!response.ok) {
          throw new Error('Failed to fetch doctor details');
        }
        const data = await response.json();
        setDoctorDetails(data.body);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        message.error('Error fetching doctor details');
      }
    };

    fetchDoctorDetails();
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
      const response = await fetch(ENDPOINTS.setDoctorAvailability, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(availability), 
      });

      if (!response.ok) {
        throw new Error('Failed to save availability');
      }

      message.success('Availability saved successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      message.error('Error saving availability');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#1890ff', color: '#fff', textAlign: 'center', padding: '10px 0' }}>
        <Title level={2} style={{ color: '#fff' }}>Doctor Availability Management</Title>
      </Header>
      <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          title="Doctor Details"
          style={{ width: 500, marginBottom: '20px' }}
        >
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

        
      </Content>
    </Layout>
  );
};

export default DoctorPage;