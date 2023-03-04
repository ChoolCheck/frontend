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
}: type.calendarViewProps) => {
  // console.log(calendarTotalList);
  const prev = document.getElementsByClassName("fc-prev-button");
  const next = document.getElementsByClassName("fc-next-button");

  console.log(prev);
  console.log(prev.item(0));

  // prev.item(0)?.addEventListener("click", () => {
  //   onLeftButtonClick();
  // });
  // next.item(0)?.addEventListener("click", () => {
  //   onRightButtonClick();
  // });
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
            click: onCreateMemoClick,
          },
        }}
        events={calendarTotalList}
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
