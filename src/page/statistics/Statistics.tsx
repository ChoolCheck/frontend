import React, { useState, useEffect } from "react";
import "./style/statistics.scss";
import StatisticsView from "./StatisticsView";
import * as type from "./type";

import {
  GetDateStatisticsApi,
  GetMonthStatisticsApi,
} from "../../api/statistics";
import Chart from "chart.js/auto";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
Chart.register(CategoryScale);

const Statistics = () => {
  const now = new Date();
  const yearmonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1) +
    "-";

  const start = yearmonth + "01";

  const end =
    yearmonth +
    (now.getDate() + 1 < 10 ? "0" + (now.getDate() + 1) : now.getDate() + 1);

  const [statisticsList, setStatisticsList] = useState<
    type.statisticListProps[] | undefined
  >();

  const [statisticsData, setStatisticsData] = useState<type.chartDataProps>();

  useEffect(() => {
    GetMonthStatisticsApi({ start, end, setStatisticsList, setStatisticsData });
  }, []);

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [yearToShow, setYearToShow] = useState(now.getFullYear());
  const [monthToShow, setMonthToShow] = useState(now.getMonth() + 1);

  const onChageStartInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const onChageEndInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const onGetResultClick = () => {
    GetDateStatisticsApi({
      startInput,
      endInput,
      setStatisticsList,
      setStatisticsData,
    });
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
    };
  };

  const onPrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let prevMonth, inputYearMonth, prevMonthlastDate;
    // console.log(new Date(2022, 12, 1)); 1월
    // console.log(new Date(2022, -1, 1)); 12월

    if (monthToShow == 1) {
      setYearToShow(yearToShow - 1);
      setMonthToShow(12);
      prevMonth = new Date(yearToShow - 1, 12, 1);
      inputYearMonth = yearToShow - 1 + "-12";
      prevMonthlastDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        0
      ).getDate();
    } else {
      setMonthToShow(monthToShow - 1);
      prevMonth = new Date(yearToShow, monthToShow - 1, 1);
      inputYearMonth =
        prevMonth.getFullYear() +
        "-" +
        (prevMonth.getMonth() < 10
          ? "0" + prevMonth.getMonth()
          : prevMonth.getMonth());

      prevMonthlastDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        0
      ).getDate();
    }

    const startInput = inputYearMonth + "-01";

    const endInput =
      inputYearMonth +
      "-" +
      (prevMonthlastDate < 10 ? "0" + prevMonthlastDate : prevMonthlastDate);

    GetDateStatisticsApi({
      startInput,
      endInput,
      setStatisticsList,
      setStatisticsData,
    });
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let nextMonth, inputYearMonth, nextMonthlastDate;

    if (monthToShow == 12) {
      setYearToShow(yearToShow + 1);
      setMonthToShow(1);
      nextMonth = new Date(yearToShow + 1, 0, 1);

      inputYearMonth = nextMonth.getFullYear() + "-01";

      nextMonthlastDate = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        0
      ).getDate();
    } else {
      setMonthToShow(monthToShow + 1);
      if (monthToShow == 11) {
        nextMonth = new Date(yearToShow, monthToShow, 1);
        inputYearMonth = nextMonth.getFullYear() + "-12";
      } else {
        nextMonth = new Date(yearToShow, monthToShow + 1, 1);
        inputYearMonth =
          nextMonth.getFullYear() +
          "-" +
          (nextMonth.getMonth() < 10
            ? "0" + nextMonth.getMonth()
            : nextMonth.getMonth());
      }

      nextMonthlastDate = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        0
      ).getDate();
    }
    console.log(nextMonth);

    const startInput = inputYearMonth + "-01";

    const endInput =
      inputYearMonth +
      "-" +
      (nextMonthlastDate < 10 ? "0" + nextMonthlastDate : nextMonthlastDate);

    GetDateStatisticsApi({
      startInput,
      endInput,
      setStatisticsList,
      setStatisticsData,
    });
  };

  const onGetThismonthClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setYearToShow(now.getFullYear());
    setMonthToShow(now.getMonth() + 1);
    GetMonthStatisticsApi({ start, end, setStatisticsList, setStatisticsData });
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
              type="button"
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
      {statisticsData && (
        <StatisticsView
          statisticsList={statisticsList}
          statisticsData={statisticsData}
        ></StatisticsView>
      )}
    </div>
  );
};

export default Statistics;
