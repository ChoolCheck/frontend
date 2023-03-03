export interface calendarViewProps {
  calendarTotalList: calendarListType[] | undefined;
  onCalendarClick: any;
  onCreateWorkcheckClick: (ev: MouseEvent, element: HTMLElement) => void;
  onCreateMemoClick: (ev: MouseEvent, element: HTMLElement) => void;
}

export interface calendarListType {
  title: string;
  date: string;
  textColor: string;
  backgroundColor: string;
}

export interface calendarDetailType {
  name: string;
  time: string;
  totalWorkTime: number;
  backgroundColor: string;
  workType: string | null;
}

export interface calendarDetailViewProps {
  calendarDetailScheduleList: calendarDetailType[] | undefined;
  calendarDetailWorkcheckList: calendarDetailType[] | undefined;
  memo: string;

  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
