import React, { useState, useEffect } from "react";
import "./statisticsView.scss";
import * as type from "./type";
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
const StatisticsView = ({ statisticsList }: type.statisticsProps) => {
  const [statisticsDataLabels, setStatisticsDataLabels] = useState<
    Array<string>
  >([]);

  const [statisticsDataColor, setStatisticsDataColor] = useState<Array<string>>(
    []
  );

  const [statisticsDataContent, setStatisticsDataContent] = useState<
    Array<string>
  >([]);

  statisticsList.map((item) => {
    statisticsDataLabels.push(item.name);
    statisticsDataColor.push(item.backgroundColor);
    statisticsDataContent.push(item.totalWorkTime);
  });

  const statisticsData = {
    labels: statisticsDataLabels,
    datasets: [
      {
        axis: "y",
        data: statisticsDataContent,
        backgroundColor: statisticsDataColor,
        borderRadius: Number.MAX_VALUE,
        maxBarThickness: 20,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="StatisticsView-top-container">
      {/* <ul className="employee-list-ul">
        {statisticsList.map((item) => (
          <li className="employee-list-li">
            <span
              className="employee-list-li-color"
              style={{ backgroundColor: item.backgroundColor }}
            >
              &nbsp;&nbsp;&nbsp;
            </span>
          </li>
        ))}
      </ul> */}

      <div className="StatisticsView-Chart-Container">
        <Bar
          data={statisticsData}
          width={80}
          height={100}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            indexAxis: "y",
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 18,
                  },
                },
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 18,
                  },
                  color: "black",
                  padding: 20,
                },
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default StatisticsView;
