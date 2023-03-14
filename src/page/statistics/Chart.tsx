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

const Chart = ({ chartRef, height }: type.chartProps) => {
  return (
    <div className="StatisticsView-top-container">
      <div className="StatisticsView-Chart-Container" id="canvasContainer">
        <canvas id="canvas" ref={chartRef} height={height} width={400}></canvas>
      </div>
    </div>
  );
};
export default Chart;
