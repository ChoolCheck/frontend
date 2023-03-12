export interface statisticListProps {
  name: string;
  totalTime: number;
  color: string;
}

export interface getMonthStatisticsProps {
  start: string;
  end: string;
  setStatisticsList: React.Dispatch<
    React.SetStateAction<statisticListProps[] | undefined>
  >;
  setStatisticsData: React.Dispatch<
    React.SetStateAction<chartDataProps | undefined>
  >;
}
export interface getDateStatisticsProps {
  startInput: string;
  endInput: string;
  setStatisticsList: React.Dispatch<
    React.SetStateAction<statisticListProps[] | undefined>
  >;
  setStatisticsData: React.Dispatch<
    React.SetStateAction<chartDataProps | undefined>
  >;
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
