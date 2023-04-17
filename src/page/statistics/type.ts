export interface statisticsViewProps {
  yearToShow: number;
  monthToShow: number;
  onNextClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPrevClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChageStartInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChageEndInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetResultClick: () => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onGetThismonthClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface barChartProps {
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

export interface barchartViewProps {
  height: number;
  canvasCallback: (canvas: HTMLCanvasElement | null) => void;
}
