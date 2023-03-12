import React, { useState, useEffect, useRef } from "react";
import "./style/statisticsView.scss";
import * as type from "./type";
import * as enumType from "../../commonType/enum";

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

const Chart = ({ chartRef, statisticsData }: type.chartProps) => {
  let barChart: ChartJS;

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      barChart = new ChartJS(ctx, {
        type: "bar",
        data: statisticsData
          ? statisticsData
          : {
              labels: [],
              datasets: [
                {
                  axis: "y",
                  data: [],
                  backgroundColor: [],
                  borderRadius: Number.MAX_VALUE,
                  maxBarThickness: 20,
                  borderSkipped: false,
                },
              ],
            },
      });
    }
  }, []);

  useEffect(() => {
    if (statisticsData != null) {
      const barChartDataUpdated = statisticsData;
      barChart.data = barChartDataUpdated;
      barChart.update();
    }
  }, [statisticsData]);

  return (
    <div className="StatisticsView-top-container">
      <div className="StatisticsView-Chart-Container" id="canvasContainer">
        <canvas id="canvas" ref={chartRef}></canvas>
      </div>
    </div>
  );
};
export default Chart;
