import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendar.css";
import CalendarView from "./CalendarView";

function Calendar() {
  const dataList = [
    {
      title: "김어진 11-14",
      date: "2023-01-18",
      textColor: "#727272",
      backgroundColor: "#ffadad",
    },
    {
      title: "이예빈 14-18",
      date: "2023-01-18",
      textColor: "#727272",
      backgroundColor: "#ffd6a5",
    },
    {
      title: "이예빈 14-18",
      date: "2023-01-22",
      textColor: "black",
      backgroundColor: "#ffd6a5",
    },
  ];
  return (
    <div className="Home-top-container">
      <div className="Calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          events={dataList}
          themeSystem="Simplex"
          headerToolbar={{
            left: "",
            center: "prev,title,next",
            right: "today",
          }}
        ></FullCalendar>
      </div>
    </div>
  );
}

export default Calendar;
