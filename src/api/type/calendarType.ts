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

export interface getTotalCalendarProps {
  date: string;
  setCalendarTotalList: React.Dispatch<
    React.SetStateAction<calendarListType[] | undefined>
  >;
}

export interface getDetailCalendarProps {
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  calendarDetailScheduleList: calendarDetailType[] | undefined;
  calendarDetailWorkcheckList: calendarDetailType[] | undefined;
  date: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
}
