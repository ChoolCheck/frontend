import React, { useEffect, useState } from "react";
import * as type from "./type";
import "./calendarDetailView.scss";

const CalendarDetailView = ({
  calendarDetailData,
  detailModalOpen,
  setDetailModalOpen,
}: type.calendarDetailViewProps) => {
  return (
    <div className="CalendarDetailView-top-container">
      <div className="CalendarDetailView-container">
        <button
          className="close-button"
          onClick={() => setDetailModalOpen(false)}
        >
          닫기
        </button>

        <div className="list-top-container">
          <div className="checkedWorkList-container">
            <ul className="checkedWorkList-ul">
              {calendarDetailData.checkedWorkList.map((item) => (
                <li className="checkedWorkList-li">
                  <span
                    className="checkedWorkList-li-color"
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    &nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="checkedWorkList-li-name">{item.name}</span>
                  <span className="checkedWorkList-li-time">{item.time}</span>
                  <span className="checkedWorkList-li-totalWorkTime">
                    {item.totalWorkTime}시간
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="scheduleList-container">
            <ul className="scheduleList-ul">
              {calendarDetailData.scheduleList.map((item) => (
                <li className="scheduleList-li">
                  <span
                    className="scheduleList-li-color"
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    &nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="scheduleList-li-name">{item.name}</span>
                  <span className="scheduleList-li-time">{item.time} </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="memo-container">
          <h3 className="memo-container-header"> 메모</h3>
          <p className="memo-container-content"> {calendarDetailData.memo}</p>
        </div>

        <button className="add-work-button">출근부 작성</button>
      </div>
    </div>
  );
};

export default CalendarDetailView;
