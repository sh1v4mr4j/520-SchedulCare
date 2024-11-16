import React, { useState } from "react";
import { Button, Modal, Layout } from "antd";
import { PatientCalendar, DoctorCalendar } from "./Calendars";

export const DoctorCheckAvailabilityModal = ({ open, onClose }) => {
  const handleOk = () => {
    onClose();
  };
  return (
    <>
      <Modal
        open={open}
        centered
        title="Doctor's availability"
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button key="back" onClick={onClose}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Schedule Appointment
          </Button>,
        ]}
      >
        <DoctorCalendar />
      </Modal>
    </>
  );
};

export const PatientScheduleModal = ({ open, onClose }) => {
  const handleOk = () => {
    onClose();
  };
  return (
    <>
      <Modal
        open={open}
        title="Schedule an appointment"
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button key="back" onClick={onClose}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Schedule Appointment
          </Button>,
        ]}
      >
         <PatientCalendar />
      </Modal>
    </>
  );
};
