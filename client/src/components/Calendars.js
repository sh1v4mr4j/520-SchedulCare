import React, { useState } from "react";
import { Calendar, theme } from "antd";

export const DoctorCalendar = () => {
  return (
    <>
      <Calendar fullscreen={false} />
    </>
  );
};

export const PatientCalendar = () => {
  return <>This is Patient's Calendar</>;
};
