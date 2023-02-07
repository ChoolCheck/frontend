export interface calendarViewProps {
  calendarData: {
    title: string;
    date: string;
    textColor: string;
    backgroundColor: string;
  }[];
  onCalendarClick: any;
}

export interface calendarDetailViewProps {
  calendarDetailData: {
    scheduleList: {
      name: string;
      time: string;
      date: string;
      textColor: string;
      backgroundColor: string;
    }[];
    checkedWorkList: {
      name: string;
      time: string;
      totalWorkTime: string;
      date: string;
      textColor: string;
      backgroundColor: string;
    }[];
    memo: string;
  };
  detailModalOpen: boolean;
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
