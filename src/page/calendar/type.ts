export interface calendarViewProps {
  calendarData: {
    title: string;
    date: string;
    textColor: string;
    backgroundColor: string;
  }[];
  onCalendarClick: any;
  onCreateWorkcheckClick: (ev: MouseEvent, element: HTMLElement) => void;
  onCreateMemoClick: (ev: MouseEvent, element: HTMLElement) => void;
}

export interface calendarDetailViewProps {
  calendarDetailData: {
    scheduleList: {
      name: string;
      time: string;
      date: string;
      workType?: string;
      backgroundColor: string;
    }[];
    checkedWorkList: {
      name: string;
      time: string;
      totalWorkTime: string;
      date: string;
      workType?: string;
      backgroundColor: string;
    }[];
    memo: string;
  };
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
