import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleTotalView = () => {
  const scheduleTotal = {
    totalList: [
      {
        day: "월",
        date: "01/02",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#ffd6a5",
      },
      {
        day: "월",
        date: "01/02",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "화",
        date: "01/03",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",

        backgroundColor: "#ffd6a5",
      },
      {
        day: "화",
        date: "01/03",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "수",
        date: "01/04",
        name: "김어진",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#ffd6a5",
      },

      {
        day: "목",
        date: "01/05",
        name: "고구마",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#fdffb6",
      },
      {
        day: "목",
        date: "01/05",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },

      {
        day: "금",
        date: "01/06",
        name: "옥수수",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "a0c4ff",
      },
      {
        day: "금",
        date: "01/06",
        name: "감자밭",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "bdb2ff",
      },

      {
        day: "토",
        date: "01/07",
        name: "감자밭",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#a0c4ff",
      },
      {
        day: "토",
        date: "01/07",
        name: "고구마",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#fdffb6",
      },

      {
        day: "일",
        date: "01/08",
        name: "고구마",
        time: "10:00-14:00",
        totalWorkTime: "4",
        backgroundColor: "#fdffb6",
      },
      {
        day: "일",
        date: "01/08",
        name: "이예빈",
        time: "13:00-18:00",
        totalWorkTime: "5",
        backgroundColor: "#ffadad",
      },
    ],
    employee: [
      { name: "김어진", backgroundColor: "#ffd6a5" },
      { name: "이예빈", backgroundColor: "#ffadad" },
      { name: "감자밭", backgroundColor: "#a0c4ff" },
      { name: "고구마", backgroundColor: "#fdffb6" },
      { name: "옥수수", backgroundColor: "#a0c4ff" },
    ],
  };
  return (
    <div className="ScheduleTotalView-top-container">
      <div className="ScheduleTotalView-left-container">
        <ul className="employee-list-ul">
          {scheduleTotal.employee.map((item) => (
            <li className="employee-list-li">
              <span
                className="employee-list-li-color"
                style={{ backgroundColor: item.backgroundColor }}
              >
                &nbsp;&nbsp;
              </span>
              <span className="employee-list-li-name"> {item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="ScheduleTotalView-rigt-container">
        <ul className="totalList-ul">
          {scheduleTotal.totalList.map((item) => (
            <li className="totalList-li">
              <span className="totalList-li-date">
                {item.date}({item.day})
              </span>
              <span
                className="totalList-li-name"
                style={{ backgroundColor: item.backgroundColor }}
              >
                {item.name}
              </span>
              <span className="totalList-li-time">{item.time}</span>
              <span className="totalList-li-totalWorkTime">
                {item.totalWorkTime}시간
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ScheduleTotalView;
