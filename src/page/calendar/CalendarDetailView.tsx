import React, { useEffect, useState } from "react";
import * as type from "./type";
import "./calendarDetailView.scss";

const CalendarDetailView = ({
  calendarDetailData,
  detailModalOpen,
  setDetailModalOpen,
}: type.calendarDetailViewProps) => {
  const calendarData = {
    scheduleList: [
      {
        name: "김어진",
        time: "09-13",
        date: "2023-02-18",
        textColor: "#727272",
        backgroundColor: "#ffadad",
      },
      {
        name: "이예빈",
        time: "12-17",
        date: "2023-02-18",
        textColor: "#727272",
        backgroundColor: "#ffd6a5",
      },
    ],
    checkedWorkList: [
      {
        name: "김어진",
        time: "09-13",
        totalWorkTime: "4",
        date: "2023-02-18",
        textColor: "#727272",
        backgroundColor: "#ffadad",
      },
      {
        name: "이예빈",
        time: "12-18",
        totalWorkTime: "6",
        date: "2023-02-18",
        textColor: "#727272",
        backgroundColor: "#ffd6a5",
      },
    ],
    memo: "오늘 7시에 10명 단체 예약 있어요.",
  };

  return (
    <div className="CalendarDetailView-top-container">
      <div className="CalendarDetailView-container">
        <button
          className="close-button"
          onClick={() => setDetailModalOpen(false)}
        >
          닫기
        </button>

        <div className="checkedWorkList-container">
          <ul className="checkedWorkList-ul">
            {calendarData.checkedWorkList.map((item) => (
              <li className="checkedWorkList-li">
                <span
                  className="checkedWorkList-li-color"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  &nbsp;&nbsp;&nbsp;
                </span>
                <span className="checkedWorkList-li-name">{item.name}</span>
                <span className="checkedWorkList-li-time">{item.time} </span>
                <span className="checkedWorkList-li-totalWorkTime">
                  {item.totalWorkTime}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="scheduleList-container">
          <ul className="scheduleList-ul">
            {calendarData.scheduleList.map((item) => (
              <li className="scheduleList-li">
                <span
                  className="scheduleList-li-color"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  &nbsp;&nbsp;&nbsp;
                </span>
                <span className="scheduleList-li-name">{item.name}</span>
                <span className="scheduleList-li-tiem">{item.time} </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="memo-container">
          <h3 className="memo-container-header"> 메모</h3>
          <p className="memo-container-content"> {calendarData.memo}</p>
        </div>

        <button className="add-work-button">출근부 작성</button>
      </div>
    </div>
  );
};

export default CalendarDetailView;
