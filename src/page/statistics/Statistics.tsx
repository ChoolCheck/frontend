import React, { useState, useEffect, useRef } from "react";
import "./style/statistics.scss";
import StatisticsView from "./StatisticsView";
import * as type from "./type";

import {
  GetDateStatisticsApi,
  GetMonthStatisticsApi,
} from "../../api/statistics";
import Chart from "chart.js/auto";

import { Bar } from "react-chartjs-2";

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
  const chartRef = useRef<HTMLCanvasElement>(null);

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

  const [statisticsData, setStatisticsData] = useState<type.chartDataProps>();

  useEffect(() => {
    GetMonthStatisticsApi({ start, end, setStatisticsList, setStatisticsData });
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
      GetDateStatisticsApi({
        startInput,
        endInput,
        setStatisticsList,
        setStatisticsData,
      });
    };
  };

  const onPrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let prevMonth;

    if (monthToShow == 1) {
      setYearToShow(yearToShow - 1);
      setMonthToShow(12);
      prevMonth = new Date(yearToShow - 1, 12, 1);
    } else {
      setMonthToShow(monthToShow - 1);
      prevMonth = new Date(yearToShow, monthToShow - 1, 1);
    }

    const startInput =
      prevMonth.getFullYear() +
      "-" +
      (prevMonth.getMonth() < 10
        ? "0" + prevMonth.getMonth()
        : prevMonth.getMonth()) +
      "-01";

    const prevMonthlastDate = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth(),
      0
    ).getDate();

    const endInput =
      now.getFullYear() +
      "-" +
      (prevMonth.getMonth() < 10
        ? "0" + prevMonth.getMonth()
        : prevMonth.getMonth()) +
      "-" +
      (prevMonthlastDate < 10 ? "0" + prevMonthlastDate : prevMonthlastDate);

    GetDateStatisticsApi({
      startInput,
      endInput,
      setStatisticsList,
      setStatisticsData,
    });
    resetGraph();
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let nextMonth;

    if (monthToShow == 12) {
      setYearToShow(yearToShow + 1);
      setMonthToShow(1);
      nextMonth = new Date(yearToShow + 1, 1, 1);
    } else {
      setMonthToShow(monthToShow + 1);
      nextMonth = new Date(yearToShow, monthToShow + 1, 1);
    }
    const startInput =
      nextMonth.getFullYear() +
      "-" +
      (nextMonth.getMonth() + 2 < 10
        ? "0" + (nextMonth.getMonth() + 2)
        : nextMonth.getMonth() + 2) +
      "-01";

    const nextMonthlastDate = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth() + 2,
      0
    ).getDate();

    const endInput =
      now.getFullYear() +
      "-" +
      (nextMonth.getMonth() + 2 < 10
        ? "0" + (nextMonth.getMonth() + 2)
        : nextMonth.getMonth() + 2) +
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
    setYearToShow(date.getFullYear());
    setMonthToShow(date.getMonth() + 1);
    GetMonthStatisticsApi({ start, end, setStatisticsList, setStatisticsData });
  };

  const resetGraph = () => {
    const canvasContainer = document.getElementById("canvasContainer");
    if (canvasContainer && canvasContainer?.firstChild !== null) {
      canvasContainer.removeChild(canvasContainer.firstChild);
    }

    const canvasElement = document.createElement("canvas");
    canvasElement.id = "results-graph";

    let ctx = canvasElement.getContext("2d");

    var x = canvasElement.width / 2;
    var y = canvasElement.height / 2;

    // ctx.canvas.width = $("#graph").width(); // resize to parent width
    // ctx.canvas.height = $("#graph").height(); // resize to parent height
    // ctx.font = '10pt Verdana';
    // ctx.textAlign = 'center';
    // ctx.fillText('This text is centered on the canvas', x, y);

    canvasContainer?.append(canvasElement);
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
      <StatisticsView
        statisticsList={statisticsList}
        chartRef={chartRef}
        statisticsData={statisticsData}
      ></StatisticsView>
    </div>
  );
};

export default Statistics;
