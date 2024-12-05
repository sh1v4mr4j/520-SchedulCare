import React, { useState } from "react";
import { Calendar, theme } from "antd";
import dayjs from 'dayjs';

export const DoctorCalendar = ({loading, schedule, onSelect}) => {
  let startDate = dayjs(schedule.startDate);
  let endDate = dayjs(schedule.endDate);

  return (
    <>
      <Calendar fullscreen={false} onSelect={onSelect} loading={loading} validRange={[startDate,endDate]} />
    </>
  );
};