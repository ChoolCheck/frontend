import "../style/statistics.scss";
import * as type from "../type";

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

const StatisticsView = ({
  onPrevClick,
  yearToShow,
  monthToShow,
  onNextClick,
  onChageStartInput,
  onChageEndInput,
  onGetResultClick,
  onGetThismonthClick,
}: type.statisticsViewProps) => {
  return (
    <div>
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
        <form>
          <input
            className="startInput"
            onChange={onChageStartInput}
            type="date"
            required
            aria-required="true"
          ></input>
          -
          <input
            className="endInput"
            onChange={onChageEndInput}
            type="date"
            required
            aria-required="true"
          ></input>
          <button
            type="button"
            className="getResultBtn"
            onClick={onGetResultClick}
          >
            조회
          </button>
        </form>
        <button className="getThisMonthBtn" onClick={onGetThismonthClick}>
          이번달 근무 조회
        </button>
      </div>
    </div>
  );
};

export default StatisticsView;
