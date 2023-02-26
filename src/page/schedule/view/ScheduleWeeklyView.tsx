import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/schedule-weekly.scss";
import * as type from "../type";
import * as enumType from "../../../commonType/enum";

const ScheduleWeeklyView = ({
  weekScheduleList,
  onItemClick,
}: type.scheduleWeeklyProps) => {
  const day = ["월", "화", "수", "목", "금", "토", "일"];

  let now = new Date();
  let thisWeek: string[] = [];

  for (var i = 0; i < 7; i++) {
    let resultDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (i - now.getDay())
    );
    let m = String(Number(resultDay.getMonth()) + 1);
    let d = String(resultDay.getDate());

    m = m.length === 1 ? "0" + m : m;
    d = d.length === 1 ? "0" + d : d;

    thisWeek[i] = m + "/" + d;
  }

  return (
    <div className="ScheduleWeeklyView-top-container">
      <div className="card-container">
        {weekScheduleList &&
          weekScheduleList.map((item, idx) => (
            <div className="card">
              <p className="card-title">
                {day[idx]}요일 ({thisWeek[idx]})
              </p>

              <ul className="card-ul">
                {item.map((listItem, idx) => (
                  <li className="card-li" onClick={onItemClick(listItem.id)}>
                    <span
                      className="card-li-name"
                      style={{
                        backgroundColor: `#${
                          enumType.enumColor[
                            item[idx].color as keyof typeof enumType.enumColor
                          ]
                        }`,
                      }}
                    >
                      {listItem.name}
                    </span>

                    <span className="card-li-time">
                      {listItem.endTime.substring(0, 5)} -{" "}
                      {listItem.startTime.substring(0, 5)}
                    </span>
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
