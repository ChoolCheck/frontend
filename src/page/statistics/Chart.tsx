import "./style/statisticsView.scss";
import * as type from "./type";

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

const Chart = ({ chartRef }: type.chartProps) => {
  return (
    <div className="StatisticsView-top-container">
      <div className="StatisticsView-Chart-Container" id="canvasContainer">
        <canvas id="canvas" ref={chartRef}></canvas>
      </div>
    </div>
  );
};
export default Chart;
