import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/schedule-total.scss";
import * as type from "./type";
import * as enumType from "../../commonType/enum";

const ScheduleTotalView = ({
  onShowNameButtonClick,
  onShowTotalButtonClick,
  day,
  scheduleTotalObj,
}: type.scheduleTotalProps) => {
  console.log(scheduleTotalObj);
  return (
    <div className="ScheduleTotalView-top-container">
      <div className="ScheduleTotalView-left-container">
        <h2>직원별로 보기</h2>
        <ul className="employee-list-ul">
          {scheduleTotalObj.employee &&
            scheduleTotalObj.employee.map((item) => (
              <li className="employee-list-li">
                <span
                  className="employee-list-li-color"
                  style={{
                    backgroundColor: `#${
                      enumType.enumColor[
                        item.color as keyof typeof enumType.enumColor
                      ]
                    }`,
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
                </span>
                <button
                  className="employee-list-li-name"
                  onClick={() => onShowNameButtonClick(item.name)}
                >
                  {item.name}
                </button>
              </li>
            ))}
        </ul>
        <button className="employee-totalView" onClick={onShowTotalButtonClick}>
          전체보기
        </button>
      </div>
      <div className="ScheduleTotalView-right-container">
        <ul className="totalList-ul">
          {scheduleTotalObj.totalList &&
            scheduleTotalObj.totalList.map((item, idx) => (
              <li className="totalList-li">
                <span className="totalList-li-date">
                  {item.date}({day[idx]})
                </span>
                <span
                  className="totalList-li-name"
                  style={{
                    backgroundColor: `#${
                      enumType.enumColor[
                        item.color as keyof typeof enumType.enumColor
                      ]
                    }`,
                  }}
                >
                  {item.name}
                </span>
                <span className="totalList-li-time">{item.startTime}</span>
                <span className="totalList-li-time">{item.endTime}</span>
                <span className="totalList-li-totalWorkTime">
                  {parseInt(item.endTime) - parseInt(item.startTime)}시간
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default ScheduleTotalView;
