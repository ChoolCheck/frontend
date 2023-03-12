export interface statisticsViewProps {
  statisticsList: statisticListProps[] | undefined;
}

export interface statisticListProps {
  name: string;
  totalTime: number;
  color: string;
}
