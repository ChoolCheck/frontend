import React, { useState } from "react";
import "./loading.scss";

interface totalworktimeProps {
  startTime: string;
  endTime: string;
  startDate?: string;
  endDate?: string;
}
const TotalWorkTime = ({
  startTime,
  endTime,
  startDate,
  endDate,
}: totalworktimeProps) => {
  let timeDifference;

  if (startDate && endDate) {
    timeDifference =
      Math.round(
        ((new Date(startDate + "T" + endTime).getTime() -
          new Date(endDate + "T" + startTime).getTime()) /
          3600000) *
          10
      ) / 10;
  } else {
    timeDifference =
      Math.round(
        ((new Date(startDate + "T" + endTime).getTime() -
          new Date(endDate + "T" + startTime).getTime()) /
          3600000) *
          10
      ) / 10;
  }

  // 오늘부터 다음날 새벽까지 근무하는 경우 시작시간이 종료시간보다 길기 때문에
  // 계산 결과가 음수인 경우 24를 더한다.
  const totalWorkTime =
    timeDifference < 0 ? timeDifference + 24 : timeDifference;

  return <span>{totalWorkTime}</span>;
};

export default TotalWorkTime;
