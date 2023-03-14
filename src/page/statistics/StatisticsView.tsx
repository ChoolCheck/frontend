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
  let barChart: ChartJS | undefined;

  useEffect(() => {
    if (barChart && statisticsData) {
      console.log("chart updated");
      // barChart.clear();
      // barChart.destroy();
      barChart.data.labels = statisticsData.labels;
      barChart.data.datasets[0] = statisticsData.datasets[0];
      barChart.update();
      console.log("updated");
    } else {
      barChart = undefined;
      const ctx = chartRef.current?.getContext("2d");

      if (ctx) {
        console.log("create" + statisticsData);
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
        console.log(barChart);
      }
    }
  }, [statisticsData]);

  // useEffect(() => {
  //   console.log(statisticsData);
  //   console.log(barChart);

  //   if (statisticsData && barChart) {
  //     barChart.data.labels = statisticsData.labels;
  //     barChart.data.datasets[0] = statisticsData.datasets[0];
  //     barChart.update();
  //     console.log("updated");
  //   }
  // }, [statisticsData]);

  const chartHeight = statisticsList ? statisticsList.length * 100 : 600;

  return <Chart chartRef={chartRef} height={chartHeight}></Chart>;
};
export default StatisticsView;
