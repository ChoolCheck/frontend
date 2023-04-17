import { useEffect, useRef } from "react";
import BarChartView from "./BarChartView";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
        plugins: [ChartDataLabels],
        type: "bar",
        data: statisticsData,
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              formatter: function (value, context) {
                if (value == 0) return;
                else return value + "시간";
              },
              display: true,
              color: "black",
              anchor: "end",
              align: "start",
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

  return (
    <>
      {statisticsList ? (
        <BarChartView
          canvasCallback={canvasCallback}
          height={statisticsList.length * 80}
        ></BarChartView>
      ) : (
        <p> 데이터가 없습니다.</p>
      )}
    </>
  );
};
export default BarChart;
