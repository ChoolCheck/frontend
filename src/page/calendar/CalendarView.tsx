import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./style/calendarView.scss";
import * as type from "./type";

const CalendarView = ({
  calendarTotalList,
  onCalendarClick,
  onCreateWorkcheckClick,
  onCreateMemoClick,
  onLeftButtonClick,
  onRightButtonClick,
}: type.calendarViewProps) => {
  console.log(calendarTotalList);
  return (
    <div className="CalendarView-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        eventClick={onCalendarClick}
        customButtons={{
          customPrevButton: {
            text: "prev",
            click: onLeftButtonClick,
          },
          customNextButton: {
            text: "next",
            click: onRightButtonClick,
          },
          createWorkCheck: {
            text: "출근부 작성하기",
            click: onCreateWorkcheckClick,
          },
          createMemo: {
            text: "메모 작성하기",
            click: onCreateMemoClick,
          },
        }}
        events={calendarTotalList}
        themeSystem="Simplex"
        headerToolbar={{
          left: "customPrevButton",
          center: "createWorkCheck,title,createMemo",
          right: "customNextButton",
        }}
      ></FullCalendar>
    </div>
  );
};

export default CalendarView;
