import { useEffect, useRef } from "react";
import BarChartView from "./BarChartView";

import "./style/statisticsView.scss";
import * as type from "./type";

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

const BarChart = ({ statisticsList, statisticsData }: type.barChartProps) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.data = statisticsData;
      chart.update();
    }
  }, [statisticsData]);

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

  const chartHeight = statisticsList ? statisticsList.length * 100 : 600;

  return (
    <BarChartView
      canvasCallback={canvasCallback}
      height={chartHeight}
    ></BarChartView>
  );
};
export default BarChart;
