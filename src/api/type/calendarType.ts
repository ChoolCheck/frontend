import * as calendarType from "../../page/main/type";

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

  renderData: (
    calendarTotalList: calendarType.calendarListType[],
    memoFlagList: calendarType.memoFlagProps[]
  ) => void;
}

export interface getDetailCalendarProps {
  onModalOpen: () => void;
  setCalendarDetailScheduleList: React.Dispatch<
    React.SetStateAction<calendarDetailType[] | undefined>
  >;
  setCalendarDetailWorkcheckList: React.Dispatch<
    React.SetStateAction<calendarDetailType[] | undefined>
  >;
  date: string;
  setMemo: React.Dispatch<React.SetStateAction<memoProps[] | undefined>>;
}
export interface memoProps {
  id: number;
  date: string;
  content: string;
}
