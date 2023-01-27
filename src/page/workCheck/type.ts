export interface workCheckProps {
  onShowNameButtonClick: (
    name: string
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShowTotalButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  workCheckTotalList: {
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
