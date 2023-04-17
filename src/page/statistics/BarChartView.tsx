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

const BarChartView = ({ canvasCallback }: type.barchartViewProps) => {
  return (
    <div className="StatisticsView-top-container">
      <div className="StatisticsView-Chart-Container" id="canvasContainer">
        <canvas id="canvas" ref={canvasCallback} width={400}></canvas>
      </div>
    </div>
  );
};
export default BarChartView;
