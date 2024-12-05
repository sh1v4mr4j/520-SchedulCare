import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { DoctorCalendar } from "./Calendars";
import { useGetSchedule } from "../hooks/useGetSchedule";
import dayjs from "dayjs";

export const DoctorCheckAvailabilityModal = ({ open, onClose, email }) => {
  const [isModalOpen, setIsModalOpen] = useState(open);
  const {
    data: scheduleData,
    loading: scheduleLoading,
    error: scheduleError,
  } = useGetSchedule(email);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const onSelect = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (open) {
      setIsModalOpen(true);
    }
  }, [email, open]);

  const handleOk = () => {
    onClose();
  };
  return (
    <>
      <Modal
        loading={scheduleLoading}
        open={isModalOpen}
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
        <DoctorCalendar
          loading={scheduleLoading}
          schedule={scheduleData}
          onSelect={onSelect}
        />
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
        loading={scheduleLoading}
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
