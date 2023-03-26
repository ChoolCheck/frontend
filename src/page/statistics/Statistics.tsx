import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import StatisticsView from "./StatisticsView";

import {
  GetDateStatisticsApi,
  GetMonthStatisticsApi,
} from "../../api/statistics";

import * as type from "./type";
import "./style/statistics.scss";

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
    yearmonth + (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());

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

    if (monthToShow == 1) {
      setYearToShow(yearToShow - 1);
      setMonthToShow(12);
      prevMonth = new Date(yearToShow - 1, 12, 1);
      inputYearMonth = yearToShow - 1 + "-12";
    } else {
      setMonthToShow(monthToShow - 1);
      prevMonth = new Date(yearToShow, monthToShow - 1, 1);
      inputYearMonth =
        prevMonth.getFullYear() +
        "-" +
        (prevMonth.getMonth() < 10
          ? "0" + prevMonth.getMonth()
          : prevMonth.getMonth()) +
        "-";
    }

    prevMonthlastDate = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth(),
      0
    ).getDate();

    const startInput = inputYearMonth + "01";
    const endInput = inputYearMonth + prevMonthlastDate;

    GetDateStatisticsApi({
      startInput,
      endInput,
      setStatisticsList,
      setStatisticsData,
    });
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let nextMonth, inputYearMonth, nextMonthlastDate;

    if (monthToShow == 11) {
      setMonthToShow(monthToShow + 1);
      nextMonth = new Date(yearToShow, monthToShow, 1);
      inputYearMonth = nextMonth.getFullYear() + "-12";
      nextMonthlastDate = 31;
    } else {
      if (monthToShow == 12) {
        setYearToShow(yearToShow + 1);
        setMonthToShow(1);
        nextMonth = new Date(yearToShow + 1, 0, 1);
        inputYearMonth = nextMonth.getFullYear() + "-01";
      } else {
        setMonthToShow(monthToShow + 1);
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
      <StatisticsView
        yearToShow={yearToShow}
        monthToShow={monthToShow}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onChageStartInput={onChageStartInput}
        onChageEndInput={onChageEndInput}
        onGetResultClick={onGetResultClick}
        onGetThismonthClick={onGetThismonthClick}
      ></StatisticsView>
      {statisticsData && (
        <BarChart
          statisticsList={statisticsList}
          statisticsData={statisticsData}
        ></BarChart>
      )}
    </div>
  );
};

export default Statistics;
