import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/schedule-weekly.scss";
import * as type from "./type";

const ScheduleWeeklyView = ({
  scheduleWeeklyList,
}: type.scheduleWeeklyProps) => {
  return (
    <div className="ScheduleWeeklyView-top-container">
      <div className="card-container">
        {scheduleWeeklyList.map((item) => (
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
