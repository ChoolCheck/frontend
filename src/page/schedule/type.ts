export interface scheduleTotalProps {
  onShowNameButtonClick: (
    name: string
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShowTotalButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  scheduleTotalList: {
    totalList: {
      day: string;
      date: string;
      name: string;
      time: string;
      totalWorkTime: string;
      backgroundColor: string;
    }[];
    employee: {
      name: string;
      backgroundColor: string;
    }[];
  };
}

export interface scheduleWeeklyProps {
  scheduleWeeklyList: {
    day: string;
    date: string;
    schedule: {
      name: string;
      time: string;
      backgroundColor: string;
    }[];
  }[];
}
