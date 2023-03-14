import React, { useState, useEffect, useRef } from "react";
import "./style/statisticsView.scss";
import * as type from "./type";
import { Bar } from "react-chartjs-2";
import BarChart from "./BarChart";
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

const StatisticsView = ({
  statisticsList,
  statisticsData,
}: type.statisticsViewProps) => {
  const chartRef = useRef<Chart | null>(null);

  let barChart: ChartJS | undefined;

  const updateChart = (barChart: ChartJS) => {
    barChart.data.labels = statisticsData.labels;
    barChart.data.datasets[0] = statisticsData.datasets[0];
    barChart.update();
  };

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx && !chartRef.current) {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: statisticsData,
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
  };

  // useEffect(() => {
  //   console.log(barChart);
  //   console.log(statisticsData);

  //   if (barChart && statisticsData) {
  //     console.log("chart updated");
  //     // barChart.clear();
  //     // barChart.destroy();
  //     updateChart(barChart);
  //     console.log("updated");
  //   } else {
  //     barChart?.destroy();
  //     const ctx = chartRef.current?.getContext("2d");

  //     if (ctx) {
  //       barChart = new ChartJS(ctx, {
  //         type: "bar",
  //         data: statisticsData
  //           ? statisticsData
  //           : {
  //               labels: [],
  //               datasets: [
  //                 {
  //                   axis: "y",
  //                   data: [],
  //                   backgroundColor: [],
  //                   borderRadius: Number.MAX_VALUE,
  //                   maxBarThickness: 20,
  //                   borderSkipped: false,
  //                 },
  //               ],
  //             },
  //         options: {
  //           responsive: false,
  //           plugins: {
  //             legend: {
  //               display: false,
  //             },
  //           },
  //           indexAxis: "y",
  //           scales: {
  //             x: {
  //               ticks: {
  //                 font: {
  //                   size: 18,
  //                 },
  //               },
  //               grid: {
  //                 display: false,
  //               },
  //               border: {
  //                 display: false,
  //               },
  //             },
  //             y: {
  //               ticks: {
  //                 font: {
  //                   size: 18,
  //                 },
  //                 color: "black",
  //               },
  //               grid: {
  //                 display: false,
  //               },
  //               border: {
  //                 display: false,
  //               },
  //             },
  //           },
  //         },
  //       });
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // must verify that the chart exists
    const chart = chartRef.current;
    if (chart) {
      chart.data = statisticsData;
      chart.update();
    }
  }, [statisticsData]);

  // useEffect(() => {
  //   console.log(barChart);
  //   if (statisticsData && barChart) {
  //     updateChart(statisticsData)
  //     console.log("updated");
  //   }
  // }, [statisticsData]);

  const chartHeight = statisticsList ? statisticsList.length * 100 : 600;

  return (
    <BarChart canvasCallback={canvasCallback} height={chartHeight}></BarChart>
  );
};
export default StatisticsView;
