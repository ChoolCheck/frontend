import React, { useState, useEffect } from "react";
import axios from "axios";
import ScheduleWeeklyView from "./ScheduleWeeklyView";
import ScheduleTotalView from "./ScheduleTotalView";
import ToggleButton from "../../components/button/ToggleButton";
import "./schedule.scss";
const Schedule = () => {
  const [leftOrRight, setLeftOrRight] = useState(true);

  return (
    <div className="Schedule-top-container">
      <div className="Schedule-Header-container">
        <div className="Schedule-Header-left">
          <ToggleButton
            leftButtonTitle="이번주스케줄"
            rightButtonTitle="전체스케줄"
            leftOrRight={leftOrRight}
            setLeftOrRight={setLeftOrRight}
          ></ToggleButton>
        </div>
        <div className="Schedule-Header-right">
          <button className="add-Schedule-button page-header-button">
            스케줄추가
          </button>
        </div>
      </div>

      {leftOrRight ? (
        <ScheduleWeeklyView></ScheduleWeeklyView>
      ) : (
        <ScheduleTotalView></ScheduleTotalView>
      )}
    </div>
  );
};
export default Schedule;
