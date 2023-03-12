import React, { useState, useEffect, useRef } from "react";
import "./style/statisticsView.scss";
import * as type from "./type";
import { Bar } from "react-chartjs-2";
import Chart from "./Chart";
import "chart.js/auto";
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

const StatisticsView = ({
  statisticsList,
  chartRef,
  statisticsData,
}: type.statisticsViewProps) => {
  let barChart: ChartJS;

  useEffect(() => {
    console.log(barChart);

    if (barChart !== undefined) {
      console.log("chart destroyed");
      barChart.destroy();
    }
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
      console.log(barChart);
    }
  }, []);

  useEffect(() => {
    if (statisticsData) {
      console.log("update statisticsData");
      // barChart.data = statisticsData;
      barChart.update();
    }
  }, [statisticsData]);

  const chartHeight = statisticsList ? statisticsList.length * 80 : 400;

  return <Chart chartRef={chartRef} height={chartHeight}></Chart>;
};
export default StatisticsView;
