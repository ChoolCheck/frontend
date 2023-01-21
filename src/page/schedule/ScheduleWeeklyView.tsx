import React, { useState, useEffect } from "react";
import axios from "axios";
import "./schedule-weekly.scss";
const ScheduleWeeklyView = () => {
  const scheduleWeekly = [
    {
      day: "월요일",
      date: "01/02",
      schedule: [
        { name: "김어진", time: "10:00-14:00", backgroundColor: "#ffd6a5" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
    {
      day: "화요일",
      date: "01/03",
      schedule: [
        { name: "김어진", time: "10:00-14:00", backgroundColor: "#ffd6a5" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
    {
      day: "수요일",
      date: "01/04",
      schedule: [
        { name: "김어진", time: "10:00-14:00", backgroundColor: "#ffd6a5" },
      ],
    },
    {
      day: "목요일",
      date: "01/05",
      schedule: [
        { name: "고구마", time: "10:00-14:00", backgroundColor: "#fdffb6" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
    {
      day: "금요일",
      date: "01/06",
      schedule: [
        { name: "옥수수", time: "10:00-14:00", backgroundColor: "#a0c4ff" },
        { name: "감자밭", time: "13:00-18:00", backgroundColor: "#bdb2ff" },
      ],
    },
    {
      day: "토요일",
      date: "01/07",
      schedule: [
        { name: "감자밭", time: "10:00-14:00", backgroundColor: "#a0c4ff" },
        { name: "고구마", time: "13:00-18:00", backgroundColor: "#fdffb6" },
      ],
    },
    {
      day: "일요일",
      date: "01/08",
      schedule: [
        { name: "고구마", time: "10:00-14:00", backgroundColor: "#fdffb6" },
        { name: "이예빈", time: "13:00-18:00", backgroundColor: "#ffadad" },
      ],
    },
  ];
  return (
    <div className="ScheduleWeeklyView-top-container">
      <div className="card-container">
        {scheduleWeekly.map((item) => (
          <div className="card">
            <p className="card-title">
              {item.day}({item.date})
            </p>{" "}
            <ul className="card-ul">
              {item.schedule.map((listItem) => (
                <li className="card-li">
                  <span
                    className="card-li-name"
                    style={{ backgroundColor: listItem.backgroundColor }}
                  >
                    {listItem.name}
                  </span>
                  <span className="card-li-time">{listItem.time}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ScheduleWeeklyView;
