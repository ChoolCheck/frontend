import Chart from "chart.js/auto";
export interface statisticsViewProps {
  statisticsList: statisticListProps[] | undefined;
  statisticsData: chartDataProps;
}

export interface statisticListProps {
  name: string;
  totalTime: number;
  color: string;
}
export interface chartDataProps {
  labels: string[];
  datasets: {
    axis: string;
    data: number[];
    backgroundColor: string[];
    borderRadius: number;
    maxBarThickness: number;
    borderSkipped: boolean;
  }[];
}

export interface chartProps {
  height: number;
  canvasCallback: (canvas: HTMLCanvasElement | null) => void;
}
