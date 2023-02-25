import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/schedule-weekly.scss";
import * as type from "./type";
import * as enumType from "../../commonType/enum";

const ScheduleWeeklyView = ({
  weekScheduleList,
  day,
}: type.scheduleWeeklyProps) => {
  return (
    <div className="ScheduleWeeklyView-top-container">
      <div className="card-container">
        {weekScheduleList &&
          weekScheduleList.map((item, idx) => (
            <div className="card">
              <p className="card-title">
                {day[idx]}요일 ({item.date})
              </p>
              <ul className="card-ul">
                {/* {item.schedule.map((listItem) => (
                  <li className="card-li">
                    <span
                      className="card-li-name"
                      style={{
                        backgroundColor: `#${
                          enumType.enumColor[
                            item.color as keyof typeof enumType.enumColor
                          ]
                        }`,
                      }}
                    >
                      {listItem.name}
                    </span>
                    <span className="card-li-time">{listItem.time}</span>
                  </li>
                ))} */}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ScheduleWeeklyView;
