export interface calendarProps {
  onCalendarClick: (nowDate: Date) => void;
  onCreateWorkcheckClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCreateMemoClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setCalendarTotalList: React.Dispatch<
    React.SetStateAction<calendarListType[] | undefined>
  >;
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
  onDateClick: (day: Date) => (e: React.MouseEvent<HTMLDivElement>) => void;
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
  memo: memoProps[] | undefined;
  setSelectedModal: React.Dispatch<React.SetStateAction<string>>;
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onMemoClick: (
    item: memoProps
  ) => (e: React.MouseEvent<HTMLParagraphElement>) => void;
}

export interface memoProps {
  id: number;
  date: string;
  content: string;
}
