export interface calendarViewProps {
  calendarTotalList: calendarListType[] | undefined;
  onCalendarClick: any;
  onCreateWorkcheckClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCreateMemoClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setCalendarTotalList: React.Dispatch<
    React.SetStateAction<calendarListType[] | undefined>
  >;
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface renderheaderProps {
  currentMonth: Date;
  onCreateWorkcheckClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCreateMemoClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prevMonth: (e: React.MouseEvent<SVGSVGElement>) => void;
  nextMonth: (e: React.MouseEvent<SVGSVGElement>) => void;
}

export interface rendercellProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (
    day: Date
  ) => (e: React.MouseEventHandler<HTMLDivElement>) => void;
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
