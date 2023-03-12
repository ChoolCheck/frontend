import React, { useState, useEffect } from "react";
import "./style/statistics.scss";
import StatisticsView from "./StatisticsView";
import * as type from "./type";

import {
  GetDateStatisticsApi,
  GetMonthStatisticsApi,
} from "../../api/statistics";

const Statistics = () => {
  const now = new Date();
  const start =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-01";

  const end =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-" +
    (now.getDate() + 1 < 10 ? "0" + (now.getDate() + 1) : now.getDate() + 1);

  const [statisticsList, setStatisticsList] = useState<
    type.statisticListProps[] | undefined
  >();

  useEffect(() => {
    GetMonthStatisticsApi({ start, end, setStatisticsList });
  }, []);

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const date = new Date();
  const [yearToShow, setYearToShow] = useState(date.getFullYear());
  const [monthToShow, setMonthToShow] = useState(date.getMonth() + 1);

  const onChageStartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const onChageEndInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const onGetResultClick = () => {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      GetDateStatisticsApi({ startInput, endInput, setStatisticsList });
    };
  };

  const onPrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startInput =
      prevMonth.getFullYear() +
      "-" +
      (prevMonth.getMonth() < 10
        ? "0" + (prevMonth.getMonth() + 1)
        : prevMonth.getMonth() + 1) +
      "-01";

    const prevMonthlastDate = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth() + 1,
      0
    ).getDate();

    const endInput =
      now.getFullYear() +
      "-" +
      now.getMonth() +
      "-" +
      (prevMonthlastDate < 10 ? "0" + prevMonthlastDate : prevMonthlastDate);

    if (monthToShow == 1) {
      setYearToShow(yearToShow - 1);
      setMonthToShow(12);
    } else {
      setMonthToShow(monthToShow - 1);
    }
    GetDateStatisticsApi({ startInput, endInput, setStatisticsList });
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //해당 날짜 데이터 요청 api
    if (monthToShow == 12) {
      setYearToShow(yearToShow + 1);
      setMonthToShow(1);
    } else {
      setMonthToShow(monthToShow + 1);
    }
  };

  const onGetThismonthClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setYearToShow(date.getFullYear());
    setMonthToShow(date.getMonth() + 1);
    GetMonthStatisticsApi({ start, end, setStatisticsList });
  };

  return (
    <div className="Statistics-top-container">
      <h2 className="Statistics-top-Header">
        <button className="prevButton" onClick={onPrevClick}>
          ◁
        </button>
        <span className="dateToShow">
          {yearToShow}년 {monthToShow}월
        </span>
        <button className="nextButton" onClick={onNextClick}>
          ▷
        </button>
        <span>근무 통계</span>
      </h2>
      <div className="Statistics-mid-Header">
        <div className="Statistics-LeftHeader-container">
          <span className="Statistics-LeftHeader">기간 내 조회</span>
          <form>
            <input
              className="Statistics-startInput"
              onChange={onChageStartInput}
              type="date"
              required
              aria-required="true"
            ></input>
            -
            <input
              className="Statistics-endInput"
              onChange={onChageEndInput}
              type="date"
              required
              aria-required="true"
            ></input>
            <button
              className="Statistics-getResultButton"
              onClick={onGetResultClick}
            >
              조회
            </button>
          </form>
        </div>
        <div className="Statistics-RightHeader-container">
          <button
            className="get-thismonth-statistics"
            onClick={onGetThismonthClick}
          >
            이번달 근무 통계 조회
          </button>
        </div>
      </div>
      <StatisticsView statisticsList={statisticsList}></StatisticsView>
    </div>
  );
};

export default Statistics;
