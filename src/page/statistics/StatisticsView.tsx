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
    console.log(barChart.id);

    if (barChart.id == "0") {
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
        options: {
          responsive: false,
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
              },
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (statisticsData) {
      const barChartDataUpdated = statisticsData;
      barChart.data = barChartDataUpdated;
      barChart.update();
    }
  }, [statisticsData]);

  // const chartHeight = statisticsList ? statisticsList.length * 80 : 400;

  return <Chart chartRef={chartRef}></Chart>;
};
export default StatisticsView;
