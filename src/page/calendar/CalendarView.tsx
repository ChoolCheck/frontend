import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendarView.scss";
import * as type from "./type";

const CalendarView = ({
  calendarData,
  onCalendarClick,
  onCreateWorkcheckClick,
  onCreateMemoClick,
}: type.calendarViewProps) => {
  return (
    <div className="CalendarView-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        eventClick={onCalendarClick}
        customButtons={{
          createWorkCheck: {
            text: "출근부 작성하기",
            click: onCreateWorkcheckClick,
          },
          createMemo: {
            text: "메모 작성하기",
            click: function () {
              console.log("메모 작성하기");
            },
          },
        }}
        events={calendarData}
        themeSystem="Simplex"
        headerToolbar={{
          left: "prev",
          center: "createWorkCheck,title,createMemo",
          right: "next",
        }}
      ></FullCalendar>
    </div>
  );
};

export default CalendarView;
