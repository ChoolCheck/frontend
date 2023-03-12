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
}
export interface getDateStatisticsProps {
  startInput: string;
  endInput: string;
  setStatisticsList: React.Dispatch<
    React.SetStateAction<statisticListProps[] | undefined>
  >;
}
