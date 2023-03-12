export interface statisticsViewProps {
  statisticsList: statisticListProps[] | undefined;
  chartRef: React.RefObject<HTMLCanvasElement>;
  statisticsData: chartDataProps | undefined;
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
  chartRef: React.RefObject<HTMLCanvasElement>;
}
